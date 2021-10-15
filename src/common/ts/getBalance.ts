import getNotAccountWeb3 from './getNotAccountWeb3'
import ERC20 from '@/abi/ERC20.json'
import { getContract } from './utils'
import { ChainIds } from './const'

export default async function getBalance(
  address: string,
  account: string,
  chainId: ChainIds
): Promise<string> {
  const web3 = getNotAccountWeb3(chainId)
  const contract = getContract(ERC20, address, web3)
  const amount = (await contract.methods.balanceOf(account).call()) as string

  return amount
}
