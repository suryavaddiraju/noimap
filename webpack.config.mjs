import { fileURLToPath } from 'node:url';
import { dirname,resolve } from 'node:path';
import {mkdirSync,existsSync} from 'node:fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const output_path = resolve(__dirname,"dist","esm");
if (!existsSync(output_path)){
  mkdirSync(output_path,{recursive:true});
}
const webpack_config = {
  "entry":  "./lib/browser.mjs",
  "experiments": {
    "outputModule": true
  },
  "output": {
    "environment": {
        "module": true
    },
    "path": output_path,
    "filename": "noimap.mjs",
    "library": {
        "type": "module"
    },
  },
  "externalsType": "module",
  "mode": "production"
};
export default webpack_config;