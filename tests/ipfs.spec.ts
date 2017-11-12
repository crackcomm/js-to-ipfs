/**
 * @license Apache-2.0
 */
import 'jest';
import { ipfsPackage } from '../src';

jest.setTimeout(60000);

describe('ipfs', () => {
  it('should upload simple example', async () => {
    const hash = await ipfsPackage('tests/fixtures/simple');
    expect(hash).toEqual('QmeTyt26maaVLFrumaUY1DECWPqkFYMMpwBMSKEXtvC4dU');
  });
  it('should upload multihash example', async () => {
    const hash = await ipfsPackage('tests/fixtures/multihash');
    expect(hash).toEqual('QmSHp6mhGvnD3tgywfqKskGHPoZid2eUT5SMpozmoLCYJ9');
  });
});
