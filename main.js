const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

// Your private key goes here
const myKey = ec.keyFromPrivate(
  'b055379c38925ebd6fa3703ff1a46da112be8a2467a69ca3985839718e6f2c28'
)
const myWalletAddress = myKey.getPublic('hex')

// Create the chain
let tomCoin = new Blockchain()

// Create and sign a transaction (can put any address)
const tx1 = new Transaction(myWalletAddress, 'address1', 100)
tx1.signTransaction(myKey)
tomCoin.addTransaction(tx1)

// Mine the block
console.log('\n Starting the miner...')
console.log()
tomCoin.minePendingTransactions(myWalletAddress)

// Create and sign another transaction
const tx2 = new Transaction(myWalletAddress, 'address2', 20)
tx2.signTransaction(myKey)
tomCoin.addTransaction(tx2)

// Mine the block
tomCoin.minePendingTransactions(myWalletAddress)

// Check the balance of a given address: should be 80, 200 mining reward - 120 spent
console.log(
  '\n Balance of wallet is:',
  tomCoin.getBalanceOfAddress(myWalletAddress)
)

// Verify the validity of the chain
console.log()
console.log('Is chain valid?', tomCoin.isChainValid())

// Uncomment these lines to test tampering with the chain
// tomCoin.chain[1].transactions[0].amount = 10
// console.log()
// console.log('Is chain valid?', tomCoin.isChainValid())
