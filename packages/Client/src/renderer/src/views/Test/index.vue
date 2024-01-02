<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="side-bar"><router-link to="/home">回到Home页面</router-link></div>
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
    background-color: red;
    -webkit-app-region: no-drag;
  }
  .message-panel {
    flex: 1;
    background-color: green;
    height: 100%;
  }
}
</style>
