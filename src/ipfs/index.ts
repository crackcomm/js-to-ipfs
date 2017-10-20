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
import * as fs from 'fs';
import * as path from 'path';

import exec from '../utils/exec';
import glob from '../utils/glob';
import {listModules} from '../npm';


/**
 * Uploads directory to IPFS
 */
export async function ipfsAdd(cwd: string) {
  const stdout = await exec('ipfs add -r -Q .', {cwd});
  return stdout.trim();
}

/**
 * Uploads dependencies to IPFS
 */
export async function ipfsDeps(dir: string) {
  const files = await listModules(dir);
  return files.map(async ({name, dir}) => {
    const hash = await ipfsAdd(dir);
    return {name, hash};
  })
}

/**
 * Converts list from `ipfsDeps` to table.
 */
export function mapDeps(deps: any) {
  return deps.reduce((prev, curr: any) => ({ [curr.name]: curr.hash, ...prev }), {});
}
