import Vue from 'vue'
import Vuex from 'vuex'
// import uuid from 'uuid/v4'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profiles: {
      name: '',
      sex: '',
      date: '',
      intro: '',
      tags: []
    }
  },
  getters: {
    profiles: state => state.plofiles
  },
  mutations: {
    addData (state, data) {
      state.profiles.name = data.name
      state.profiles.sex = data.sex
      state.profiles.date = data.date
      state.profiles.intro = data.intro
      state.profiles.tags = data.tags
    }
  }
})
