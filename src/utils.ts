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
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as fsextra from 'fs-extra';
import * as globBase from 'glob';
import * as os from 'os';
import * as path from 'path';

/**
 * Promisifies a function
 */
export function promisify(fn: Function) {
  return function(...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const callback = (err: any, res: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      };
      return fn(...args, callback);
    })
  };
}

/**
 * Creates a directory with random name in `os.tmpdir()`.
 */
export async function tmpdir() {
  const dirname = Math.random().toString(36).substring(7);
  const dir = path.join(os.tmpdir(), dirname);
  await mkdir(dir);
  return dir;
};

export const copyDir = promisify(fsextra.copy);
export const exec = promisify(child_process.exec);
export const glob = promisify(globBase);
export const mkdir = promisify(fs.mkdir);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
