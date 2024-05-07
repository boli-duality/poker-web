namespace UseSocket {
  interface ChatParams {
    room: 'world'
    text: string

  }

  interface ChatData extends ChatParams {
    timestamp: number
    from: {
      id: string
      nickname: string
    }
    isMe?: boolean
  }
}
