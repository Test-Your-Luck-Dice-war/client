<template>
  <div style="background: blue; height: 65vh;">
    <div style="display: flex; margin-top: 40px; justify-content: center;">
      <button @click.prevent="battle" style="margin: 0 40px">Battle !!!</button>
      <button @click.prevent="logout" style="margin: 0 40px">Logout</button>
    </div>
    <h1>{{username}} VS {{enemyName}}</h1>
    <h2>Your Luck : {{diceResult}}</h2>
    <h2 v-if="battleResult">{{battleResult}}</h2>
    <h2 v-if="battleResult">Enemy Luck : {{enemyDice}}</h2>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      battleResult: ''
    }
  },
  computed: {
    enemy () {
      return this.$store.state.enemy
    },
    diceResult () {
      return this.$store.state.diceResult
    },
    enemyDice () {
      return this.enemy.dice
    },
    username () {
      return this.$route.params.name
    },
    enemyName () {
      return this.$store.state.enemyName
    }
  },
  methods: {
    logout () {
      this.$socket.emit('disconnected')
      this.$store.dispatch('resetGame')
      this.$router.push('/')
    },
    battle () {
      // console.log(this.$route)
      this.$socket.emit('battle')
      // this.$socket.emit('newBattle')
    },
    compareResult () {
      if (this.enemy.dice && this.diceResult) {
        if (this.enemy.dice < this.diceResult) {
          Swal.fire(`You win against ${this.enemyName} `)
            .then(() => {
              this.logout()
            })
        } else if (this.enemy.dice > this.diceResult) {
          Swal.fire(`You lose against ${this.enemyName}`)
            .then(() => {
              this.logout()
            })
        } else {
          Swal.fire('ITS A DRAW !!')
            .then(() => {
              this.logout()
            })
        }
      }
    }
  },
  watch: {
    enemyDice (val) {
      this.compareResult()
    },
    diceResult (val) {
      this.compareResult()
    }
  },
  created () {
    console.log(this.$route.params)
    this.$store.dispatch('setInGame', true)
  }
}
</script>

<style>

</style>
