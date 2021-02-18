<template>
  <div>
      <h1>Chat</h1>
      <input type="text" v-model="messageClient">
      <button type="submit" @click.prevent="sendMessage"> Kirim </button>
      <h1>{{serverMessage}}</h1>
      <button @click.prevent="battle">Battle !!!</button>
      <h1>Your Luck : {{diceResult}}</h1>
      <h1 v-if="battleResult">{{battleResult}}</h1>
      <h1 v-if="battleResult">Enemy Luck : {{enemyDice}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messageClient: '',
      battleResult: ''
    }
  },
  sockets: {
    connect () {
      console.log('----------- connected')
    }
    // serverMessage (resp) {
    //   this.serverMessage = resp.message
    //   // console.log(message)
    // },
    // diceRoll (resp) {
    //   this.diceResult = resp
    // },
    // enemyRoll (resp) {
    //   console.log('Enemy is Here <<<<<<<<<<')
    //   this.enemyResult = resp.dice
    //   this.enemyid = resp.id
    // }
  },
  computed: {
    enemy () {
      return this.$store.state.enemy
    },
    serverMessage () {
      return this.$store.state.serverMessage
    },
    diceResult () {
      return this.$store.state.diceResult
    },
    enemyDice () {
      return this.enemy.dice
    }
  },
  methods: {
    sendMessage () {
      console.log('masukk')
      this.$socket.emit('newMessage', { message: this.messageClient })
    },
    battle () {
      this.$socket.emit('battle')
      // this.$socket.emit('newBattle')
    },
    compareResult () {
      if (this.enemy.dice && this.diceResult) {
        if (this.enemy.dice < this.diceResult) {
          this.battleResult = `You Win against ${this.enemy.id}`
        } else if (this.enemy.dice > this.diceResult) {
          this.battleResult = `You lose against ${this.enemy.id}`
        } else {
          this.battleResult = 'ITS A DRAW !!'
        }
      }
    }
  },
  created () {
    console.log('Created goes here <<<<<<<<<<<<<<<<<')
    this.$socket.emit('connected', { name: 'Nama goes here' })
  },
  watch: {
    enemyDice (val) {
      this.compareResult()
    },
    diceResult (val) {
      this.compareResult()
    }
  }
}
</script>

<style>

</style>
