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
import {ipfsDeps, mapDeps} from '../src';

describe('ipfs', () => {
  it('should upload simple example', async () => {
    const deps = await Promise.all(await ipfsDeps('tests/fixtures/simple'));
    expect(mapDeps(deps)).toEqual({
      'ms': 'QmWUwAcrePX2sCy5n8ggMz5ivqbdrwBxZb5C68WYNAUFqL'
    });
  });
  it('should upload multihash example', async () => {
    const deps = await Promise.all(await ipfsDeps('tests/fixtures/multihash'));
    expect(mapDeps(deps)).toEqual({
      'varint': 'QmeD5mw4R1bCW5ZBVCriPBwD1Tur4VhHf6Ke29nKK6NW9E',
      'safe-buffer': 'Qmda5KJ2CuoR7ptDNMAWsrAYj62kG5pkuLWQ2vXU1dKt4x',
      'multihashes': 'QmbbhZbGoFDp4GkzDLKju9h4PhRzjkYLnSeVyrB7aUaism',
      'bs58': 'QmUFZEjKDh6TKr6eugzjup316bztKQ9S7juouquDM1p3y2',
      'base-x': 'QmRJQKjSKFzHhBEgBhqE6JfScWnZZ2NgEtbyqZ2jxz7FoP'
    });
  });
});
