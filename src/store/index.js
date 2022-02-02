import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    signedIn: '',
    userRole: '',
    dashboardLinks: '',
    meals: [],
    availableFoods: [],
    likedFoods: null,
    eateries: [],
    userProfile: null,
    mealTimes: null,
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
            { url: "/menu", icon: "mdi-book-open-variant", text: "Menu" },
            { url: "/food-request", icon: "mdi-food-off-outline", text: "Food request" },
          ]
          break;
        case 'admin':
          state.dashboardLinks = [
            { url: "/summary", icon: "mdi-chart-multiple", text: "Summary" },
            { url: "/users", icon: "mdi-account-group", text: "Users" },
            { url: "/foods", icon: "mdi-food", text: "Foods" },
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
    setEateries(state, eateries) {
      state.eateries = eateries
    },
    setUserProfile(state, profile) {
      state.userProfile = profile
    },
    setMealTimes(state, mealTimes) {
      state.mealTimes = mealTimes
    },
  },
  actions: {
    getMealsAction({ commit }) {
      // Get the meals from the database
      const meals = [
        {
          name: "breakfast",
          image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
          image: 'https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=80',
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
          image: 'https://images.unsplash.com/photo-1566496875470-68ada46a38c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
          image: 'https://images.unsplash.com/photo-1598515213692-5f252f75d785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
    getEateriesAction({ commit }) {
      // Get the eateries from the database
      const eateries = [
        {
          id: 0,
          image: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
          name: "gako village cafe",
          city: "kilifi",
          country: "kenya",
          ratings: 1,
        },
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1608495368297-de9ff48e6997?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
          name: "mangroove restaurant",
          city: "kilifi",
          country: "kenya",
          ratings: 4,
        },
      ]

      // Commit the eateries to the nearest eateries state
      commit('setEateries', eateries);
    },
    getUserProfileAction({ commit }) {
      // Get the profile from the database
      let profile = {
        avatar: "https://cdn.vuetifyjs.com/images/john.png",
        name: "John Doe",
        email: "johndoe@domain.com",
        birthdate: "1999-05-02",
        gender: "Male",
        weight: { amount: 50, units: "kg" },
        height: { amount: 250, units: "cm" },
        activityLevel: "Lightly active",
        healthCondition: "Diabetic",
        bodyFat: "Medium",
        diet: "Vegan",
        goal: "Reduce weight",
        target: { amount: 10, units: "kg" },
        minimumSpending: { amount: 100, currency: "ksh" },
      }

      // Commit the profile to the user profile state
      commit('setUserProfile', profile);
    },
    getMealTimesAction({ commit }) {
      // Get the profile from the database
      let mealTimes = [
        { id: 1, name: "breakfast", time: "07:00am" },
        { id: 2, name: "lunch", time: "01:00pm" },
        { id: 3, name: "snack", time: "04:00pm" },
        { id: 4, name: "supper", time: "07:00pm" },
      ]

      // Commit the profile to the user profile state
      commit('setMealTimes', mealTimes);
    },
  },
  getters: {
    getEateryById: state => id => state.eateries.find(e => e.id === id)
  },
})
