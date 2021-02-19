<template>
  <div class="w-full bg-gray-900 flex h-screen">
    <div class="flex flex-col w-96">
      <div class="bg-gray-300 px-4 pt-5 h-full ">
          <div v-if="username" class="border rounded shadow-sm bg-white mb-4">
            <div class="p-3 flex">
                <div class="pr-4">
                  <img src="https://avatars.dicebear.com/api/avataaars/2323.svg" alt="" class="rounded-full h-20 w-20 flex items-center justify-center bg-gray-900">
                </div>
                <div class="pt-2">
                  {{username}}
                </div>
            </div>
          </div>
          <div v-if="enemyName" class="border rounded shadow-sm bg-white mb-4">
            <div class="p-3 flex">
                <div class="pr-4">
                  <img src="https://avatars.dicebear.com/api/avataaars/te2387.svg" alt="" class="rounded-full h-20 w-20 flex items-center justify-center bg-gray-900">
                </div>
                <div class="pt-2">
                  {{enemyName}}
                </div>
            </div>
          </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <div class="bg-gray-900 h-full items-center">
        <div class="px-8 py-4 pt-4">
          <div class="border rounded shadow-sm bg-white border-gray-100">
              <div class="p-3 flex flex-row pt-14 pb-14">
                <button type="submit" @click.prevent="battle" class="block w-full max-w-xs mx-auto bg-green-600 text-white rounded-lg px-3 py-3 font-semibold">Batlle</button>
                <button type="submit" @click.prevent="logout" class="block w-full max-w-xs mx-auto bg-green-600 text-white rounded-lg px-3 py-3 font-semibold">Logout</button>
              </div>
              <div class="p-3 text-center">
              <div class="flex justify-center text-7xl">
                <p class="px-5">{{username}}</p>
                <p class="px-20">VS</p>
                <p class="px-5">{{enemyName}}</p>
              </div>
              <div class="flex justify-center text-7xl pt-20 pb-20">
                <p class="px-5" v-if="battleResult">{{battleResult}}</p>
                <p class="px-5" v-if="battleResult">Enemy Luck : {{enemyDice}}</p>
                <p class="px-5">Your luck : {{diceResult}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
