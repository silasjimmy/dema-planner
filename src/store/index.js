import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    authenticated: false,
    userRole: ''
  },
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email
    },
    setUserRole(state, role) {
      state.userRole = role
    },
    setAuthentication(state, status) {
      state.authenticated = status
    },
  },
  actions: {
  },
  modules: {
  }
})
