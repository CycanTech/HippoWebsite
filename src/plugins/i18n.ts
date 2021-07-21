import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import ElementLocale from 'element-plus/lib/locale'
import en from '../i18n/en.json'
import zh from '../i18n/zh.json'
import { LOCALES, LOCALES_ROUTER } from '../i18n/index'
import { getCurrentLang } from '../i18n/index'

const messages = {
  [LOCALES.EN]: {
    el: enLocale.el,
    message: en
  },
  [LOCALES.ZH]: {
    el: zhLocale.el,
    message: zh
  }
}

const i18n = createI18n({
  legacy: false,
  locale: LOCALES_ROUTER[getCurrentLang()],
  fallbackLocale: LOCALES.EN,
  messages
})

ElementLocale.i18n(i18n.global.t)

export default (app: App) => {
  app.use(i18n)
}
