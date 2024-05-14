import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_WS_API, { transports: ['websocket'] })

export function useSocket() {
  return socket
}

const state = reactive({ chat: {} as ObjectT<UseSocket.ChatData[]> })
export function useChatSocket() {
  const userStore = useUserStore()
  const app = {
    connectChat(data: { room: 'world' }, cb?: CB) {
      socket.emit('connectChat', data, (res: UseSocket.ChatData[]) => {
        const { id } = userStore.user
        res.forEach(e => e.isMe = e.from.id === id)
        state.chat[data.room] = res
        cb?.(res)
      })
      socket.on('receive', (res: UseSocket.ChatData) => {
        res.isMe = res.from.id == userStore.user.id
        state.chat[data.room].push(res)
        cb?.(res)
      })
    },
    chat(data: UseSocket.ChatParams, cb?: CB) {
      const params: UseSocket.ChatData = {
        ...data,
        timestamp: Date.now(),
        from: userStore.user,
      }
      socket.emit('chat', params, cb)
    },
    removeAllListeners() {
      socket.removeAllListeners()
    },
  }
  return { state, socket: app }
}
