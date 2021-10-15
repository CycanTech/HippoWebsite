import { LOCALES } from '../i18n/index'

export const SOCIAL_LINKS = [
  {
    links: {
      [LOCALES.EN]: 'https://t.me/cycan_network',
      [LOCALES.ZH]: 'https://t.me/CycanGlobal'
    },
    img: require('./img/telegram.png')
  },
  {
    links: {
      [LOCALES.EN]: 'https://twitter.com/CycanNetwork',
      [LOCALES.ZH]: 'https://twitter.com/CycanNetwork'
    },
    img: require('./img/twitter.png')
  },
  {
    links: {
      [LOCALES.EN]: 'https://coinmarketcap.com/currencies/hippo-token/',
      [LOCALES.ZH]: 'https://coinmarketcap.com/currencies/hippo-token/'
    },
    img: require('./img/coinmarketcap.png')
  },
  {
    links: {
      [LOCALES.EN]: 'https://bscscan.com/token/0xe6ffa2e574a8bbeb5243d2109b6b11d4a459f88b',
      [LOCALES.ZH]: 'https://bscscan.com/token/0xe6ffa2e574a8bbeb5243d2109b6b11d4a459f88b'
    },
    img: require('./img/bsc.png')
  },
  {
    links: {
      [LOCALES.EN]: 'https://www.coingecko.com/en/coins/hippo-token/',
      [LOCALES.ZH]: 'https://www.coingecko.com/en/coins/hippo-token/'
    },
    img: require('./img/coingecko.png')
  }
]

export const TABS = [
  {
    names: {
      [LOCALES.ZH]: '空投详情',
      [LOCALES.EN]: 'Airdrop Detail'
    },
    img: require('./img/airdrop.png'),
    content: {
      [LOCALES.ZH]: `大家好，經過一周多的等待，萬眾期待的小河馬（HIPPO）空投終於可以領取發放啦！

我們本次空投活動從5月18號開始，面對全球開啟，通過轉發推特和微博的活動，我們得到了海內外很多朋友的關註和支持，第一批白名單就收到了接近6w地址，我們很驚喜也和激動，謝謝大家的踴躍參與！
      
在5月31日，Hippo-USDT交易對正式上線Pancake，同時空投繼續，送完即止，同時空投的白名單會每天更新，在這裏供小夥伴們自行查詢和獲取空投。
      
Hippo（HIP）是Cycan社區發起的一場徹底的去中心化社區實驗，目標是構造一個完全由社區驅動的DAO組織。無團隊份額、無私募，70%全部分散空投給社區，5%根據貢獻發放給社區誌願者，25%用於創設初始交易流動池並銷毀私鑰。

`,
      [LOCALES.EN]: `Hello Everyone! After more than a week of waiting, the much-anticipated HIPPO airdrop is finally available.

Our HIP airdrop activity got underway on the 18th of May . Thanks to all the activity on Twitter and Weibo, we have received the attention and support of many friends at home and abroad. The number of BSC addresses we have collected so far has almost reached 60k. We have been pleasantly surprised and excited about the enthusiasm for Hippo. Thank you for your active participation!
       
On May 31, the Hippo-USDT trading pair is getting officially listed on Pancake and the airdrop will continue.
       
At the same time, the airdrop whitelist will be updated every day and it is here for those who want to apply, to do so and claim the airdrop on their own.
       
Hippo (HIP) is a thorough decentralized community experiment initiated by the Cycan community. Our vision is to build a Decentralized Autonomous Organization（DAO） driven entirely by the community. No team shares, no private placement, 70% of all airdrops are distributed to the community, 5% are distributed to community volunteers based on contributions, and 25% are used to create an initial liquidity pool and the private key will be destroyed.`
    }
  }
]

export const LOTTERYS = [
  {
    lotteryPeriod: 1,
    isLotteryDrawn: false,
    contents: {
      [LOCALES.ZH]: `抽獎時間：2021/06/09 19:00（GMT+8）<br/>該獎勵不需要進行抽獎，僅跟進持幣數量排名獲得獎勵。通過鏈上智能合約隨機生成888個號碼，去掉重復的號碼，第1個號碼為特等獎，第2-11個號碼為一等獎，在剩余號碼中剔除號碼0-99，剩余號碼中的前700個為二等獎`,
      [LOCALES.EN]: ``
    }
  }
]

export const VIDEOS = {
  [LOCALES.EN]: {
    video: '/video/HippoDesc_en-US.MP4',
    poster: '/video/poster_en-US.png'
  },
  [LOCALES.ZH]: {
    video: '/video/HippoDesc_zh-CN.MP4',
    poster: '/video/poster_zh-CN.png'
  }
}
