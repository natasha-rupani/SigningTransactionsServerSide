const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

const addressJSON = require('./SmartContract/build/CounterAddress.json');
const contractJSON = require('./SmartContract/build/contracts/Counter.json');

const CONTRACT_ADDRESS = addressJSON.address;
const CONTRACT_ABI = contractJSON.abi;

let web3, contract, incrementABI, decrementABI, getCountABI;
const accountAddress = process.env.ACCOUNT_ADDRESS
const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

(async () => {
    web3 = new Web3(process.env.RPC_URI);
    contract = await new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    incrementABI = contract.methods.increment().encodeABI();
    decrementABI = contract.methods.decrement().encodeABI();
    getCountABI = contract.methods.getCount().encodeABI();

})();

async function makeTransaction(_data) {
    _nonce = await web3.eth.getTransactionCount(accountAddress);

    const rawTx = {
        nonce: _nonce,
        gasPrice: '0x20000000000',
        gasLimit: '0x27511',
        to: CONTRACT_ADDRESS,
        value: 0,
        data: _data
    }

    const tx = new Tx(rawTx);
    tx.sign(privateKey);

    const serializedTx = tx.serialize();

    return web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
}

const connectionWeb3 = {

    async increment() {
        return makeTransaction(incrementABI);
    },

    async decrement() {
        return makeTransaction(decrementABI);
    },

    async getCount() {
        return Promise.all([
            makeTransaction(getCountABI),
            contract.methods.getCount().call()
        ]);
    }
}

module.exports = connectionWeb3;