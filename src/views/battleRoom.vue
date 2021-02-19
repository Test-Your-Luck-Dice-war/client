<template>
  <div style="">
    <div style="display: flex; margin-top: 40px; justify-content: center;">
      <button @click.prevent="battle" style="margin: 0 40px" class="border border-10 border-bg-red-500">Battle !!!</button>
      <button @click.prevent="logout" style="margin: 0 40px">Logout</button>
    </div>
    <h1>{{username}} VS {{enemyName}}</h1>
    <h2>Your Luck : {{diceResult}}</h2>
    <h2 v-if="battleResult">{{battleResult}}</h2>
    <h2 v-if="battleResult">Enemy Luck : {{enemyDice}}</h2>
    <!-- <button class="btn btn-primary btn-sm" @click.prevent=""><span class="fa fa-play-circle-o"></span></button> -->
    <!-- <audio controls autoplay class="hidden">
          <source src="../assets/movie_1.mp3" type="audio/ogg">
        </audio> -->
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
    },
    enemyLeft () {
      return this.$store.state.enemyLeft
    }
  },
  methods: {
    logout () {
      this.$socket.emit('disconnected')
      this.$store.dispatch('resetGame')
      this.$router.push('/')
    },
    battle () {
      this.playSound('https://www.myinstants.com/media/sounds/shake-and-roll-dice-soundbible.mp3')
      // console.log(this.$route)
      this.$socket.emit('battle')
      // this.$socket.emit('newBattle')
    },
    compareResult () {
      if (this.enemy.dice && this.diceResult && this.enemyName) {
        this.$store.dispatch('setMatchStatus', false)
        if (this.enemy.dice < this.diceResult) {
          this.playSound('https://www.myinstants.com/media/sounds/youre-a-winner.mp3')
          Swal.fire(`You win against ${this.enemyName} `)
            .then(() => {
              this.logout()
            })
        } else if (this.enemy.dice > this.diceResult) {
          this.playSound('https://www.myinstants.com/media/sounds/metal-gear-solid-snake-death-scream-sound-effect_fR1Ryqk.mp3')
          Swal.fire(`You lose against ${this.enemyName}`)
            .then(() => {
              this.logout()
            })
        } else {
          Swal.fire('ITS A DRAW !!')
          this.playSound('https://www.myinstants.com/media/sounds/ha-gay.mp3')
            .then(() => {
              this.logout()
            })
        }
      }
    },
    playSound (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    }
  },
  watch: {
    enemyDice (val) {
      this.compareResult()
    },
    diceResult (val) {
      this.compareResult()
    },
    enemyLeft (val) {
      if (val) {
        this.$socket.emit('disconnected')
      }
    }
  },
  created () {
    if (!this.username) {
      this.$router.push('/')
    } else {
      console.log(this.$route.params)
      this.$store.dispatch('setInGame', true)
      this.$store.dispatch('setMatchStatus', true)
    }
  }
}
</script>

<style>

</style>
