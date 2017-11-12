/**
 * @license Apache-2.0
 */
import { exec } from '@ipfn/util';
import { listModules } from './npm';
import { rewritePackage } from './rewrite';

/**
 * Uploads npm package with dependencies to IPFS.
 */
export async function ipfsPackage(dir: string) {
  const modules = await ipfsDeps(dir);
  const result = await rewritePackage(modules, dir);
  return await ipfsAdd(result);
}


/**
 * Uploads npm dependencies to IPFS.
 */
export async function ipfsDeps(dir: string) {
  const modules = await Promise.all(await listModules(dir));
  const uploader = new Uploader(modules);
  return await uploader.uploadAll();
}


/**
 * Uploads directory to IPFS.
 */
export async function ipfsAdd(cwd: string) {
  const stdout = await exec('ipfs add -r -Q .', { cwd });
  return stdout.trim();
}

export class Uploader {
  private modules: any[];
  private uploaded: any = {};

  constructor(modules: any[]) {
    this.modules = modules;
  }

  async uploadAll() {
    let ok: any = true;
    while (ok) {
      ok = await this.tryUpload();
    }
    const done = this.modules.reduce(
      (prev: boolean, mod: any) => prev && this.uploaded[mod.name], true);
    if (!done) {
      throw `could not finish uploading`;
    }
    return this.uploaded;
  }

  private async tryUpload() {
    let ok = false;
    await Promise.all(this.modules.map(async (mod: any) => {
      if (this.canUpload(mod)) {
        await this.upload(mod);
        ok = true;
      }
    }));
    return ok;
  }

  private async upload(mod: any) {
    const dir = await rewritePackage(this.uploaded, mod.dir);
    this.uploaded[mod.name] = await ipfsAdd(dir);
  }

  private canUpload(mod: any) {
    if (this.uploaded[mod.name]) {
      return false;
    }
    if (!mod.pkg.dependencies) {
      return true;
    }
    const deps = Object.keys(mod.pkg.dependencies);
    return deps.reduce(
      (prev: boolean, name: any) => prev && this.uploaded[name], true);
  }
}
