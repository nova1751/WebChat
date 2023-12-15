<script setup lang="ts">
onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'F11') {
      event.preventDefault()
    }
  })
})
</script>
<template>
  <router-view></router-view>
</template>
<style scoped lang="scss"></style>
