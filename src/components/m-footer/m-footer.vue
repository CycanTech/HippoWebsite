<template>
  <div class="m-footer">
    <div class="links">
      <a href="#" target="_blank" v-for="(item, index) in links" :key="index">
        <img :src="item.img" />
      </a>
    </div>
    <div class="lang">
      <lang />
    </div>
  </div>
</template>

<script lang="ts">
import Lang from '../lang/lang.vue'
import { ref, defineComponent } from 'vue'
const LINKS = [
  { link: '', img: require('./telegram.png') },
  { link: '', img: require('./twitter.png') }
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
.m-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 200px;
  background: $color-theme;
  padding: 0 20%;
  .links {
    img {
      height: 49px;
      width: 49px;
      margin-right: 10px;
    }
  }
  @include mobile {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    .links {
      margin-bottom: 30px;
      img {
        zoom: 0.6;
        margin-right: 5px;
      }
    }
  }
}
</style>
