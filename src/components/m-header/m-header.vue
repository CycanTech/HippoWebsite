<template>
  <header class="m-header-wrapper" :class="{ 'is-sticky': scrollY > HEADER_HEIGHT }">
    <div class="m-header">
      <div class="avatar">
        <img src="./avatar.png" />
      </div>
      <div class="navs">
        <div class="nav" @click="scrollToControl('desc')">
          {{ t('message.header.menu.desc') }}
        </div>
        <div class="nav" @click="scrollToControl('IDO')">
          Cycna HDO
        </div>
        <div class="nav">
          <a :href="whitepapers[locale]" target="_blank">
            {{ t('message.header.menu.whitepaper') }}
          </a>
        </div>
        <div class="nav">
          <a :href="stakingLinks[locale]" target="_blank">
            {{ t('message.header.menu.HIPPOStaking') }}
          </a>
        </div>
        <div class="nav">
          <a :href="gameLinks[locale]" target="_blank">
            Hippo Game
          </a>
        </div>
        <div class="nav">
          <a :href="docLinks[locale]" target="_blank">
            {{ t('message.header.menu.document') }}
          </a>
        </div>
      </div>
      <div class="menu-button">
        <el-button type="primary" @click="changeModelDisplay">
          MENU
          <i class="el-icon-s-operation el-icon-s-unfold"></i>
        </el-button>
      </div>
    </div>
    <popup v-model="showModel" :append-to-body="true" position="right">
      <div class="m-hader-model-wrapper">
        <div class="top">
          <div class="avatar">
            <img src="./avatar.png" />
          </div>
          <i class="el-icon-close" @click="changeModelDisplay"></i>
        </div>
        <div class="navs">
          <div class="nav" @click="scrollToControl('desc')">
            {{ t('message.header.menu.desc') }}
          </div>
          <div class="nav" @click="scrollToControl('IDO')">
             Cycna HDO
          </div>
          <div class="nav">
            <a :href="whitepapers[locale]" target="_blank">
              {{ t('message.header.menu.whitepaper') }}
            </a>
          </div>
          <div class="nav">
            <a :href="stakingLinks[locale]" target="_blank">
              {{ t('message.header.menu.HIPPOStaking') }}
            </a>
          </div>
          <div class="nav">
            <a :href="gameLinks[locale]" target="_blank">
              Hippo Game
            </a>
          </div>
          <div class="nav">
            <a :href="docLinks[locale]" target="_blank">
              {{ t('message.header.menu.document') }}
            </a>
          </div>
        </div>
      </div>
    </popup>
  </header>
</template>

<script lang="ts">
import { ref, defineComponent, onUnmounted, onMounted } from 'vue'
import { getElementPosition, sleep } from '../../common/ts/utils'
import { LOCALES } from '../../i18n/index'
import { useI18n } from 'vue-i18n'
import Popup from '../popup/popup.vue'

const EVENT_SCROLL = 'scroll'
const HEADER_HEIGHT = 64
const whitepapers = {
  [LOCALES.ZH]: '/whitepaper/HIPPOLitePaperChinese.pdf',
  [LOCALES.EN]: '/whitepaper/HIPPOLitePaper.pdf'
}
const stakingLinks = {
  [LOCALES.ZH]: 'https://hipdefi.cycan.network/#/zh/index',
  [LOCALES.EN]: 'https://hipfarm.cycan.network/#/en/index'
}
const gameLinks = {
  [LOCALES.ZH]: 'https://global.hippogame.org/#/zh-CN',
  [LOCALES.EN]: 'https://global.hippogame.org/#/en-US'
}
const docLinks = {
  [LOCALES.ZH]: 'https://docs.hippogame.org/v/cn/',
  [LOCALES.EN]: 'https://docs.hippogame.org/'
}

export default defineComponent({
  components: {
    Popup
  },
  setup() {
    const { t, locale } = useI18n()
    const scrollY = useScrollY()

    const showModel = ref(false)
    const changeModelDisplay = () => {
      showModel.value = !showModel.value
    }
    const scrollToControl = async (id: string) => {
      if (showModel.value) {
        showModel.value = false
        await sleep(300)
      }
      const { y } = getElementPosition(id)
      document.body.scrollTop = y ? y - HEADER_HEIGHT : 0
    }

    return {
      scrollY,
      showModel,
      locale,
      whitepapers,
      stakingLinks,
      gameLinks,
      docLinks,

      t,
      changeModelDisplay,
      scrollToControl,
      HEADER_HEIGHT,
      LOCALES
    }
  }
})

const useScrollY = () => {
  const scrollY = ref<number>(0)
  const handerScroll = (e: Event) => {
    const scrollTop: number = (e.target as HTMLElement).scrollTop
    scrollY.value = scrollTop
  }

  onMounted(() => {
    document.body.addEventListener(EVENT_SCROLL, handerScroll)
  })
  onUnmounted(() => {
    document.body.removeEventListener(EVENT_SCROLL, handerScroll)
  })

  return scrollY
}
</script>
<style lang="scss">
@import '../../scss/variable.scss';
@import '../../scss/mixin.scss';
.m-hader-model-wrapper {
  height: 100vh;
  width: 100vw;
  background: #fafeff;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 15px;
    border: 1px solid #e1e7fa;
    .avatar {
      flex: 0 0 120px;
      img {
        width: 114px;
        height: auto;
      }
    }
    .el-icon-close {
      font-size: 50px;
      color: $color-theme;
      cursor: pointer;
    }
  }
  .navs {
    .nav {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      text-align: left;
      cursor: pointer;
      color: #202e6b;
      a {
        color: #202e6b;
      }
    }
  }
}
.m-header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: $color-background-white;
  border-bottom: 1px solid #f1f2f4;
  &.is-sticky {
    position: fixed;
    z-index: 99;
    animation: sticky 1s;
  }
  @keyframes sticky {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  .m-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 50px;
    .avatar {
      flex: 0 0 120px;
      img {
        width: 114px;
        height: auto;
      }
    }
    .navs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: $font-size-medium-x;
      font-weight: bold;
      color: $color-theme;
      flex: 1;
      padding-left: 20%;
      .nav {
        cursor: pointer;
        height: 33px;
        line-height: 33px;
        a {
          color: $color-theme;
        }
      }
    }
    .menu-button {
      display: none;
    }
  }
  @include tablet {
    .m-header {
      .navs {
        display: none;
      }
      .menu-button {
        display: block;
      }
    }
  }
  @include mobile {
    .m-header {
      padding: 0 17px;
      .navs {
        display: none;
      }
      .menu-button {
        display: block;
      }
    }
  }
}
</style>
