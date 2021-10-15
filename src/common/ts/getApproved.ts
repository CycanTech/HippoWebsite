import getNotAccountWeb3 from './getNotAccountWeb3'
import ERC20 from '@/abi/ERC20.json'
import JSBI from 'jsbi'
import { ChainIds, ZERO } from './const'
import { getContract } from './utils'

export default async function getApproved(
  address: string,
  spender: string,
  account: string,
  chainId: ChainIds,
  amount?: string
): Promise<boolean> {
  const web3 = getNotAccountWeb3(chainId)

  const contract = getContract(ERC20, address, web3)
  const allowance = (await contract.methods.allowance(account, spender).call()) as string

  if (amount) {
    const allowanceAmount = JSBI.BigInt(allowance)
    return JSBI.greaterThanOrEqual(allowanceAmount, JSBI.BigInt(amount))
  }

  return JSBI.GT(JSBI.BigInt(allowance), ZERO)
}
