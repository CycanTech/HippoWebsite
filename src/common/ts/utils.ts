import { ROUTER_LOCALES, LOCALES } from '../../i18n/index'

export function setItem(k: string, v: string) {
  try {
    window.localStorage.setItem(k, v)
  } catch (e) {
    console.log(`SetItem Error ${e}`)
  }
}

export function getItem(k: string): string | undefined {
  const v = window.localStorage.getItem(k)
  return v || undefined
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
