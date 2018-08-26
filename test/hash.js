const bitcoin = require('bitcoinjs-lib');
const fs = require('fs')

const difficulty = '0000000';

const path = __dirname + '/../client/public/';

const computeSha256 = (data) => bitcoin.crypto.sha256(data);
const computeHash = (list, index) => {   
    if (index < 0) {
        return "";
    }

    var prevHash = computeHash(list, index-1);    
    var image = fs.readFileSync(path+list[index].url).toString('hex');
    var name = list[index].name;
    var nonce = list[index].nonce.toString();

    data = prevHash + image + name + nonce;
    var hash = computeSha256(data);
   
    return hash.toString('hex');
}
const verifyHash = (list) => {
    var hash = computeHash(list, list.length-1);
    return hash.startsWith(difficulty);
}

module.exports = { verifyHash: verifyHash };