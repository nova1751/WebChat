<script setup lang="ts">
import Proxy from './components/Proxy.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
const handleClose = window.api?.closeWindow
const settingExist = ref('login')
const preExist = ref('')
const toLogin = () => (settingExist.value = 'login')
const toRegister = () => (settingExist.value = 'register')
const toProxy = () => {
  ElMessage({
    type: 'success',
    message: 'success'
  })
  console.log(10, settingExist.value)
  if (settingExist.value !== 'proxy') {
    preExist.value = settingExist.value
    settingExist.value = 'proxy'
  } else {
    if (preExist.value === 'login') {
      toLogin()
    } else {
      toRegister()
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="window-close" @click="handleClose">
      <i class="login-icon"><i-ep-close /></i>
    </div>
    <div class="proxy-setting" @click="toProxy">
      <i class="login-icon"><i-ep-setting /></i>
    </div>
    <div class="login-panel">
      <Login v-if="settingExist === 'login'" @to-register="toRegister" />
      <Register v-if="settingExist === 'register'" @to-login="toLogin" />
      <Proxy v-if="settingExist === 'proxy'" />
    </div>
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
  position: relative;
  user-select: none;
  .window-close {
    -webkit-app-region: no-drag;
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 8px;
    display: flex;
    z-index: 2100;
    &:hover {
      background-color: #c42b1c;
    }
  }
  .proxy-setting {
    -webkit-app-region: no-drag;
    position: absolute;
    right: 28px;
    top: 0;
    padding: 6px 8px;
    display: flex;
    z-index: 2100;
  }
  i.login-icon {
    width: 16px;
    height: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .login-panel {
    padding: 64px 32px 0;
    width: 100%;
    height: 100%;
  }
}
</style>
