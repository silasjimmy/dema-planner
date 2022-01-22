import Vue from 'vue'
import Vuex from 'vuex'
import SET_USER_EMAIL from './mutation-types'
import SET_USER_ROLE from './mutation-types'
import SET_AUTHENTICATION from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    authenticated: false,
    userRole: ''
  },
  mutations: {
    [SET_USER_EMAIL](state, email) {
      state.userEmail = email
    },
    [SET_USER_ROLE](state, role) {
      state.userRole = role
    },
    [SET_AUTHENTICATION](state, status) {
      state.authenticated = status
    },
  },
  actions: {
  },
  modules: {
  }
})
