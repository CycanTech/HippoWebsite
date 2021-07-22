import getNotAccountWeb3 from './getNotAccountWeb3'
import ERC20 from '@/abi/ERC20.json'
import { getContract } from './utils'

export default async function getBalance(address: string, account: string): Promise<string> {
  const web3 = getNotAccountWeb3()
  const contract = getContract(ERC20, address, web3)
  const amount = (await contract.methods.balanceOf(account).call()) as string

  return amount
}
