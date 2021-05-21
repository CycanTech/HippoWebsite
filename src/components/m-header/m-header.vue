<template>
  <div class="m-header-wrapper" :class="{ 'is-sticky': scrollY > HEADER_HEIGHT }">
    <div class="m-header">
      <img class="avatar" src="./avatar.png" />
      <div class="navs">
        <div class="nav"></div>
        <div class="nav"></div>
        <div class="nav"></div>
        <div class="nav"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

const EVENT_SCROLL = 'scroll'
const HEADER_HEIGHT = 64

export default {
  setup() {
    const scrollY = useScrollY()
    return {
      scrollY,
      HEADER_HEIGHT
    }
  }
}

const useScrollY = () => {
  const scrollY = ref<number>(0)
  document.addEventListener(EVENT_SCROLL, () => {
    const scrollTop: number = document.documentElement.scrollTop
    scrollY.value = scrollTop
  })
  return scrollY
}
</script>
<style lang="scss" scoped>
@import '../../scss/variable.scss';
.m-header-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  padding: 0 15%;
  background: $color-background-white;
  &.is-sticky {
    position: fixed;
    top: 0;
    z-index: 9999;
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
  }
}
</style>
