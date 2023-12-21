<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const emit = defineEmits(['toLogin'])
const userInfo = ref({
  username: '',
  password: ''
})
const protocol = ref(false)
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
const isLoading = ref(false)
const doRegister = () => {
  if (protocol.value) {
    formRef.value!.validate(async (valid) => {
      if (valid) {
        try {
          isLoading.value = true
          await userStore.getUserInfo(userInfo.value)
          ElMessage({ type: 'success', message: '注册成功' })
          emit('toLogin')
        } finally {
          isLoading.value = false
        }
      }
    })
  } else {
    ElMessage({
      type: 'warning',
      message: '请勾选协议'
    })
  }
}
</script>

<template>
  <div class="password-container" @keyup.enter="doRegister">
    <div class="avatar">
      <el-avatar :size="80" :src="undefined">
        <i-ep-user-filled width="40px" height="40px" />
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
            size="large"
            clearable
            placeholder="输入用户名"
            ><template #prefix> <i-ep-user /></template
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userInfo.password"
            class="icon-size"
            show-password
            size="large"
            clearable
            placeholder="输入密码"
            ><template #prefix> <i-ep-lock /></template
          ></el-input>
        </el-form-item>
        <el-form-item style="padding-bottom;: 24px">
          <el-checkbox size="small" v-model="protocol"
            ><span>已阅读并同意服务协议</span></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="confirm"
            auto-insert-space
            style="width: 100%"
            :disabled="!protocol"
            @click="doRegister"
            :loading="isLoading"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <div class="register">
        <span>返回</span><span class="register" @click="emit('toLogin')">登录</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
</style>
