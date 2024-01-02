<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import ChatList from './components/ChatList.vue'
onMounted(() => ElMessage({ type: 'success', message: '登录成功' }))
</script>

<template>
  <div class="container">
    <SideBar />
    <ChatList />
    <router-view name="chatroom"></router-view>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  .message-panel {
    flex: 1;
    background-color: green;
    height: 100%;
  }
}
</style>
