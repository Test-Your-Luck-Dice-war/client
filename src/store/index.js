import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    messageClient: '',
    serverMessage: '',
    diceResult: '',
    enemy: {},
    enemyName: '',
    inGame: false
  },
  mutations: {
    serverMessage (state, payload) {
      state.serverMessage = payload
    },
    setDiceResult (state, payload) {
      state.diceResult = payload
    },
    setEnemyRoll (state, payload) {
      state.enemy = payload
    },
    setEnemyName (state, payload) {
      state.enemyName = payload
    },
    resetGame (state, payload) {
      state.enemy = {}
      state.enemyName = ''
      state.diceResult = ''
    },
    setInGame (state, payload) {
      state.inGame = payload
    }
  },
  actions: {
    SOCKET_serverMessage (context, resp) {
      context.commit('serverMessage', resp.message)
    },
    SOCKET_diceRoll (context, resp) {
      console.log('User Roll : ', resp.dice)
      context.commit('setDiceResult', resp)
    },
    SOCKET_enemyRoll (context, resp) {
      console.log('Enemy Roll : ', resp.dice)
      context.commit('setEnemyRoll', resp)
    },
    SOCKET_isRoomFull (context, resp) {
      router.push('/full')
    },
    SOCKET_joinsBattle (context, resp) {
      context.commit('setEnemyName', resp.name)
    },
    SOCKET_enemyLeft (context) {
      if (context.state.inGame && context.state.enemyName) {
        Swal.fire('You Win !!')
          .then(() => {
            context.dispatch('setInGame', false)
            context.dispatch('resetGame')
            router.push('/')
              .catch(() => {})
          })
      }
    },
    resetGame (context) {
      context.commit('resetGame')
    },
    setInGame (context, payload) {
      context.commit('setInGame', payload)
    }
  },
  modules: {
  }
})
