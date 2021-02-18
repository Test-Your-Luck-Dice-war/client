import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messageClient: '',
    serverMessage: '',
    diceResult: '',
    battleResult: '',
    enemy: {}
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
    }
  },
  actions: {
    SOCKET_serverMessage (context, resp) {
      context.commit('serverMessage', resp.message)
    },
    SOCKET_diceRoll (context, resp) {
      context.commit('setDiceResult', resp)
    },
    SOCKET_enemyRoll (context, resp) {
      context.commit('setEnemyRoll', resp)
    }
  },
  modules: {
  }
})
