import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

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
