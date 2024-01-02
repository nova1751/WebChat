<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore()
const config = ref({
  ...settingStore.setting
})
const formRef = ref<FormInstance>()
const doSet = () => {
  formRef.value!.validate(async (valid) => {
    if (valid) {
      settingStore.updateSetting(config.value)
      ElMessage({ type: 'success', message: '保存成功' })
    }
  })
}
const rules = {
  server: [
    {
      pattern:
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
      message: '请输入正确的服务器地址',
      trigger: 'blur'
    }
  ],
  proxy: [
    {
      pattern:
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
      message: '请输入正确的代理地址',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <div class="setting">
    <el-form :model="config" :rules="rules" ref="formRef" label-position="top" label-width="60px">
      <div class="title"><span>网络代理设置</span></div>
      <el-form-item prop="server">
        <el-input
          v-model="config.server"
          class="icon-size"
          size="large"
          placeholder="请输入后端服务器地址"
          clearable
          ><template #prefix> <i-ion-server-outline /></template
        ></el-input>
      </el-form-item>
      <el-form-item prop="proxy">
        <el-input
          v-model="config.proxy"
          class="icon-size"
          size="large"
          placeholder="请输入代理服务器地址"
          clearable
        >
          ><template #prefix> <i-gravity-ui:cloud-gear /></template
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          class="confirm"
          auto-insert-space
          style="width: 100%"
          @click="doSet"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.setting {
  -webkit-app-region: no-drag;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 84px;
  }
}
</style>
