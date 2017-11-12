# IPFS JavaScript source code packer

[![IPFN project](https://img.shields.io/badge/project-IPFN-blue.svg?style=flat-square)](//github.com/ipfn)
[![IPFS project](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](//github.com/ipfs)
[![npm](https://img.shields.io/npm/v/js-to-ipfs.svg?maxAge=86400&style=flat-square)](https://www.npmjs.com/package/js-to-ipfs)
[![Dependency Status](https://david-dm.org/crackcomm/js-to-ipfs.svg?style=flat-square)](https://david-dm.org/crackcomm/js-to-ipfs)
[![Dev Dependency Status](https://david-dm.org/crackcomm/js-ipfs-pack/dev-status.svg?style=flat-square)](https://david-dm.org/crackcomm/js-ipfs-pack?type=dev)
[![Circle CI](https://img.shields.io/circleci/project/crackcomm/js-ipfs-pack.svg)](https://circleci.com/gh/crackcomm/js-ipfs-pack)

Uploads `npm` packages to IPFS.

Converts occurences of `require('package')` in source code to `require('Qm...')`.

## Install

```console
$ npm install -g js-to-ipfs
```

## Usage

IPFS daemon should be running.

In node.js package directory run:

```console
$ js-to-ipfs
QmVmMxoQYNBQ6rskr2ATPs1D6zKijXzMfn2CMf3chQxycR
```

Usage in code can be found in [tests](https://github.com/crackcomm/js-to-ipfs/blob/master/tests/ipfs.spec.ts).

### Running

IPFS should be mounted at `/ipfs` and `NODE_PATH` should point to it.

```console
$ ipfs mount
IPFS mounted at: /ipfs
IPNS mounted at: /ipns
$ export NODE_PATH=/ipfs
```

## Known issues

* Dependencies need to be installed first.
* Directories without `package.json` should not be in `node_modules`.
* Uploads all dependencies in `node_modules` directory.
* Recursive package requires.

## TODO

* Organizations includes `@org/pkg`.
* Includes like: `require('package/...')`.

## License

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
