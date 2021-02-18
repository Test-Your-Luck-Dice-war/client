<template>
  <div>
      <h1>Chat</h1>
      <input type="text" v-model="messageClient">
      <button type="submit" @click.prevent="sendMessage"> Kirim </button>
      <h1>{{serverMessage}}</h1>
      <button @click.prevent="battle">Battle !!!</button>
      <h1>Your Luck : {{diceResult}}</h1>
      <h1 v-if="battleResult">{{battleResult}}</h1>
      <h1 v-if="battleResult">Enemy Luck : {{enemyResult}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messageClient: '',
      serverMessage: '',
      diceResult: '',
      enemyResult: '',
      battleResult: '',
      enemyid: ''
    }
  },
  sockets: {
    connect () {
      console.log('----------- connected')
    },
    serverMessage (resp) {
      this.serverMessage = resp.message
      // console.log(message)
    },
    diceRoll (resp) {
      this.diceResult = resp
    },
    enemyRoll (resp) {
      console.log('Enemy is Here <<<<<<<<<<')
      this.enemyResult = resp.dice
      this.enemyid = resp.id
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
      if (this.enemyResult && this.diceResult) {
        if (this.enemyResult < this.diceResult) {
          this.battleResult = `You Win against ${this.enemyid}`
        } else if (this.enemyResult > this.diceResult) {
          this.battleResult = `You lose against ${this.enemyid}`
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
    enemyResult (val) {
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
