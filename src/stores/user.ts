import { defineStore } from 'pinia'
import { uuidV4 } from '~/libs/functions'

export const useUserStore = defineStore('user', () => {
  const id = ref(uuidV4())

  const nickname = ref('')

  function login(name: string) {
    nickname.value = name
  }

  function logout() {
    nickname.value = ''
    id.value = ''
  }

  return { nickname, id, login, logout }
}, { persist: true })
