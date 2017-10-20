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
import 'jest';
import {rewriteSource} from '../src';

function toExpected(from: string, to: string, src: string) {
  return src.replace(`'${from}'`, `'/ipfs/${to}'`);
}

describe('rewrite', () => {
  it('should rewrite a source', async () => {
    const src = `
      var ms = require('ms');

      module.exports = function() {
        console.log(ms(101023));
      }
    `;
    const table = {ms: 'example'}
    const res = rewriteSource(table, src).toString();
    expect(res).toEqual(toExpected('ms', table['ms'], src));
  });
});
