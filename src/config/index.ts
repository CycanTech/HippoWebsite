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
  }
]
