/**
 * @license Apache-2.0
 */
import * as path from 'path';
import { copyDir, glob, readFile, tmpdir } from '@ipfn/util';


/**
 * Lists modules in package node_modules directory.
 */
export async function listModules(dir: string) {
  const files = await glob(path.join(dir, 'node_modules', '*'));
  return files.map(async (dir: string) => {
    const name = path.basename(dir);
    const pkg = await readPackage(dir);
    return { name, pkg, dir };
  });
}


/**
 * Gets `package.json` from directory.
 */
export async function readPackage(dir: string) {
  const file = await readFile(path.join(dir, 'package.json'));
  return JSON.parse(file.toString());
}


/**
 * Copies JavaScript package without `node_modules` to a temporary directory.
 * Returns directory containing a copy of the package.
 */
export async function copyPackage(dir: string) {
  const files = await glob(path.join(dir, '*'));
  const filesToCopy =
    files.filter((file: string) => path.basename(file) !== 'node_modules');
  const destDir = await tmpdir();
  await Promise.all(filesToCopy.map(async (file: string) => {
    const name = path.basename(file);
    const dest = path.join(destDir, name);
    return await copyDir(file, dest);
  }));
  return destDir;
}
