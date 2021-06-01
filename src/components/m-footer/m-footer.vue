<template>
  <div class="m-footer-wrapper">
    <div class="m-footer">
      <div class="links">
        <a :href="item.link" target="_blank" v-for="(item, index) in links" :key="index">
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
const LINKS = [
  { link: 'https://t.me/CycanNetwork', img: require('./telegram.png') },
  { link: 'https://twitter.com/CycanNetwork', img: require('./twitter.png') }
]
export default defineComponent({
  components: {
    Lang
  },
  setup() {
    const links = ref(LINKS)
    return {
      links
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
    @include tablet{
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
