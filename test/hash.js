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
    var image = fs.readFileSync(path+list[index].url); //buffer
    var name = list[index].name;
    var nonce = list[index].nonce;

    data = prevHash + image.toString('utf8') + name + nonce.toString();
    var hash = computeSha256(data);
    console.log(">1 "+computeSha256(name+nonce.toString()).toString('hex'));
    console.log(">2 "+computeSha256(image.toString('utf8')).toString('hex'));
    console.log(">3 " + prevHash + "->" + name + "." + nonce.toString() + "." + hash.toString('hex'));
    return hash.toString('hex');
}
const verifyHash = (list) => {
    var hash = computeHash(list, list.length-1);
    console.log(list[list.length-1].name +":"+hash);
    return hash.startsWith(difficulty);
}

module.exports = { verifyHash: verifyHash };