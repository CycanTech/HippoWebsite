import Web3 from 'web3'

export default function getNotAccountWeb3(): Web3 {
  return new Web3('https://bsc-dataseed.binance.org')
}
