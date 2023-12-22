<script setup lang="ts"></script>

<template>
  <div class="tool-item">
    <el-icon :size="24" class="icon"><slot></slot></el-icon>
  </div>
</template>

<style scoped lang="scss">
.tool-item {
  width: 38px;
  height: 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon:hover {
    color: #0093f5;
  }
}
</style>
