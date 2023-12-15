<script setup lang="ts">
const handleKeyDown = (event) => {
  if (event.keycode === 112) {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="login-container" @keydown="handleKeyDown">
    <div class="header">测试</div>
    <div class="form">测试</div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background-color: #d9afd9;
  background-image: linear-gradient(45deg, #d9afd9 0%, #97d9e1 100%);
  display: flex;
  flex-direction: column;
  -webkit-app-region: drag;
  padding: 27px;
  .header {
    margin-top: 100px;
    height: 100%;
    background-color: green;
    -webkit-app-region: no-drag;
  }
  .form {
    height: 100%;
    background-color: blue;
    -webkit-app-region: no-drag;
  }
}
</style>
