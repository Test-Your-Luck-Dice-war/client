<template>
  <div>
      <h1>Chat</h1>
      <input type="text" v-model="messageClient">
      <button type="submit" @click.prevent="sendMessage"> Kirim </button>
      <h1>{{serverMessage}}</h1>
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
  computed: {
    serverMessage () {
      return this.$store.state.serverMessage
    }
  },
  methods: {
    sendMessage () {
      console.log('masukk')
      this.$socket.emit('newMessage', { message: this.messageClient })
    }
  }
}
</script>

<style>

</style>
