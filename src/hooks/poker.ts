import { shuffle } from 'lodash-es'

interface Poker {
  rank: string
  suit: string
}

export class JokerPoker {
  deck = [] as Poker[]
  players = [] as {
    name: string
    startingHand: any[]
  }[]

  publishCards = [] as Poker[]

  createDeck() {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs']
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

    const deck = [] as Poker[]
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

  addPlayer(name: string) {
    const player = {
      name,
      startingHand: [],
    }
    this.players.push(player)
  }

  dealCards() {
    this.players.forEach(player => player.startingHand.push(this.deck.shift()))
    this.players.forEach(player => player.startingHand.push(this.deck.shift()))
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
