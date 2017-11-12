#!/usr/bin/env node
/**
 * @license Apache-2.0
 */
import { ipfsPackage } from '../src/ipfs';

ipfsPackage(process.argv[2] || process.cwd())
  .catch((err: any) => console.error(err))
  .then((hash: string) => console.log(hash));
