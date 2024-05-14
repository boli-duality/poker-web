<script setup lang="ts">
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const socket = useSocket()

const rooms = ref<any[]>([])

socket.emit('connectTexasHall', (res: any) => {
  ElMessage.success(res.msg)
  rooms.value = Object.values(res.data)
})
socket.on('updateTexasRoom', (res) => {
  if (res.err)
    return
  console.log(...logLabel('updateTexasRoom'), res)
  console.log(...logLabel(' rooms.value'), rooms.value)
  rooms.value.push(res.data)
})

const roomName = ref('')
function createRoom() {
  socket.emit('createTexasRoom', { name: roomName.value, owner: userStore.user })
}
</script>

<template>
  <div class="panel pos-fixed right-20px top-20px flex flex-col items-center p-30px">
    <label class="mb-30px flex items-center"><div class="flex-shrink-0">昵称：</div><el-input v-model="roomName" placeholder="请输入房间名" /></label>
    <div>
      <el-button class="mb" plain @click="createRoom">
        创建房间
      </el-button>
    </div>
    <!-- <button v-if="poker.players[0].name === nickname">
        开始游戏
      </button> -->
  </div>
  <div v-if="rooms.length" class="flex flex-wrap px py">
    <div
      v-for="(item, index) in rooms" :key="index"
      class="room mb mr h-200px w-200px cursor-pointer b b-#fff rd px py"
      @click="router.push({ path: `/texas/room/${item.id}` })"
    >
      <div class="text-26px fw-bold">
        {{ item.name }}
      </div>
    </div>
  </div>
  <div v-else class="h-100vh flex flex-wrap items-center justify-center text-30px fw-bold">
    暂无房间
  </div>
</template>

<style scoped>
.panel {
  background: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
}
</style>

<route lang="yaml">
meta:
  layout: layout
</route>
