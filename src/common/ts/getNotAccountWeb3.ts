import Web3 from 'web3'
import { PRC_URLS, ChainIds } from '../ts/const'

export default function getNotAccountWeb3(chainId: ChainIds): Web3 {
  const rpc = PRC_URLS[chainId]

  return new Web3(rpc)
}
