import { ElMessage } from 'element-plus'
import { shuffle } from 'lodash-es'

const socket = useSocket()

export class Player implements UsePoker.Player {
  id: string
  nickname: string
  startingHand: UsePoker.Poker[] = []
  score = 0
  constructor(user: UsePoker.User) {
    this.id = user.id
    this.nickname = user.nickname
  }
}

export class JokerPoker implements UsePoker.Room {
  id: string
  name: string
  owner: UsePoker.User
  users: UsePoker.User[]
  deck: UsePoker.Poker[] = []
  players: UsePoker.Player[]
  publishCards: UsePoker.Poker[] = []

  constructor(opts: UsePoker.Room) {
    this.id = opts.id
    this.name = opts.name
    this.owner = opts.owner
    this.users = opts.users
    this.players = opts.players
  }

  createDeck() {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs']
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

    const deck = [] as UsePoker.Poker[]
    for (const suit of suits) {
      for (const rank of ranks)
        deck.push({ rank, suit })
    }

    this.deck = deck
  }

  shuffle() {
    this.deck = shuffle(this.deck)
    this.deck = shuffle(this.deck)
    this.deck = shuffle(this.deck)
  }

  addPlayer(user: UsePoker.User) {
    this.players.push(new Player(user))
  }

  dealCards() {
    this.players.forEach(player => player.startingHand.push(this.deck.shift()!))
    this.players.forEach(player => player.startingHand.push(this.deck.shift()!))
  }

  publish(count: number) {
    this.publishCards.push (...this.deck.slice(0, count))
  }

  startGame() {
    this.createDeck()
    this.shuffle()
    this.dealCards()
    this.publish(3)
  }
}

export function useJokerPoker(id: ID, user: UsePoker.User) {
  const poker = ref<JokerPoker>()

  socket.emit('connectTexasRoom', {
    id,
    user,
  }, (res: any) => {
    if (res.err)
      return ElMessage.error(res.msg)
    poker.value = new JokerPoker(res.data)
  })

  return poker
}
