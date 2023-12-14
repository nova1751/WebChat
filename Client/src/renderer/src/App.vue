<script setup lang="ts">
const count = ref(0)
const handleClick = () => {
  count.value++
  ElMessage({
    type: 'success',
    message: `${count.value}`
  })
}
</script>
<template>
  <div>
    <el-button type="primary" @click="handleClick">test</el-button>ssssssssssssssss {{ count }}????
  </div>
</template>
<style scoped lang="scss"></style>
