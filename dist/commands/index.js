"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var n=Object.getOwnPropertyDescriptor(t,o);n&&("get"in n?t.__esModule:!n.writable&&!n.configurable)||(n={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,n)}:function(e,t,o,r){e[r=void 0===r?o:r]=t[o]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&__createBinding(t,e,o);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Commands=void 0;const glob=__importStar(require("glob")),fs=__importStar(require("fs")),path=__importStar(require("path"));class Command{constructor(){}findUnusedComponents(){var e=glob.sync("**/*.js*",{ignore:"node_modules/**"});const o=[],r=[];e.forEach(e=>{const t=fs.readFileSync(e,"utf-8");e=e.split("/").pop().split(".")[0];o.push(e),o.forEach(e=>{new RegExp(`\\b${e}\\b`,"g").test(t)&&r.push(e)})});e=o.filter(e=>!r.includes(e));0<e.length?(console.log("Unused components found:"),console.log(e)):console.log("No unused components found.")}createComponent(e){var t,o=path.join(process.cwd(),e);fs.existsSync(o)?console.error(`A directory with the name ${e} already exists!`):(fs.mkdirSync(o),t=`
      import React from 'react';

      function ${e}() {
        return <div>${e} component</div>;
      }

      export default ${e};
  `,fs.writeFileSync(path.join(o,e+".tsx"),t),t=`.${e.toLowerCase()} {}`,fs.writeFileSync(path.join(o,e+".css"),t),t=`
      import React from 'react';
      import { render } from '@testing-library/react';
      import ${e} from './${e}';

      test('renders ${e}', () => {
        render(<${e} />);
        // Add your tests here
      });
  `,fs.writeFileSync(path.join(o,e+".test.ts"),t),console.log(`Component ${e} created successfully!`))}}exports.Commands=new Command;