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
import {ipfsPackage} from '../src';

jest.setTimeout(60000);

describe('ipfs', () => {
  it('should upload simple example', async () => {
    const hash = await ipfsPackage('tests/fixtures/simple');
    expect(hash).toEqual('QmVmMxoQYNBQ6rskr2ATPs1D6zKijXzMfn2CMf3chQxycR');
  });
  it('should upload multihash example', async () => {
    const hash = await ipfsPackage('tests/fixtures/multihash');
    expect(hash).toEqual('QmbYcAH8J4yg3sGssi6cHYgAhcd2wFtZasE6KdyyzJDTc9');
  });
});
