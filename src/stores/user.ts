import { defineStore } from 'pinia'
import { apiUserLogin, apiUserRegister } from '~/apis/user'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    nickname: '',
  })
  function resetUser() {
    user.value = { id: '', nickname: '' }
  }

  async function register(params: API.User.RegisterParams) {
    const [err, res] = await useAwait(apiUserRegister(params))
    if (err)
      throw err
    user.value = res
  }

  async function login(params: API.User.LoginParams) {
    const [err, res] = await useAwait(apiUserLogin(params))
    if (err)
      throw err
    user.value = res
  }

  function logout() {
    resetUser()
  }

  return { user, register, login, logout }
}, { persist: true })
