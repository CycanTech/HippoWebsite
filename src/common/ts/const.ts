import JSBI from 'jsbi'

export const CHAIN_ID = process.env.VUE_APP_CHAIN_ID
export const CHAIN_ID_LIST = [CHAIN_ID]
export const BSCSCAN_PRC_URL = process.env.VUE_APP_BSCSCAN_PRC_URL

export const AIRDROP_ADDRESS_V1 = '0x7452801dcC1aE7E07ffC875330404b7B936eEC84'
export const AIRDROP_ADDRESS_V2 = '0x0C04da1263704B5C814B5B3A65d7eaEA188fdbD7'
export const HIPPO_ADDRESS = '0xe6ffa2e574a8bbeb5243d2109b6b11d4a459f88b'
export const SPENDER_ADDRESS = '0xa6F7f94c4AD4e1810e66A815C6A924D179d5B61B'

export const IQT_TOKEN_ADDRESS = '0x93d2fDF858Ef4Dce8EC5b011CC6C6057e706E17A'
export const CYN_ADDRESS = '0x8BAc919fBca13d67e9f901BF41537931effF0E7D'
export const IOD_SWAP_ADDRESS = '0x5574B4c759A5e1E1B7C581fb80eD966748b30bB2'

export const HQT_TOKEN_ADDRESS = '0x433c3d5ee2fae7aae3aa67ea9702d8fc806f4786'
export const ACY_ADDRESS = '0x8b1f836491903743fE51ACd13f2CC8Ab95b270f6'
export const ACY_IOD_SWAP_ADDRESS = '0xafD7fF75Fa2D326e67Cb92DAA8f53209f2D56CF7'
export const MUSDT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'

export const ZERO = JSBI.BigInt('0')

export enum ChainIds {
  BSC = 56,
  MATIC = 137
}

export const PRC_URLS: { [chainId in ChainIds]: string } = {
  [ChainIds.BSC]: 'https://bsc-dataseed.binance.org',
  [ChainIds.MATIC]: 'https://rpc-mainnet.maticvigil.com'
}
