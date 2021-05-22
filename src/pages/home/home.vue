<template>
  <div class="hippo-app">
    <m-header />
    <div class="hippo-app-content">
      <router-view />
    </div>
    <m-footer />
  </div>
</template>

<script lang="ts">
import MHeader from '../../components/m-header/m-header.vue'
import MFooter from '../../components/m-footer/m-footer.vue'

export default {
  name: 'App',
  components: {
    MHeader,
    MFooter
  }
}
</script>

<style lang="scss" scoped>
.hippo-app {
  position: relative;
  padding-top: 64px;
}
</style>
