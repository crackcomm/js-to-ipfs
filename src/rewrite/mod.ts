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
import * as os from 'os';
import * as path from 'path';
import * as fsextra from 'fs-extra';

import glob from '../utils/glob';
import mkdir from '../utils/mkdir';
import tmpdir from '../utils/tmpdir';
import promisify from '../utils/promisify';
import readFile from '../utils/readFile';
import writeFile from '../utils/writeFile';

// TODO:
import {ipfsDeps, rewriteSource} from '../';

const copyDir = promisify(fsextra.copy);

async function copyModule(dir: string) {
  const files = await glob(path.join(dir, '*'));
  const filesToCopy = files.filter(file => path.basename(file) !== 'node_modules');
  const destDir = await tmpdir();
  await Promise.all(filesToCopy.map(async (file) => {
    const name = path.basename(file);
    const dest = path.join(destDir, name);
    return await copyDir(file, dest);
  }));
  return destDir;
}


export async function rewriteModule(table: any, dir: string) {
  const tempDir = await copyModule(dir);
  const files = await glob(path.join(tempDir, '**/*.js'));
  await Promise.all(files.map(async (file) => {
    const source = await readFile(file);
    const newSource = rewriteSource(table, source.toString());
    await writeFile(file, newSource);
  }));
  return tempDir;
}
