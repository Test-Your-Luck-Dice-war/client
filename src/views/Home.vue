<template>
  <div class="home">
    <div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 flex flex-col">
      <div v-if="!inGame">
        <h1 class="text-center text-white"> TEST YOUR LUCK</h1>
        <img src="../assets/dice.gif" alt="">
        <div class="w-full md:w-full py-10 px-5 md:px-10 text-center">
          <div>
            <div class="flex -mx-3">
              <div class="w-full px-3">
                <button type="submit" @click.prevent="joinGame" class="block w-full max-w-xs mx-auto bg-green-600 text-white rounded-lg px-3 py-3 font-semibold">JOIN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from 'sweetalert2'
export default {
  name: 'Home',
  sockets: {
    connect () {
      console.log('----------- connected')
    }
  },
  computed: {
    inGame () {
      return this.$store.state.inGame
    }
  },
  methods: {
    joinGame () {
      if (!localStorage.username) {
        Swal.fire({
          title: 'Enter your glorious name',
          input: 'text',
          inputLabel: 'Username',
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            } else {
              // localStorage.setItem('user', { id: +(new Date()), name: value })
              this.$socket.emit('joinGame', { id: +(new Date()), name: value })
              this.$router.push({ name: 'BattleRoom', params: { name: value } })
            }
          }
        })
      } else {
        this.$router.push({ name: 'BattleRoom', params: { name: localStorage.username } })
      }
    }
  },
  created () {
    if (this.$store.state.enemyLeft) {
      this.$socket.emit('disconnected')
      this.$store.dispatch('setEnemyLeft', false)
    }
  }
}
</script>
