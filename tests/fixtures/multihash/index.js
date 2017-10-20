
var multihash = require('multihashes')
var buf = new Buffer('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', 'hex')

var encoded = multihash.encode(buf, 'sha1')
console.log(encoded)