import Index from '../pages/index/index.vue'
import Home from '../pages/home/home.vue'
import LotteryResult from '../pages/lottery-result/lottery-result.vue'
import { ROUTER_LOCALES, LOCALES } from '../i18n/index'
import { getCurrentLang } from '../i18n/index'

const pages = [
  { path: '', component: Index },
  { path: 'lotteryResult', component: LotteryResult }
]

export default [
  {
    path: '/',
    redirect: function() {
      const defaultLang = getCurrentLang()
      return `/${defaultLang}`
    }
  },
  {
    path: `/${ROUTER_LOCALES[LOCALES.ZH]}`,
    component: Home,
    children: pages
  },
  {
    path: `/${ROUTER_LOCALES[LOCALES.EN]}`,
    component: Home,
    children: pages
  }
]
