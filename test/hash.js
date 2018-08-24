const bitcoin = require('bitcoinjs-lib');
const fs = require('fs')

const difficulty = '0000';

const sha256 = (buffer) => bitcoin.crypto.sha256(buffer);
const hashToHex = (hash) => hash.toString('hex');
const verify = (image, name, nonce, callback) => {
    var v = Buffer.concat([image, new Buffer(name), new Buffer(nonce.toString())]);
    var r = sha256(v).toString('hex').startsWith(difficulty);
    callback(r);
}

const path = __dirname + '/../client/public/';

function verifyHash (item, callback) {
    fs.readFile(path+item.url, function(err, data) {
        if (err) throw err;
        
        verify(data, item.name, item.nonce, callback);
    });
}

module.exports = { verifyHash: verifyHash };