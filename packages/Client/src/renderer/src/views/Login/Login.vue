<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
const handleClose = window.api.closeWindow
const settingExist = ref(false)
const userInfo = ref({
  username: '',
  password: ''
})
// 准备数据对象
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 14,
      message: '密码长度要求6-14个字符',
      trigger: 'blur'
    }
  ]
}
const formRef = ref<FormInstance>()
const resetForm = () => {
  formRef.value!.resetFields()
}
</script>

<template>
  <div class="login-container">
    <div class="window-close" @click="handleClose">
      <i class="login-icon"><i-ep-close /></i>
    </div>
    <div class="proxy-setting" @click="settingExist = !settingExist">
      <i class="login-icon"><i-ep-setting /></i>
    </div>
    <div class="login-panel" v-if="!settingExist">
      <div class="password-container">
        <div class="avatar">
          <el-avatar :size="80" :src="undefined">
            <i-ep-user-filled width="40px" height="40px" />
            <i-gravity-ui:cloud-gear />
          </el-avatar>
        </div>
        <div class="login-form">
          <el-form
            ref="formRef"
            :model="userInfo"
            :rules="rules"
            label-position="top"
            label-width="60px"
          >
            <el-form-item prop="username">
              <el-input
                v-model="userInfo.username"
                class="icon-size"
                :prefix-icon="User"
                size="large"
                clearable
                placeholder="输入用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="userInfo.password"
                class="icon-size"
                :prefix-icon="Lock"
                show-password
                size="large"
                clearable
                placeholder="输入密码"
              />
            </el-form-item>
            <el-form-item style="padding-bottom;: 24px">
              <el-checkbox size="small"><span>已阅读并同意服务协议</span></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                class="confirm"
                auto-insert-space
                style="width: 100%"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
          <div class="register"><span>没有账号？请</span><span class="register">注册</span></div>
        </div>
      </div>
    </div>
    <div class="setting" v-if="settingExist">
      <el-form
        ref="formRef"
        :model="userInfo"
        :rules="rules"
        label-position="top"
        label-width="60px"
      >
        <el-form-item prop="username">
          <el-input
            v-model="userInfo.username"
            class="icon-size"
            :prefix-icon="User"
            size="large"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userInfo.password"
            class="icon-size"
            :prefix-icon="Lock"
            show-password
            size="large"
            clearable
          />
        </el-form-item>
        <el-form-item style="padding-bottom;: 24px">
          <el-checkbox size="small"><span>已阅读并同意服务协议</span></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="confirm"
            auto-insert-space
            style="width: 100%"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
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
    .password-container {
      -webkit-app-region: no-drag;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 48px;
      .avatar {
        margin-bottom: 24px;
      }
      .login-form {
        width: 100%;
        .register {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          .register {
            color: #2d8cec;
            text-decoration: none;
          }
        }
      }
    }
  }
  .setting {
    padding: 64px 32px 0;
    width: 100%;
    height: 100%;
  }
}
</style>
