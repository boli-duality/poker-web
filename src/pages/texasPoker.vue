<script setup lang="ts">
import { io } from 'socket.io-client'
import { array2Matrix } from '~/functions'

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
  console.log(nickname.value)
  poker.addPlayer(nickname.value)
  console.log(poker)
}

function startGame() {
  poker.startGame()
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <!-- <div v-for="(suits, index) in array2Matrix(poker.deck, 13)" :key="index" class="pos-relative mb-10px h-130px w-810px flex-shrink-0">
      <img
        v-for="(card, index) in suits" :key="card.rank"
        class="pos-absolute h-130px w-90px flex-shrink-0 flex-shrink-0 select-none b b-#a6a6a6 rd-6px b-solid drag-none"
        :style="{ left: `${index * 60}px` }"
        :src="`/poker/${card.suit}-${card.rank}.png`"
      >
    </div> -->
    <!-- 桌子 -->
    <div class="desk-wrap pos-relative">
      <div class="publish-wrap pos-absolute left-50% top-50% h-92px w-342px translate--50% b b-#000 b-solid">
        <img
          v-for="(card, index) in poker.publishCards" :key="index"
          class="card h-90px w-60px b b-#a6a6a6 rd-6px b-solid drag-none"
          :src="`/poker/${card.suit}-${card.rank}.png`"
        >
      </div>
      <div class="desk h-800px w-800px b b-#000 rd-50% b-solid bgc-#AB8E7C">
        <div
          v-for="(player, index) in poker.players" :key="index"
          class="player pos-absolute bottom-20px left-50% flex justify-center"
          :style="{ transform: `translateX(-50%) rotate(${360 / poker.players.length * index}deg)`, transformOrigin: '50% -290px' }"
        >
          <div class="player-state pos-absolute bottom--60px text-20px fw-bold c-white">
            {{ player.name }}
          </div>
          <!-- <img
          v-for="(card, index) in suits" :key="card.rank"
          class="pos-absolute h-130px w-90px flex-shrink-0 flex-shrink-0 select-none b b-#a6a6a6 rd-6px b-solid drag-none"
          :style="{ left: `${index * 60}px` }"
          :src="`/poker/${card.suit}-${card.rank}.png`"
        > -->
          <div class="h-90px w-130px">
            <img
              v-for="(card, index) in player.startingHand" :key="index"
              class="card h-90px w-60px b b-#a6a6a6 rd-6px b-solid drag-none"
              :src="`/poker/${card.suit}-${card.rank}.png`"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="pos-fixed right-20px top-20px flex flex-col items-center rd-20px p-30px bgc-white">
      <label class="mb-30px">昵称：<input v-model="nickname"></label>
      <button class="mb-30px" @click="joinGame">
        加入游戏
      </button>
      <button @click="startGame">
        开始游戏
      </button>
      <!-- <button v-if="poker.players[0].name === nickname">
        开始游戏
      </button> -->
    </div>
  </div>
</template>

<style>
.card:not(:last-child){
  margin-right: 10px;
}
</style>

<route lang="yaml">
meta:
  layout: layout
</route>
