/**
 * @license
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as falafel from 'falafel';
import * as os from 'os';
import * as path from 'path';

import {copyPackage} from './npm';
import {glob, readFile, writeFile} from './utils';
import STDLIB from './stdlib';

/**
 * Rewrites JavaScript package `requires` to IPFS requires from table of hashes.
 * Returns directory containing a copy of package with rewritten source code.
 */
export async function rewritePackage(table: any, dir: string) {
  const tempDir = await copyPackage(dir);
  const files = await glob(path.join(tempDir, '**/*.js'));
  await Promise.all(files.map(async (file: string) => {
    const source = await readFile(file);
    const newSource = rewriteSource(table, source.toString());
    await writeFile(file, newSource);
  }));
  return tempDir;
}


// Returns true if node is a `require` call
const isRequireCall = (node: any) =>
    node.type === 'CallExpression' && node.callee.name == 'require';


// Returns true if node is a `require` definition
const isRequiredDef = (node: any) =>
    node.type === 'Literal' && isRequireCall(node.parent);


/**
 * Rewrites source code to `/ipfs/` *requires*.
 * @param table  Hash table
 * @param source Source code
 */
export function rewriteSource(table: {[name: string]: string}, source: string) {
  return falafel(source, (node: any) => {
    if (isRequiredDef(node)) {
      // required package name
      const name = node.value;
      if (name.startsWith('./') || name.startsWith('/')) {
        return;
      }
      // hash for package root
      const hash = table[name];
      if (!hash && STDLIB.indexOf(name) === -1) {
        // TODO(crackcomm): handle this logging for dev dependencies
        // throw `hash not found for package ${name}`;
        // console.error(`hash not found for package ${name}`);
      }
      node.update(`'/ipfs/${hash}'`);
    }
  });
}
