import * as glob from "glob";
import * as fs from "fs";
import * as path from "path";
import { black } from "cli-color";

class Command {
  constructor() {}

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

  createComponent(name: string): void {
    const dirPath: string = path.join(process.cwd(), name);

    if (fs.existsSync(dirPath)) {
      console.log(
        black.bgRedBright(`A directory with the name already exists! 💩`)
      );
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

    console.log(black.bgGreen(`Component ${name} created successfully! 🎉!`));
  }

  listComponents(): void {
    let directory = "src/components";
    const dirPath = path.join(process.cwd(), directory);
    if (!fs.existsSync(dirPath)) {
      console.error(
        `${directory} not found. Make sure you are in the correct directory.`
      );
      return;
    }

    const componentFiles: string[] = [];

    function getComponentsFromDir(dir: string): void {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const absolutePath = path.join(dir, file);
        const stat = fs.statSync(absolutePath);

        if (stat.isDirectory()) {
          getComponentsFromDir(absolutePath);
        } else if (file.endsWith(".jsx") || file.endsWith(".tsx")) {
          componentFiles.push(absolutePath);
        }
      }
    }

    getComponentsFromDir(dirPath);

    console.log(black.bgGreen(`List of components: 🎉!`));
    componentFiles.forEach((componentPath) =>
      console.log(`- ${path.relative(process.cwd(), componentPath)}`)
    );
  }
}

export const Commands = new Command();
