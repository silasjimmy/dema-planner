import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    signedIn: '',
    userRole: ''
  },
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email
    },
    setUserRole(state, role) {
      state.userRole = role
    },
    setSignedIn(state, status) {
      state.signedIn = status
    },
  },
  actions: {
  },
  modules: {
  }
})
