const bitcoin = require('bitcoinjs-lib')
const request = require('request');


// Set some configuration
const tx_fee = 10000; // fee to pay the miners
const reward = 100000; // give to visitors
const minimum_fund = 8000000;

// Generate a faucet address from a given private key defined in environment (e.g., set FaucetPrivKey=...)
const priv = process.env.FaucetPrivKey
            ? Buffer.from(process.env.FaucetPrivKey, 'hex')
            : bitcoin.crypto.sha256(Buffer.from('some big long password for your own private key')) 

const testnet = bitcoin.networks.testnet;
const keyPair = bitcoin.ECPair.fromPrivateKey(priv, {compressed:false, network: testnet})
const faucetPubkey = keyPair.publicKey;
const { address:faucetAddress } = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey, network: testnet})

console.log("faucet priv    : " + priv.toString('hex'));
console.log("faucet public  : " + faucetPubkey.toString('hex'));
console.log("facuet address : " + faucetAddress);

const satoshiToBTC = (value) => value * 0.00000001;

function createMultisig(pubkey) {
    var pubkeys = [faucetPubkey, pubkey];
    pubkeys = pubkeys.map((hex) => Buffer.from(hex, 'hex'));
    const { address, redeem } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m:1, pubkeys, network: testnet }),
        network: testnet
    });

    return {address:address, script:redeem.output.toString('hex')};
}

// Broadcasts a transaction to the network
function broadcast_tx(multisig, tx, cb) {
    const options = {
        uri: "https://api.blockcypher.com/v1/btc/test3/txs/push",
        headers: {"content-type": "application/json"},
        json: { tx: tx.toHex() }
    }

    request.post(options, function(err, httpResponse, body) {
        if (err) {            
            console.error('Request failed:', err);
            cb({error:'Broadcast failed'});
        } else {
            console.log('Broadcast requests:', body);
            console.log('Transaction send with hash:', tx.getId());
            cb({txid:tx.getId(),
                address:multisig.address,
                script:multisig.script});
        }
    })
}

function getBalance(cb) {
    const url = "https://api.blockcypher.com/v1/btc/test3/addrs/" + faucetAddress + "/balance";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const result = JSON.parse(body);

            // display the results to the console
            console.log('Received: ' + satoshiToBTC(result.total_received));
            console.log('Sent: ' + satoshiToBTC(result.total_sent));
            console.log('Balance: ' + satoshiToBTC(result.balance));

            cb({address:faucetAddress, 
                balance:satoshiToBTC(result.balance), 
                reward:satoshiToBTC(reward),
                minimum:satoshiToBTC(minimum_fund)});
        } else {
            // handle the error
            console.log("Unable to find address: "+faucetAddress);
            if (error) console.log("ERROR:", error);

            cb({error:'Unable to find address: '+faucetAddress});
        }
    });
}

// Create P2SH transation
function mktx_P2SH(pubkey, cb) {
    // TODO: do we need to check if pubkey is valid?
    const multisig = createMultisig(pubkey);
    const url = 'https://api.blockcypher.com/v1/btc/test3/addrs/' + faucetAddress + '?unspentOnly=true';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var unspents = json["txrefs"];
            // Consider: can we spend one from 'unconfirmed_txrefs' when there is no confirmed UTXO? 
            if (unspents != null) {
                // TODO: here we use the first one. What if there are many small UTXOs?
                // TODO: can we make it smarter
                for(unspent of unspents) {
                    if (unspent.value > reward) {
                        console.log("Found an unspent transaction output with", satoshiToBTC(unspent.value), "BTC.");

                        // build a transaction 
                        var txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);

                        txb.addInput(unspent.tx_hash, unspent.tx_output_n);
                        txb.addOutput(multisig.address, reward);
                        txb.addOutput(faucetAddress, unspent.value - reward - tx_fee);
                        txb.sign(0, keyPair);
                        
                        var tx = txb.build();
                    
                        console.log(tx.toHex());
                        broadcast_tx(multisig, tx, cb);
                        
                        return;
                    }
                }
            }
            console.log('no fund left');
            cb({error:'Not enough fund available in this faucet'});

        } else {
            console.log("Unable to find any unspent transaction outputs.");
            if (error)
                console.log("ERROR:", error);
            cb({error: 'Unable to find any unspent transaction outputs'})
        }
    });
}

module.exports = {
    mktx_P2SH: mktx_P2SH,
    getBalance: getBalance
}