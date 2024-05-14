declare namespace UsePoker {
  interface User {
    id: string
    nickname: string
  }

  interface Room {
    id: string
    name: string
    owner: {
      id: string
      nickname: string
    }
    users: User[]
    players: Player[]

    deck: UsePoker.Poker[]
    publishCards: UsePoker.Poker[]
  }

  interface Poker {
    rank: string
    suit: string
  }

  interface Player extends User {
    startingHand: Poker[]
    score: number
  }
}
