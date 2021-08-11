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
      [LOCALES.ZH]: `大家好，经过一周多的等待，万众期待的小河马（HIPPO）空投终于可以领取发放啦！

我们本次空投活动从5月18号开始，面对全球开启，通过转发推特和微博的活动，我们得到了海内外很多朋友的关注和支持，第一批白名单就收到了接近6w地址，我们很惊喜也和激动，谢谢大家的踊跃参与！
      
在5月31日，Hippo-USDT交易对正式上线Pancake，同时空投继续，送完即止，同时空投的白名单会每天更新，在这里供小伙伴们自行查询和获取空投。
      
Hippo（HIP）是Cycan社区发起的一场彻底的去中心化社区实验，目标是构造一个完全由社区驱动的DAO组织。无团队份额、无私募，70%全部分散空投给社区，5%根据贡献发放给社区志愿者，25%用于创设初始交易流动池并销毁私钥。
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
      [LOCALES.ZH]: `抽奖时间：2021/06/09 19:00（GMT+8）<br/>该奖励不需要进行抽奖，仅跟进持币数量排名获得奖励。通过链上智能合约随机生成888个号码，去掉重复的号码，第1个号码为特等奖，第2-11个号码为一等奖，在剩余号码中剔除号码0-99，剩余号码中的前700个为二等奖`,
      [LOCALES.EN]: `抽奖时间：2021/06/09 19:00（GMT+8）<br/>。该奖励不需要进行抽奖，仅跟进持币数量排名获得奖励。 通过链上智能合约随机生成888个号码，去掉重复的号码，第1个号码为特等奖，第2-11个号码为一等奖，在剩余号码中剔除号码0-99，剩余号码中的前700个为二等奖`
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
