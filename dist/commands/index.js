"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,o,t,r){void 0===r&&(r=t);var n=Object.getOwnPropertyDescriptor(o,t);n&&("get"in n?o.__esModule:!n.writable&&!n.configurable)||(n={enumerable:!0,get:function(){return o[t]}}),Object.defineProperty(e,r,n)}:function(e,o,t,r){e[r=void 0===r?t:r]=o[t]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,o){Object.defineProperty(e,"default",{enumerable:!0,value:o})}:function(e,o){e.default=o}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&__createBinding(o,e,t);return __setModuleDefault(o,e),o};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Commands=void 0;const glob=__importStar(require("glob")),fs=__importStar(require("fs")),path=__importStar(require("path")),cli_color_1=require("cli-color");class Command{constructor(){}findUnusedComponents(){var e=glob.sync("**/*.js*",{ignore:"node_modules/**"});const t=[],r=[];e.forEach(e=>{const o=fs.readFileSync(e,"utf-8");e=e.split("/").pop().split(".")[0];t.push(e),t.forEach(e=>{new RegExp(`\\b${e}\\b`,"g").test(o)&&r.push(e)})});e=t.filter(e=>!r.includes(e));0<e.length?(console.log(cli_color_1.black.bgRedBright("Unused components found:")),console.log(e)):console.log(cli_color_1.black.bgGreen("No unused components found. 🎉!"))}createComponent(e){var o,t=path.join(process.cwd(),e);fs.existsSync(t)?console.log(cli_color_1.black.bgRedBright("A directory with the name already exists! 💩")):(fs.mkdirSync(t),o=`
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
  `,fs.writeFileSync(path.join(t,e+".test.ts"),o),console.log(cli_color_1.black.bgGreen(`Component ${e} created successfully! 🎉!`)))}listComponents(e="src/components"){var o=path.join(process.cwd(),e);if(fs.existsSync(o)){const n=[];!function e(o){for(const r of fs.readdirSync(o)){var t=path.join(o,r);fs.statSync(t).isDirectory()?e(t):(r.endsWith(".jsx")||r.endsWith(".tsx"))&&n.push(t)}}(o),console.log(cli_color_1.black.bgGreen("List of components: 🎉!")),n.forEach(e=>console.log("- "+path.relative(process.cwd(),e)))}else console.error(e+" not found. Make sure you are in the correct directory.")}}exports.Commands=new Command;