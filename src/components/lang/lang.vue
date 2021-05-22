<template>
  <span class="langs">
    <a href="javascript:;" @click="toggle">{{ current === 'zh-CN' ? 'English' : '中文' }}</a>
  </span>
</template>

<script>
import { setItem } from '../../common/ts/utils'
import { LOCALES, LOCALES_ROUTER, ROUTER_LOCALES, getCurrentLang } from '../../i18n/index'

const M_LANGUAGE = 'M_LANGUAGE'

export default {
  data() {
    return {
      current: getCurrentLang()
    }
  },
  computed: {
    lang() {
      return this.$route.path.split('/')[1] || getCurrentLang()
    }
  },
  watch: {
    $router() {
      if (this.current != this.lang) {
        this.toggle(this.lang)
      }
    }
  },
  methods: {
    toggle() {
      this.current =
        this.current === ROUTER_LOCALES[LOCALES.ZH] ? ROUTER_LOCALES[LOCALES.EN] : ROUTER_LOCALES[LOCALES.ZH]
      setItem(M_LANGUAGE, this.current)
      this.$i18n.locale = LOCALES_ROUTER[this.current]
      this.$router.replace({
        path: this.$route.path.replace(/\/(zh-CN|en-US)(?=\/?)/, `/${this.current}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.langs {
}
</style>
