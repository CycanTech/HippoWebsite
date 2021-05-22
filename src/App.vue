<template>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
  created() {
    console.log((this as any).$router.getRoutes())
  }
}
</script>

<style lang="scss" scoped>
.hippo-app {
  position: relative;
  padding-top: 64px;
}
</style>
