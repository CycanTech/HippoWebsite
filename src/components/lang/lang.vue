<template>
  <div class="langs">
    <el-popover v-model:visible="isVisible" placement="top" :offset="22" width="60" trigger="click">
      <div class="lang-list">
        <div
          class="lang-item"
          v-for="(item, index) in langs"
          @click="toggle(item.lang)"
          :key="index"
        >
          {{ item.text }}
        </div>
      </div>
      <template #reference>
        <div class="lang">
          <span>Languange</span>
          <i :class="{ 'is-rotate': isVisible }" class="el-icon-caret-bottom"></i>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script>
import { setItem } from '../../common/ts/utils'
import { LOCALES, LOCALES_ROUTER, ROUTER_LOCALES, getCurrentLang } from '../../i18n/index'

const M_LANGUAGE = 'M_LANGUAGE'
const langs = [
  { text: '中文', lang: ROUTER_LOCALES[LOCALES.ZH] },
  { text: 'English', lang: ROUTER_LOCALES[LOCALES.EN] }
]

export default {
  data() {
    return {
      langs,
      current: getCurrentLang(),
      isVisible: false
    }
  },
  computed: {
    lang() {
      return this.$route.path.split('/')[1] || getCurrentLang()
    }
  },
  watch: {
    $router() {
      if (this.current !== this.lang) {
        this.toggle(this.lang)
      }
    }
  },
  methods: {
    toggle(lang) {
      this.isVisible = false
      this.current = lang
      setItem(M_LANGUAGE, this.current)
      this.$i18n.locale = LOCALES_ROUTER[this.current]
      this.$router.replace({
        path: this.$route.path.replace(/\/(zh-CN|en-US)(?=\/?)/, `/${this.current}`)
      })
    }
  }
}
</script>

<style lang="scss">
.langs {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 131px;
  height: 45px;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  border-radius: 23px;
}
.lang {
  .el-icon-caret-bottom {
    margin-left: 5px;
    &.is-rotate {
      transition: all 0.3s;
      transform: rotate(-180deg);
    }
  }
}
.lang-list {
  .lang-item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
