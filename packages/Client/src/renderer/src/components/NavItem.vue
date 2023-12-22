<script setup lang="ts">
import Chat2Line from '~icons/mingcute/chat-2-line'
import PersonCircleOutline from '~icons/ion/person-circle-outline'
defineProps(['maskId', 'maskClass'])
const components = shallowRef([Chat2Line, PersonCircleOutline])
</script>

<template>
  <div class="nav-item">
    <el-icon :size="28" class="icon"><component :is="components[maskId]" /></el-icon>
    <div :class="['icon-filled', maskClass]">
      <div class="item-mask"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-item {
  -webkit-app-region: no-drag;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  margin-bottom: 8px;
  position: relative;
  .icon {
    transition: 0.16s;
  }
  .icon-filled {
    width: 38px;
    height: 38px;
    position: absolute;
    display: none;
    &.chat {
      -webkit-mask: url('@/assets/icons/chat-filled.svg') no-repeat center;
      mask: url('@/assets/icons/chat-filled.svg') no-repeat center;
    }
    &.contact {
      -webkit-mask: url('@/assets/icons/contact-filled.svg') no-repeat center;
      mask: url('@/assets/icons/contact-filled.svg') no-repeat center;
    }

    @keyframes highlightIcon {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
    .item-mask {
      animation-duration: 0.16s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: forwards;
      animation-play-state: running;
      animation-name: highlightIcon;
      border-radius: 50%;
      height: 100%;
      opacity: 1;
      transform: scale(0);
      transform-origin: left bottom;
      width: 100%;
      background-color: #0093f5;
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    .icon {
      opacity: 0.5;
    }
  }
  &.active {
    background-color: rgba(0, 0, 0, 0.1);
    .icon {
      opacity: 0;
    }
    .icon-filled {
      display: block;
    }
  }
}
</style>
