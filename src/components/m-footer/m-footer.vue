<template>
  <div class="m-footer-wrapper">
    <div class="m-footer">
      <div class="links">
        <a :href="item.links[locale]" target="_blank" v-for="(item, index) in links" :key="index">
          <img :src="item.img" />
        </a>
      </div>
      <div class="lang">
        <lang />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Lang from '../lang/lang.vue'
import { ref, defineComponent } from 'vue'
import { LOCALES } from '../../i18n/index'
import { useI18n } from 'vue-i18n'

const LINKS = [
  {
    links: {
      [LOCALES.EN]: 'https://t.me/cycan_network',
      [LOCALES.ZH]: 'https://t.me/CycanGlobal'
    },
    img: require('./telegram.png')
  },
  {
    links: {
      [LOCALES.EN]: 'https://twitter.com/CycanNetwork',
      [LOCALES.ZH]: 'https://twitter.com/CycanNetwork'
    },
    img: require('./twitter.png')
  },
  {
    links: {
      [LOCALES.EN]: 'https://coinmarketcap.com/currencies/hippo-token/',
      [LOCALES.ZH]: 'https://coinmarketcap.com/currencies/hippo-token/'
    },
    img: require('./coinmarketcap.png')
  }
]
export default defineComponent({
  components: {
    Lang
  },
  setup() {
    const links = ref(LINKS)
    const { locale } = useI18n()

    return {
      links,
      locale,
      LOCALES
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../scss/variable.scss';
@import '../../scss/mixin.scss';
.m-footer-wrapper {
  height: 200px;
  background: $color-theme;
  .m-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 200px;
    max-width: 1024px;
    margin: 0 auto;
    .links {
      display: flex;
      align-items: center;
      a {
        margin-right: 10px;
        img {
          height: 49px;
          width: 49px;
        }
      }
    }
    @include tablet {
      padding: 0 40px;
    }
    @include mobile {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;
      .links {
        margin-bottom: 20px;
        a {
          display: block;
          margin-right: 15px;
          &:last-child {
            margin-right: 0;
          }
          img {
            zoom: 0.8;
          }
        }
      }
    }
  }
}
</style>
