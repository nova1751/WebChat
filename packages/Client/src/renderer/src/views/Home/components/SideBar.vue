<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import type { FormInstance } from 'element-plus'
import { onClickOutside } from '@vueuse/core'
import NavItem from '@/components/NavItem.vue'
import Tooltem from '@/components/Tooltem.vue'
const logout = window.api?.logout
const userStore = useUserStore()
const upperList = ref(['chat', 'contact'])
const curIndex = ref(0)
const centerDialogVisible = ref(false)
// 定义一个新的对象收集表单数据
const updatedUserInfo = reactive({
  ...userStore.userInfo!
})
const routes = ['/', '/friends']
const router = useRouter()
const handleClick = (i: number) => {
  curIndex.value = i
  router.push(routes[i])
}
// 定义电话号码的校验规则
const rules = {
  phone: [
    { pattern: /[0-9]{11}/, message: '请输入正确的电话号码', trigger: 'blur' },
    { max: 11, min: 11, message: '请输入11位的电话号码', trigger: 'blur' }
  ]
}
// 定义处理图片上传的逻辑
let file: File | undefined
const imgUp = ref<HTMLInputElement | null>()
const handleImgUpload = () => {
  imgUp.value?.click()
}
const fileUpload = () => {
  file = imgUp.value?.files?.[0]
  const url = file && URL.createObjectURL(file)
  if (url) {
    updatedUserInfo.avatar = url
    // console.log(updatedUserInfo.avatar, userStore.userInfo?.avatar)
  }
}
// 处理修改信息后的校验逻辑
const formRef = ref<FormInstance>()
const confirmChange = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const avatarUrl = await userStore.updateUserInfo({
        username: updatedUserInfo.username,
        name: updatedUserInfo.name,
        signature: updatedUserInfo.signature,
        phone: updatedUserInfo.phone,
        avatar: file!
      })
      userStore.userInfo = { ...updatedUserInfo }
      userStore.userInfo.avatar = avatarUrl
      userStore.concatAvatarUrl()
      centerDialogVisible.value = false
    }
  })
}
// 定义退出登录的逻辑
const exit = () => {
  userStore.clearUserInfo()
  logout()
}
// 定义展示工具栏二级菜单的按钮
// 定义二级菜单，点击消除按钮
const menu = ref<HTMLDivElement>()
const menuShow = ref(false)
const closeMenu = () => {
  setTimeout(() => {
    menuShow.value = false
  })
}
onClickOutside(menu, closeMenu)
</script>

<template>
  <nav class="side-bar">
    <div class="upper">
      <div class="avatar">
        <div class="status">
          <div class="img">
            <el-avatar
              :size="36"
              :src="userStore.userInfo?.avatar"
              @click="centerDialogVisible = true"
            >
              <el-icon :size="24"><i-ep-user-filled /></el-icon
            ></el-avatar>
          </div>
          <div class="icon-status">
            <el-icon :size="10"><i-twemoji-sun /></el-icon>
          </div>
        </div>
      </div>
      <NavItem
        v-for="(item, n) in upperList"
        :key="item"
        :class="{ active: curIndex === n }"
        @click="handleClick(n)"
        :mask-id="n"
        :mask-class="item"
      ></NavItem>
    </div>
    <div class="lower">
      <Tooltem @click="menuShow = !menuShow"><i-mingcute:menu-line /></Tooltem>
      <div class="menu" ref="menu" v-if="menuShow">
        <div class="row" @click="exit">退出</div>
      </div>
    </div>
    <el-dialog v-model="centerDialogVisible" title="编辑资料" width="480px" align-center>
      <div class="container">
        <div class="avatar" @click="handleImgUpload">
          <el-avatar :src="updatedUserInfo.avatar" :size="80"></el-avatar>
          <div class="modal">
            <el-icon :size="28"><i-mdi-camera-plus style="color: white" /></el-icon>
          </div>
          <input
            type="file"
            accept="image/*"
            ref="imgUp"
            style="display: none"
            @change="fileUpload"
          />
        </div>
        <el-form
          :model="updatedUserInfo"
          :rules="rules"
          label-width="72px"
          label-position="left"
          ref="formRef"
        >
          <el-form-item label="用户名">
            <el-input v-model="updatedUserInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              v-model="updatedUserInfo.name"
              maxlength="36"
              type="text"
              show-word-limit
              placeholder="暂无昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="个签">
            <el-input
              v-model="updatedUserInfo.signature"
              maxlength="80"
              type="text"
              placeholder="暂无个性签名"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input
              v-model="updatedUserInfo.phone"
              type="tel"
              placeholder="暂无电话号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="updatedUserInfo.created_at" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmChange">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </nav>
</template>

<style scoped lang="scss">
.side-bar {
  width: 60px;
  height: 100%;
  background-color: #ececec;
  flex-shrink: 0;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  padding-top: 28px;
  .upper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    -webkit-app-region: no-drag;
    .avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .status {
        position: relative;
        cursor: pointer;
        .img {
          font-size: 0;
          clip-path: path('M 21.7 35.5 A 18 18 0 1 1 33.17 27.68 A 7 7 0 1 0 21.7 35.5');
          cursor: pointer;
        }
        .icon-status {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          right: 3px;
          bottom: -1px;
          z-index: 1000;
        }
      }
    }
  }
  .lower {
    -webkit-app-region: no-drag;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .menu {
      -webkit-app-region: no-drag;
      min-width: 80px;
      padding: 4px 0;
      border-radius: 5px;
      background-color: white;
      position: absolute;
      left: 60px;
      bottom: 10px;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      z-index: 1000;
      .row {
        border-radius: 5px;
        text-align: center;
        white-space: nowrap;
        padding: 4px 8px;
        margin: 2px 6px;
        &:hover {
          background-color: rgb(245, 245, 245);
        }
      }
    }
  }
  :deep(.el-overlay-dialog) {
    -webkit-app-region: no-drag;
    user-select: none;
    .el-dialog {
      background-color: rgb(242, 242, 242);
    }
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__body {
      border-top: 1px solid rgb(233, 233, 233);
      padding: 30px 30px;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: skyblue;
        position: relative;
        cursor: pointer;
        .modal {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          left: 0;
          top: 0;
          opacity: 0;
          transition: 0.3s;
          &:hover {
            opacity: 1;
          }
        }
      }
      .input {
        height: 50px;
        margin-top: 16px;
      }
      .el-form {
        width: 100%;
        margin-top: 16px;
      }
    }
  }
}
</style>
