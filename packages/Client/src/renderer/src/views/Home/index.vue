<script setup lang="ts">
import SideBar from './components/SideBar.vue'
onMounted(() => ElMessage({ type: 'success', message: '登录成功' }))
</script>

<template>
  <div class="container">
    <div class="side-bar"><SideBar /></div>
    <div class="message-panel"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  .side-bar {
    width: 60px;
    height: 100%;
    background-color: rgb(242, 242, 242);
  }
  .message-panel {
    flex: 1;
    background-color: green;
    height: 100%;
  }
}
</style>
