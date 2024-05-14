<script setup lang="ts">
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const { state, socket } = useChatSocket()

const form = reactive({
  nickname: '',
  password: '',
})
function resetForm() {
  loginPopShow.value = false
  registerPopShow.value = false
  Object.assign(form, { nickname: '', password: '' })
}
const registerPopShow = ref(false)
const loginPopShow = ref(false)

function openRegisterPop() {
  loginPopShow.value = false
  registerPopShow.value = true
}
async function register() {
  if (!form.nickname)
    return ElMessage.warning('请输入用户名')
  if (!form.password)
    return ElMessage.warning('请输入密码')
  const [err] = await useAwait(userStore.register(form))
  if (err)
    return
  resetForm()
}

function openLoginPop() {
  registerPopShow.value = false
  loginPopShow.value = true
}
async function login() {
  if (!form.nickname)
    return ElMessage.warning('请输入用户名')
  if (!form.password)
    return ElMessage.warning('请输入密码')
  const [err] = await useAwait(userStore.login(form))
  if (err)
    return
  const { id } = userStore.user
  state.chat.world.forEach(e => e.isMe = e.from.id == id)
  resetForm()
}

const logoutPopShow = ref(false)
function logout() {
  userStore.logout()
  logoutPopShow.value = false
}

const chatListRef = ref()
socket.connectChat({ room: 'world' }, () => {
  nextTick(() => {
    if (!chatListRef.value || !isAutoScroll.value)
      return
    chatListRef.value.scrollTop = chatListRef.value.scrollHeight
  })
})
onUnmounted(() => socket.removeAllListeners())

const isAutoScroll = ref(true)
function scrollChat(e: any) {
  const isBottom = e.target.scrollTop + e.target.clientHeight == e.target.scrollHeight
  if (isBottom)
    isAutoScroll.value = true
  else isAutoScroll.value = false
}

const message = ref('')
function sendMessage() {
  if (!userStore.user.id)
    return ElMessage.warning('请先登录')
  isAutoScroll.value = true
  socket.chat({
    room: 'world',
    text: message.value,
  }, () => message.value = '')
}

const list = reactive([
  { name: '聊天室', url: '/chat', bg: 'background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);' },
  { name: '德州扑克', url: '/texas/hall', bg: 'background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);' },
])
</script>

<template>
  <div class="flex">
    <div
      v-for="(item, index) in list" :key="index"
      class="item h-100px w-100px flex items-center justify-center rd-6px c-#fff"
      :style="item.bg"
      @click="router.push(item.url)"
    >
      {{ item.name }}
    </div>
  </div>
  <!-- user盒子 -->
  <div class="pos-fixed right-30px top-30px min-w-60px flex flex-col items-center">
    <div class="mb flex items-center">
      <template v-if="!userStore.user.id">
        <el-popover
          placement="bottom"
          title="注册"
          :width="200"
          :visible="registerPopShow"
        >
          <div class="flex flex-col items-end">
            <label>用户名：<el-input v-model="form.nickname" class="mb" placeholder="请输入用户名" clearable /></label>
            <label>密码：<el-input v-model="form.password" class="mb" placeholder="随便填" clearable /></label>
            <div>
              <el-button plain @click="resetForm">
                取消
              </el-button>
              <el-button
                type="primary" plain
                @click="register"
              >
                注册
              </el-button>
            </div>
          </div>
          <template #reference>
            <el-button plain @click="openRegisterPop">
              注册
            </el-button>
          </template>
        </el-popover>
        <el-popover
          placement="bottom"
          title="登录"
          :width="200"
          :visible="loginPopShow"
        >
          <div class="flex flex-col items-end">
            <label>用户名：<el-input v-model="form.nickname" class="mb" placeholder="请输入用户名" clearable /></label>
            <label>密码：<el-input v-model="form.password" class="mb" placeholder="随便填" clearable /></label>
            <div>
              <el-button plain @click="resetForm">
                取消
              </el-button>
              <el-button
                type="primary" plain
                @click="login"
              >
                登录
              </el-button>
            </div>
          </div>
          <template #reference>
            <el-button type="primary" plain @click="openLoginPop">
              登录
            </el-button>
          </template>
        </el-popover>
      </template>
      <el-avatar class="ml" size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
    </div>

    <el-popover
      v-if="userStore.user.id"
      placement="bottom"
      title="退出登录"
      :width="200"
      :visible="logoutPopShow"
    >
      <div class="flex flex-col items-end">
        <div>
          <el-button type="danger" plain @click="logoutPopShow = false">
            取消
          </el-button>
          <el-button
            type="primary" plain
            @click="logout"
          >
            退出登录
          </el-button>
        </div>
      </div>
      <template #reference>
        <el-button
          class="pos-absolute bottom--20px right--15px"
          plain text
          @click="logoutPopShow = true"
        >
          <span class="max-w-250px min-w-60px of-hidden text-ellipsis text-center text-20px fw-bold">
            {{ userStore.user.nickname }}
          </span>
        </el-button>
      </template>
    </el-popover>
  </div>
  <!-- 世界频道 -->
  <div class="chat-wrap pos-fixed bottom-30px left-30px">
    <div class="chat-box">
      <div
        class="chat-header flex cursor-pointer select-none items-center justify-between b b-#4C4D4F rd-4px px-4 py-1"
      >
        <div>世界</div>
        <el-icon><i-ep-arrow-down /> </el-icon>
      </div>
      <ul ref="chatListRef" class="chat-list h-400px w-375px of-y-auto b b-#4C4D4F rd-4px px text-14px" @scrollend="scrollChat">
        <li
          v-for="(item, index) in state.chat.world"
          :key="index"
          class="my-10px flex"
          :style="{
            justifyContent: item.isMe ? 'flex-end' : 'flex-start',
          }"
        >
          <div v-if="item.isMe" class="max-w-250px rd-6px bg-#3DB578 p-8px">
            {{ item.text }}
          </div>
          <div v-else>
            <div class="text-12px">
              {{ item.from.nickname || '匿名' }}
            </div>
            <div class="max-w-250px rd-6px bg-#2C2C2C p-8px">
              {{ item.text }}
            </div>
          </div>
        </li>
      </ul>
      <div class="chat-input">
        <el-input v-model="message" class="w-375px" placeholder="随便说说" clearable @keydown.enter="sendMessage">
          <template #append>
            <el-button @click="sendMessage">
              发送
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  transition: all 0.5s;
  & + .item {
    margin-left: 20px;
  }
}
.item:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
}
</style>

<route lang="yaml">
meta:
  layout: center
</route>
