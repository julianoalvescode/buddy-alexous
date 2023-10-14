"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,o,t,r){void 0===r&&(r=t);var n=Object.getOwnPropertyDescriptor(o,t);n&&("get"in n?o.__esModule:!n.writable&&!n.configurable)||(n={enumerable:!0,get:function(){return o[t]}}),Object.defineProperty(e,r,n)}:function(e,o,t,r){e[r=void 0===r?t:r]=o[t]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,o){Object.defineProperty(e,"default",{enumerable:!0,value:o})}:function(e,o){e.default=o}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding(o,e,t);return __setModuleDefault(o,e),o};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Commands=void 0;const glob=__importStar(require("glob")),fs=__importStar(require("fs")),path=__importStar(require("path")),cli_color_1=require("cli-color");class Command{findUnusedComponents(){var e=glob.sync("**/*.js*",{ignore:"node_modules/**"});const t=[],r=[];e.forEach(e=>{const o=fs.readFileSync(e,"utf-8");e=e.split("/").pop().split(".")[0];t.push(e),t.forEach(e=>{new RegExp(`\\b${e}\\b`,"g").test(o)&&r.push(e)})});e=t.filter(e=>!r.includes(e));0<e.length?(console.log(cli_color_1.black.bgRedBright("Unused components found:")),console.log(e)):console.log(cli_color_1.black.bgGreen("No unused components found. 🎉!"))}listComponentsSizes(e){const r=path.join(process.cwd(),e);if(fs.existsSync(r)){var o=fs.readdirSync(r);let t=0;o.forEach(e=>{var o=path.join(r,e),o=fs.statSync(o);o.isFile()&&(o=(o.size/1024).toFixed(2),console.log(e+`: ${o} KB`),t++)}),console.log("Total number of files: "+t)}else console.error(`Directory ${e} does not exist.`)}listComponentDependencies(e){var o=path.join(process.cwd(),e);fs.existsSync(o)?(o=fs.readFileSync(o,"utf8").split("\n").filter(e=>e.trim().startsWith("import")),console.log(`Dependencies for ${e}:`),o.forEach(e=>console.log(e.trim()))):console.error(`Component file ${e} does not exist.`)}generateComponentDocumentation(e){var o,t,r=path.join(process.cwd(),e);fs.existsSync(r)?(o=(r=fs.readFileSync(r,"utf8")).match(/props\.\w+/g)||[],t=r.match(/this\.state\.\w+/g)||[],r=r.match(/this\.\w+\(/g)||[],console.log(`Documentation for ${e}:`),console.log("Props:",[...new Set(o.map(e=>e.replace("props.","")))]),console.log("State:",[...new Set(t.map(e=>e.replace("this.state.","")))]),console.log("Methods:",[...new Set(r.map(e=>e.replace("this.","").replace("(","")))])):console.error(`Component file ${e} does not exist.`)}createComponent(e){var o,t=path.join(process.cwd(),e);fs.existsSync(t)?console.error(`A directory with the name ${e} already exists!`):(fs.mkdirSync(t),o=`
import React from 'react';

function ${e}() {
  return <div>${e} component</div>;
}

export default ${e};
  `,fs.writeFileSync(path.join(t,e+".tsx"),o),o=`.${e.toLowerCase()} {}`,fs.writeFileSync(path.join(t,e+".css"),o),o=`
import React from 'react';
import { render } from '@testing-library/react';
import ${e} from './${e}';

test('renders ${e}', () => {
  render(<${e} />);
  // Add your tests here
});
  `,fs.writeFileSync(path.join(t,e+".test.ts"),o),console.log(`Component ${e} created successfully!`))}}exports.Commands=new Command;