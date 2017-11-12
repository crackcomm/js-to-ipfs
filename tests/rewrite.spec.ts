/**
 * @license Apache-2.0
 */
import 'jest';
import { rewriteSource } from '../src';

function toExpected(from: string, to: string, src: string) {
  return src.replace(`'${from}'`, `'${to}'`);
}

describe('rewrite', () => {
  it('should rewrite a source', async () => {
    const src = `
      var ms = require('ms');

      module.exports = function() {
        console.log(ms(101023));
      }
    `;
    const table = { ms: 'example' }
    const res = rewriteSource(table, src).toString();
    expect(res).toEqual(toExpected('ms', table['ms'], src));
  });
});
