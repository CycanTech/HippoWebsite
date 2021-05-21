<template>
  <div class="hippo-app">
    <MHeader />
    <div class="hippo-app-content">
      <router-view />
    </div>
    <MFooter />
  </div>
</template>

<script lang="ts">
import MHeader from './components/m-header/m-header.vue'
import MFooter from './components/m-footer/m-footer.vue'

export default {
  name: 'App',
  components: {
    MHeader,
    MFooter
  },
  created() {
    console.log((this as any).$router)
  }
}
</script>

<style lang="scss" scoped>
.hippo-app {
  position: relative;
  padding-top: 64px;
}
</style>
