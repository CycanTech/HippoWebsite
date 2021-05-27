import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import { getItem, setItem } from '../common/ts/utils'

export const LOCALES = {
  EN: enLocale.name,
  ZH: zhLocale.name
}

export const ROUTER_LOCALES = {
  [LOCALES.EN]: 'en-US',
  [LOCALES.ZH]: 'zh-CN'
}

export const LOCALES_ROUTER = {
  [ROUTER_LOCALES[LOCALES.EN]]: LOCALES.EN,
  [ROUTER_LOCALES[LOCALES.ZH]]: LOCALES.ZH
}

export function getCurrentLang() {
  const itemKey = 'M_LANGUAGE'
  const hash = window.location.hash
  const hashZhLang =
    hash.indexOf('/zh-') >= 0 ? ROUTER_LOCALES[LOCALES.ZH] : hash.indexOf('/en-') >= 0 ? ROUTER_LOCALES[LOCALES.EN] : ''
  const lang = hashZhLang || getItem(itemKey) || window.navigator.language || ROUTER_LOCALES[LOCALES.EN]
  let defaultLang = ROUTER_LOCALES[LOCALES.EN]
  if (lang.indexOf('zh-') >= 0) {
    defaultLang = ROUTER_LOCALES[LOCALES.ZH]
  }
  setItem(itemKey, defaultLang)
  return defaultLang
}