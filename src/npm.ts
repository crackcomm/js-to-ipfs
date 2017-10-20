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
import * as path from 'path';

import glob from './utils/glob';
import readFile from './utils/readFile';


/**
 * Lists modules in package node_modules directory.
 */
export async function listModules(dir: string) {
  const files = await glob(path.join(dir, 'node_modules', '*'));
  return files.map(async (dir) => {
    const name = path.basename(dir);
    const pkg = await readPackage(dir);
    return {name, pkg, dir};
  });
}


/**
 * Gets `package.json` from directory.
 */
export async function readPackage(dir: string) {
  const file = await readFile(path.join(dir, 'package.json'));
  return JSON.parse(file.toString());
}
