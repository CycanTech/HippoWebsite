<template>
  <div class="m-footer">
    <div class="links">
      <a href="#" target="_blank" v-for="(item, index) in links" :key="index">
        <img :src="item.img" />
      </a>
    </div>
    <div class="lang"></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
const LINKS = [
  {
    link: '',
    img: require('./facebook.png')
  },
  {
    link: '',
    img: require('./cycan.png')
  },
  {
    link: '',
    img: require('./elp.png')
  },
  {
    link: '',
    img: require('./twitter.png')
  }
]
export default {
  setup() {
    const links = ref(LINKS)
    return {
      links
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variable.scss';
.m-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 200px;
  background: $color-theme;
  padding: 0 20%;
  .links {
    img {
      height: 50px;
      width: 50px;
      margin-right: 10px;
    }
  }
}
</style>
