<script setup lang="ts">
onMounted(() => {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'F11') {
      event.preventDefault()
    }
  })
})
</script>
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<style scoped lang="scss"></style>
