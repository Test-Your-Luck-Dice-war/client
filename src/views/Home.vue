<template>
  <div class="home">
    <Chat/>
    <div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 flex flex-col">
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
      <audio controls class="hidden">
  <source src="../assets/movie_1.mp3" type="audio/ogg">
</audio>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from 'sweetalert2'
import Chat from '@/components/Chat'
export default {
  name: 'Home',
  sockets: {
    connect () {
      console.log('----------- connected')
    }
  },
  components: {
    Chat
  },
  methods: {
    joinGame () {
      Swal.fire({
        title: 'Enter your glorious name',
        input: 'text',
        inputLabel: 'Username',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else {
            this.$router.push('/battle')
            this.$socket.emit('joinGame', { name: value })
            this.$router.push({ name: 'BattleRoom', params: { name: value } })
          }
        }
      })
    }
  },
  created () {
    // this.$socket.emit('disconnected')
  }
}
</script>
