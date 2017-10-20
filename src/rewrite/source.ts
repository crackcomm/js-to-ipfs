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

// Returns true if node is a `require` call
const isRequireCall = node =>
    node.type === 'CallExpression' && node.callee.name == 'require';

// Returns true if node is a `require` definition
const isRequiredDef = node =>
    node.type === 'Literal' && isRequireCall(node.parent);

/**
 * Rewrites source code to `/ipfs/` *requires*.
 * @param table  Hash table
 * @param source Source code
 */
export function rewriteSource(table: { [name: string]: string }, source: string) {
  return falafel(source, node => {
    if (isRequiredDef(node)) {
      // required package name
      const name = node.value;
      if (name.startsWith('./') || name.startsWith('/')) {
        return;
      }
      // hash for package root
      const hash = table[name];
      if (!hash && stdlib.indexOf(name) === -1) {
        // throw `hash not found for package ${name}`;
        // TODO: handle this logging for dev dependencies
        // console.error(`hash not found for package ${name}`);
      }
      node.update(`'/ipfs/${hash}'`);
    }
  });
}

const stdlib = ['buffer', 'stream', 'fs'];
