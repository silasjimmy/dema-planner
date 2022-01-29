import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    signedIn: '',
    userRole: '',
    dashboardLinks: '',
    meals: null,
    availableFoods: null,
    likedFoods: null,
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
    setMeals(state, meals) {
      state.meals = meals
    },
    setAvailableFoods(state, foods) {
      state.availableFoods = foods
    },
    setLikedFoods(state, foods) {
      state.likedFoods = foods
    },
  },
  actions: {
    getMealsAction({ commit }) {
      // Get the meals from the database
      const meals = [
        {
          name: "breakfast",
          id: 1,
          time: "07:00am",
          ate: false,
          revealServings: false,
          servingsDialog: false,
          foods: [
            { name: "chapati", cost: 10, serving: 1 },
            { name: "cabbage", cost: 20, serving: 1 },
            { name: "meat stew", cost: 50, serving: 1 },
          ],
        },
        {
          name: "lunch",
          id: 2,
          time: "01:00pm",
          ate: false,
          revealServings: false,
          servingsDialog: false,
          foods: [
            { name: "pilau", cost: 150, serving: 1 },
            { name: "mango juice", cost: 70, serving: 1 },
            { name: "meat stew", cost: 50, serving: 1 },
          ],
        },
        {
          name: "snack",
          id: 4,
          time: "04:00pm",
          ate: false,
          revealServings: false,
          servingsDialog: false,
          foods: [
            { name: "donut", cost: 10, serving: 1 },
            { name: "passion juice", cost: 30, serving: 1 },
          ],
        },
        {
          name: "supper",
          id: 3,
          time: "07:00pm",
          ate: false,
          revealServings: false,
          servingsDialog: false,
          foods: [
            { name: "rice", cost: 30, serving: 1 },
            { name: "cabbage", cost: 20, serving: 1 },
            { name: "beans", cost: 20, serving: 1 },
          ],
        },
      ]

      // Commit the meals to the meals state
      commit('setMeals', meals);
    },
    getAvailableFoodsAction({ commit }) {
      // Get the foods from the database
      const foods = [
        {
          id: 0,
          name: 'Chapati'
        },
        {
          id: 1,
          name: 'Rice'
        },
        {
          id: 2,
          name: 'Beans'
        },
        {
          id: 3,
          name: 'Pilau'
        },
        {
          id: 4,
          name: 'Shawarma'
        },
        {
          id: 5,
          name: 'Mutura'
        },
      ]

      // Commit the foods to the available foods state
      commit('setAvailableFoods', foods);
    },
    getLikedFoodsAction({ commit }) {
      // Get the foods from the database
      const foods = ['Chapati']

      // Commit the foods to the liked foods state
      commit('setLikedFoods', foods);
    },
  },
  modules: {
  }
})
