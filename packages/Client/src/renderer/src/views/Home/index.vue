<script setup lang="ts">
onMounted(() => ElMessage({ type: 'success', message: '登录成功' }))
</script>

<template>
  <div class="container">
    <div class="side-bar"></div>
    <div class="message-panel"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  .side-bar {
    background-color: red;
    width: 60px;
    height: 100%;
  }
  .message-panel {
    flex: 1;
    height: 100%;
    background-color: red;
  }
}
</style>
