<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()
const { state, socket } = useSocket()

const nickname = ref('')
const loginPopShow = ref(false)

function login() {
  if (!nickname.value) {
    return ElMessage({
      message: '请输入昵称',
      type: 'warning',
    })
  }
  userStore.login(nickname.value)
  loginPopShow.value = false
  nickname.value = ''
}
function editNickname() {
  loginPopShow.value = true
  nickname.value = userStore.nickname
}

const chatListRef = ref()
socket.connectChat({ room: 'world' }, () => {
  nextTick(() => {
    if (!chatListRef.value || !isAutoScroll.value) return
    chatListRef.value.scrollTop = chatListRef.value.scrollHeight
  })
})
onUnmounted(() => socket.removeAllListeners())

const isAutoScroll = ref(true)
function scrollChat(e: any) {
  const isBottom = e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight
  if (isBottom) {
    isAutoScroll.value = true
  }
  else isAutoScroll.value = false
}

const message = ref('')
function sendMessage() {
  isAutoScroll.value = true
  socket.chat({
    room: 'world',
    text: message.value,
  }, () => {
    message.value = ''
  })
}

const list = reactive([
  { name: '聊天室', url: '/chat', bg: 'background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);' },
  { name: '德州扑克', url: '/texas', bg: 'background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);' },
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
    <el-avatar class="mb" size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />

    <el-popover
      placement="bottom"
      :title="userStore.nickname ? '修改昵称' : '昵称'"
      :width="200"
      :visible="loginPopShow"
    >
      <div class="flex flex-col items-end">
        <el-input v-model="nickname" class="mb" placeholder="请输入昵称" clearable />
        <div>
          <el-button type="danger" plain @click="loginPopShow = false">
            取消
          </el-button>
          <el-button
            type="primary" plain
            @click="login"
          >
            确定
          </el-button>
        </div>
      </div>
      <template #reference>
        <el-button
          v-if="userStore.nickname"
          class="pos-absolute bottom--20px right--15px"
          plain text
          @click="editNickname"
        >
          <span class="max-w-250px min-w-60px of-hidden text-ellipsis text-center text-20px fw-bold">
            {{ userStore.nickname }}
          </span>
        </el-button>
        <el-button v-else type="primary" plain @click="loginPopShow = true">
          登录
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
          <div v-else class="max-w-250px rd-6px bg-#2C2C2C p-8px">
            {{ item.text }}
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
