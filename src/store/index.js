import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: null
  },
  getters: {
    status: state => state.status
  },
  mutations: {
    changeAuth (state, data) {
      state.status = data
    }
  }
})
