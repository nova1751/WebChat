<script setup lang="ts">
import type { groupMessage, userMessage } from '@/types/message'
import { IPAddress } from '@/utils/request'
import { toggleTime2 } from '@/utils/timeFormat'
import { useContactStore } from '@/stores/contact'
const props = defineProps(['keyword'])
const contactStore = useContactStore()
// 定义消息列表渲染
const messageList = computed(() =>
  contactStore.messageList.filter((item) => item.name.includes(props.keyword))
)
// 定义最新消息转化的函数
const parseMessage = (item: groupMessage | userMessage) => {
  if (item.type == 'text') {
    return item.lastMessage
  } else if (item.type == 'image') {
    return '[图片]'
  } else if (item.type == 'video') {
    return '[视频]'
  } else if (item.type == 'file') {
    return '[文件]'
  } else {
    return '[未知文件]'
  }
}
// 调整不同的点击状态的显示
// 保存目前的聊天窗口
const curIndex = ref()
const handleClick = (message: groupMessage | userMessage) => {
  curIndex.value = message.room
  contactStore.getMessageList()
  const curRoom = contactStore.messageList.find((item) => item.room === message.room)!
  if (curRoom.hasOwnProperty('user_id')) {
    contactStore.currentRoom.type = 0
    contactStore.currentRoom.receiver = (message as userMessage).user_id
  } else {
    contactStore.currentRoom.type = 1
    contactStore.currentRoom.group = (message as groupMessage).group_id
  }
  contactStore.currentRoom.name = message.name
  contactStore.currentRoom.room = message.room
}
</script>

<template>
  <div class="list">
    <div
      class="item"
      v-for="message in messageList"
      :key="message.room"
      :class="{ active: message.room === curIndex }"
      @click="handleClick(message)"
    >
      <div class="avatar">
        <el-avatar :size="40" :src="message.avatar ? IPAddress + message.avatar : null">
          <el-icon :size="16"><IEpUserFilled /></el-icon
        ></el-avatar>
      </div>
      <div class="info">
        <div class="name">{{ message.name }}</div>
        <div class="msg">
          {{ parseMessage(message) }}
        </div>
      </div>
      <div class="badage">
        <div class="time">{{ toggleTime2(message.updated_at) }}</div>
        <div class="hot" :style="{ opacity: message.unreadCount ? 1 : 0 }">
          {{ message.unreadCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list {
  -webkit-app-region: no-drag;
  // background-color: skyblue;
  height: 100%;
  overflow: auto;
  user-select: none;
  @include scroll-bar();
  .item {
    height: 72px;
    padding: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 30px;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      overflow: hidden;
      flex: 1;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      .name {
        @include flex-ellipsis();
        font-size: 14px;
      }
      .msg {
        @include flex-ellipsis();
        font-size: 12px;
        color: rgb(174, 174, 174);
        line-height: 1.5;
      }
    }
    .badage {
      width: 50px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;
      white-space: nowrap;
      .time {
        color: rgb(160, 160, 160);
        font-size: 10px;
      }
      .hot {
        padding: 0 4px;
        font-weight: bold;
        border-radius: 8px;
        min-width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 9px;
        vertical-align: middle;
        background-color: rgb(192, 192, 192);
        color: white;
        text-align: center;
      }
    }
    &:hover {
      background-color: rgb(245, 245, 245);
    }
    &.active {
      color: white;
      background-color: $qq-blue;
      .msg,
      .time {
        color: white;
      }
    }
  }
}
</style>
