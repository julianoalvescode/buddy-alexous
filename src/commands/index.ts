import * as glob from "glob";
import * as fs from "fs";
import * as path from "path";
import { black } from "cli-color";

class Command {
  findUnusedComponents(): void {
    const files: string[] = glob.sync("**/*.js*", {
      ignore: "node_modules/**",
    });
    const allComponents: string[] = [];
    const usedComponents: string[] = [];

    files.forEach((file: string) => {
      const content: string = fs.readFileSync(file, "utf-8");

      const fileName: string = file.split("/").pop()!.split(".")[0];
      allComponents.push(fileName);

      allComponents.forEach((component: string) => {
        const regex: RegExp = new RegExp(`\\b${component}\\b`, "g");
        if (regex.test(content)) {
          usedComponents.push(component);
        }
      });
    });

    const unusedComponents: string[] = allComponents.filter(
      (component) => !usedComponents.includes(component)
    );

    if (unusedComponents.length > 0) {
      console.log(black.bgRedBright("Unused components found:"));
      console.log(unusedComponents);
    } else {
      console.log(black.bgGreen(`No unused components found. 🎉!`));
    }
  }
  listComponentsSizes(directory: string): void {
    const fullPath = path.join(process.cwd(), directory);

    if (!fs.existsSync(fullPath)) {
      console.error(`Directory ${directory} does not exist.`);
      return;
    }

    const files = fs.readdirSync(fullPath);
    let totalFiles = 0;

    files.forEach((file) => {
      const componentPath = path.join(fullPath, file);
      const stats = fs.statSync(componentPath);

      if (stats.isFile()) {
        const size = (stats["size"] / 1024).toFixed(2);
        console.log(`${file}: ${size} KB`);
        totalFiles++;
      }
    });

    console.log(`Total number of files: ${totalFiles}`);
  }

  listComponentDependencies(componentPath: string): void {
    const fullPath = path.join(process.cwd(), componentPath);

    if (!fs.existsSync(fullPath)) {
      console.error(`Component file ${componentPath} does not exist.`);
      return;
    }

    const content = fs.readFileSync(fullPath, "utf8");
    const importLines = content
      .split("\n")
      .filter((line) => line.trim().startsWith("import"));

    console.log(`Dependencies for ${componentPath}:`);
    importLines.forEach((line) => console.log(line.trim()));
  }

  generateComponentDocumentation(componentPath: string): void {
    const fullPath = path.join(process.cwd(), componentPath);

    if (!fs.existsSync(fullPath)) {
      console.error(`Component file ${componentPath} does not exist.`);
      return;
    }

    const content = fs.readFileSync(fullPath, "utf8");

    const propMatches = content.match(/props\.\w+/g) || [];
    const stateMatches = content.match(/this\.state\.\w+/g) || [];
    const methodMatches = content.match(/this\.\w+\(/g) || [];

    console.log(`Documentation for ${componentPath}:`);
    console.log("Props:", [
      ...new Set(propMatches.map((m) => m.replace("props.", ""))),
    ]);
    console.log("State:", [
      ...new Set(stateMatches.map((m) => m.replace("this.state.", ""))),
    ]);
    console.log("Methods:", [
      ...new Set(
        methodMatches.map((m) => m.replace("this.", "").replace("(", ""))
      ),
    ]);
  }

  createComponent(name: string): void {
    const dirPath: string = path.join(process.cwd(), name);

    if (fs.existsSync(dirPath)) {
      console.error(`A directory with the name ${name} already exists!`);
      return;
    }

    fs.mkdirSync(dirPath);

    const componentContent: string = `
import React from 'react';

function ${name}() {
  return <div>${name} component</div>;
}

export default ${name};
  `;

    fs.writeFileSync(path.join(dirPath, `${name}.tsx`), componentContent);

    const styleContent: string = `.${name.toLowerCase()} {}`;
    fs.writeFileSync(path.join(dirPath, `${name}.css`), styleContent);

    const testContent: string = `
import React from 'react';
import { render } from '@testing-library/react';
import ${name} from './${name}';

test('renders ${name}', () => {
  render(<${name} />);
  // Add your tests here
});
  `;

    fs.writeFileSync(path.join(dirPath, `${name}.test.ts`), testContent);

    console.log(`Component ${name} created successfully!`);
  }
}

export const Commands = new Command();
