<script setup lang="ts">
import { io } from 'socket.io-client'

const socket = io('localhost:3000', { transports: ['websocket'] })

socket.emit('createSocket', 'cici', (res: any) => {
  console.log('createSocket', res)
})

socket.on('play', (res) => {
  console.log('play', res)
})

const poker = reactive(new JokerPoker())

const nickname = ref('')

function joinGame() {
  if (nickname.value) poker.addPlayer(nickname.value)
}

function startGame() {
  poker.startGame()
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <!-- 桌子 -->
    <div class="desk-wrap pos-relative">
      <div class="publish-wrap pos-absolute left-50% top-50% h-92px w-342px flex translate--50% b b-#000 b-solid">
        <img
          v-for="(card, index) in poker.publishCards" :key="index"
          class="card h-90px w-60px b b-#a6a6a6 rd-6px b-solid drag-none"
          :src="`/poker/${card.suit}-${card.rank}.png`"
        >
      </div>
      <div class="desk h-800px w-800px b b-#000 rd-50% b-solid bg-#AB8E7C">
        <div
          v-for="(player, index) in poker.players" :key="index"
          class="player pos-absolute bottom-20px left-50% flex justify-center"
          :style="{ transform: `translateX(-50%) rotate(${360 / poker.players.length * index}deg)`, transformOrigin: '50% -290px' }"
        >
          <div class="player-state pos-absolute bottom--60px text-20px c-white fw-bold">
            {{ player.name }}
          </div>
          <div class="h-90px w-130px flex">
            <img
              v-for="(card, index) in player.startingHand" :key="index"
              class="card h-90px w-60px b b-#a6a6a6 rd-6px b-solid drag-none"
              :src="`/poker/${card.suit}-${card.rank}.png`"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="panel pos-fixed right-20px top-20px flex flex-col items-center p-30px">
      <label class="mb-30px flex items-center"><div class="flex-shrink-0">昵称：</div><el-input v-model="nickname" placeholder="请输入昵称" /></label>
      <div>
        <el-button class="mb" plain @click="joinGame">
          加入游戏
        </el-button>
      </div>
      <div>
        <el-button plain @click="startGame">
          开始游戏
        </el-button>
      </div>
      <!-- <button v-if="poker.players[0].name === nickname">
        开始游戏
      </button> -->
    </div>
  </div>
</template>

<style>
.card + .card {
  margin-left: 10px;
}
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
