/**
 * @license Apache-2.0
 */
import falafel from 'falafel';
import * as os from 'os';
import * as path from 'path';
import { glob, readFile, writeFile } from '@ipfn/util';

import { copyPackage } from './npm';
import STDLIB from './stdlib';

/**
 * Rewrites JavaScript package `requires` to IPFS requires from table of hashes.
 * Returns directory containing a copy of package with rewritten source code.
 */
export async function rewritePackage(table: any, dir: string) {
  const tempDir = await copyPackage(dir);
  const files = await glob(path.join(tempDir, '**/*.js'));
  await Promise.all(files.map(async (file: string) => {
    const source = await readFile(file);
    const newSource = rewriteSource(table, source.toString());
    await writeFile(file, newSource);
  }));
  return tempDir;
}


// Returns true if node is a `require` call
const isRequireCall = (node: any) =>
  node.type === 'CallExpression' && node.callee.name == 'require';


// Returns true if node is a `require` definition
const isRequiredDef = (node: any) =>
  node.type === 'Literal' && isRequireCall(node.parent);


/**
 * Rewrites source code to IPFS *requires*.
 * @param table  Hash table
 * @param source Source code
 */
export function rewriteSource(table: { [name: string]: string }, source: string) {
  return falafel(source, (node: any) => {
    if (!isRequiredDef(node)) {
      return;
    }
    // required package name
    const name = node.value;
    if (name.startsWith('./') || name.startsWith('/')) {
      return;
    }
    // return if standard library
    if (STDLIB.indexOf(name) !== -1) {
      return;
    }
    // TODO: split('/')
    // hash for package root
    const hash = table[name];
    if (!hash) {
      console.warn(`hash not found for package ${name}`);
    } else {
      node.update(`'${hash}'`);
    }
  });
}
