import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    signedIn: '',
    userRole: '',
    dashboardLinks: '',
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
    setDashboardLinks(state, role) {
      switch (role) {
        case 'consumer':
          state.dashboardLinks = [
            { url: "/meal-planner", icon: "mdi-hamburger", text: "Meal planner" },
            { url: "/available-foods", icon: "mdi-pizza", text: "Available foods" },
            {
              url: "/nearest-eateries",
              icon: "mdi-table-chair",
              text: "Nearest eateries",
            },
          ]
          break;
        case 'eatery':
          state.dashboardLinks = [
            { url: "/menu", icon: "mdi-home", text: "Menu" },
            { url: "/food-request", icon: "mdi-pizza", text: "Food request" },
          ]
          break;
        case 'admin':
          state.dashboardLinks = [
            { url: "/summary", icon: "mdi-home", text: "Summary" },
            { url: "/users", icon: "mdi-account", text: "Users" },
            { url: "/foods", icon: "mdi-pizza", text: "Foods" },
          ]
          break;
        default:
          state.dashboardLinks = []
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
