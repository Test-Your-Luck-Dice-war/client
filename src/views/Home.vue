<template>
  <div class="home">
    <Chat/>
    <button @click.prevent="joinGame">Join Game</button>
    <router-view/>
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
