<script setup lang="ts">
import { useJokerPoker } from '~/hooks/usePoker'

const { params } = useRoute('/texas/room/[id]')
const userStore = useUserStore()

const poker = useJokerPoker(params.id, userStore.user)
</script>

<template>
  <div v-if="poker" class="flex flex-1 flex-col items-center justify-center">
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
            {{ player.nickname }}
          </div>
          <div class="h-90px w-130px flex">
            <img
              v-for="(card, cardIdx) in player.startingHand" :key="cardIdx"
              class="card h-90px w-60px b b-#a6a6a6 rd-6px b-solid drag-none"
              :src="`/poker/${card.suit}-${card.rank}.png`"
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="userStore.user.id == poker.owner.id" class="panel pos-fixed right-20px top-20px flex flex-col items-center p-30px">
      <el-button type="primary">
        开始游戏
      </el-button>
    </div>
    <div class="panel users pos-fixed bottom-20px left-20px top-20px w-300px overflow-auto p-10px">
      <el-button class="mb" type="primary" plain>
        房间名：{{ poker.name }}
      </el-button>
      <div v-for="(user, index) in poker.users" :key="index" class="panel user mb20px h150px flex justify-between p10px">
        <div>{{ user.nickname }}</div>
        <el-button v-if="user.id == poker.owner.id" type="warning" size="small" plain>
          房主
        </el-button>
      </div>
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
