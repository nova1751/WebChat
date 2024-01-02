<template>
  <div class="resize"></div>
</template>

<style scoped lang="scss">
.resize {
  -webkit-app-region: no-drag;
  width: 4px;
  background-color: #f2f2f2;
  cursor: ew-resize;
  flex-shrink: 0;
}
</style>
