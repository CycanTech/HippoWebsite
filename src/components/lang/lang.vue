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

<script lang="ts">
import { ref, watch, computed, defineComponent } from 'vue'
import { setItem } from '../../common/ts/utils'
import { LOCALES, ROUTER_LOCALES, LOCALES_ROUTER, getCurrentLang } from '../../i18n/index'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const M_LANGUAGE = 'M_LANGUAGE'
const langs = [
  { text: '中文', lang: ROUTER_LOCALES[LOCALES.ZH] },
  { text: 'English', lang: ROUTER_LOCALES[LOCALES.EN] }
]

export default defineComponent({
  setup() {
    const current = ref(getCurrentLang())
    const route = useRoute()
    const router = useRouter()
    const { locale } = useI18n()
    const isVisible = ref(false)

    const lang = computed(() => {
      const urlLang = route.path.split('/')[1]
      return urlLang || getCurrentLang()
    })

    const handleRouterPathChange = (): void => {
      if (current.value === lang.value) {
        return
      }
      toggle(lang.value)
    }
    const toggle = (routerLang: string): void => {
      current.value = LOCALES_ROUTER[routerLang]
      locale.value = current.value
      setItem(M_LANGUAGE, current.value)
      router.replace({
        path: route.path.replace(/\/(zh-CN|en-US)(?=\/?)/, `/${ROUTER_LOCALES[current.value]}`)
      })
    }

    watch(() => router.currentRoute.value.path, handleRouterPathChange)

    return {
      LOCALES,
      current,
      isVisible,
      langs,

      toggle
    }
  }
})
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
