import { useRouter, NavigationFailure, LocationAsPath, Router } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ROUTER_LOCALES } from '../../i18n/index'

const prefixPath = (to: string, locale: string): string => {
  return to.indexOf(locale) > -1 ? to : `/${locale}${to.indexOf('/') === 0 ? to : `/${to}`}`
}
const getConfig = (to: LocationAsPath | string, locale: string) => {
  const config = {
    path: typeof to === 'string' ? prefixPath(to, locale) : prefixPath(to.path, locale)
  }
  return typeof to === 'object' ? Object.assign({}, to, config) : config
}

export default function useProxyRouter(): Router {
  const { locale } = useI18n()
  const router = useRouter()

  const push = router.push
  const replace = router.replace

  router.push = (to: LocationAsPath | string): Promise<void | NavigationFailure | undefined> => {
    return push(getConfig(to, ROUTER_LOCALES[locale.value]))
  }
  router.replace = (to: LocationAsPath | string): Promise<void | NavigationFailure | undefined> => {
    return replace(getConfig(to, ROUTER_LOCALES[locale.value]))
  }

  return router
}
