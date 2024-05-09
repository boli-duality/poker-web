import { io } from 'socket.io-client'

const ws = io('http://61.164.243.106:34055/', { transports: ['websocket'] })

const state = reactive({ chat: {} as ObjectT<UseSocket.ChatData[]> })

export function useSocket() {
  const socket = {
    connectChat(data: { room: 'world' }, cb?: CB) {
      const userStore = useUserStore()

      ws.emit('connectChat', data, (res: UseSocket.ChatData[]) => {
        res.forEach(e => e.isMe = e.from.id === userStore.id)
        state.chat[data.room] = res
        cb?.(res)

        ws.on(`chat-${data.room}`, (res: UseSocket.ChatData) => {
          res.isMe = res.from.id === userStore.id
          state.chat[data.room].push(res)
          cb?.(res)
        })
      })
    },
    chat(data: UseSocket.ChatParams, cb?: CB) {
      const userStore = useUserStore()

      const params: UseSocket.ChatData = {
        ...data,
        timestamp: Date.now(),
        from: {
          id: userStore.id,
          nickname: userStore.nickname,
        },
      }
      if (!userStore.id) params.from.nickname = '匿名'
      ws.emit('chat', params, cb)
    },
    removeAllListeners() {
      ws.removeAllListeners()
    },
  }
  return { state, socket }
}
