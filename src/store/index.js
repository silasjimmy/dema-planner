import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getFirestore,
  collection,
  getDocs
} from "firebase/firestore";

export default new Vuex.Store({
  state: {
    loggedIn: null,
    userEmail: null,
    userRole: null,
    dashboardLinks: [],
    userProfile: {},
    allFoods: [],
    allUsers: [],
    availableFoods: [],
    userSettings: {},
    menu: [],
    notifications: [],

    meals: [],
    likedFoods: null,
    eateries: [],
    mealTimes: null,
  },
  mutations: {
    setLoggedIn(state, status) {
      state.loggedIn = status
    },
    setUserEmail(state, email) {
      state.userEmail = email
    },
    setUserRole(state, role) {
      state.userRole = role
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
    setUserProfile(state, profile) {
      state.userProfile = profile
    },
    setAllFoods(state, foods) {
      state.allFoods = foods
    },
    addFood(state, food) {
      state.allFoods.push(food)
    },
    updateFood(state, food) {
      const index = state.allFoods.findIndex(f => f.id === food.id);
      state.allFoods.splice(index, 1, food);
      state.allFoods = [...state.allFoods];
    },
    deleteFood(state, food) {
      state.allFoods.splice(food, 1);
    },
    setAllUsers(state, users) {
      state.allUsers = users
    },
    setAvailableFoods(state, foods) {
      state.availableFoods = foods
    },
    setUserSettings(state, settings) {
      state.userSettings = settings
    },
    setMenu(state, menu) {
      state.menu = menu
    },
    addMenuFood(state, food) {
      state.menu.push(food)
    },
    updateMenuFood(state, food) {
      const index = state.menu.findIndex(f => f.id === food.id);
      state.menu.splice(index, 1, food);
      state.menu = [...state.menu];
    },
    deleteMenuFood(state, food) {
      state.menu.splice(food, 1);
    },
    setNotifications(state, notifications) {
      state.notifications = notifications
    },

    setMeals(state, meals) {
      state.meals = meals
    },
    setLikedFoods(state, foods) {
      state.likedFoods = foods
    },
    setEateries(state, eateries) {
      state.eateries = eateries
    },
    setMealTimes(state, mealTimes) {
      state.mealTimes = mealTimes
    },
  },
  actions: {
    async getUserProfileAction({ commit }) {
      const db = getFirestore();
      const profile = await getDoc(doc(db, "profiles", localStorage.getItem('email')));

      commit('setUserProfile', profile.data())
    },
    async getAllFoodsAction({ commit }) {
      // Create firestore database instance
      const db = getFirestore();

      // Fetch the foods from the database
      const snapShot = await getDocs(collection(db, 'foods'))

      // Map the foods to an array
      const foods = snapShot.docs.map(doc => doc.data())

      // Add the foods to the store
      commit('setAllFoods', foods);
    },
    async addFoodAction({ commit }, food) {
      const db = getFirestore()

      // Upload the food to the database
      await setDoc(doc(db, 'foods', `food${food.id}`), food)

      // Add to store
      commit('addFood', food)
    },
    async updateFoodAction({ commit }, food) {
      const db = getFirestore()

      // Upload the food to the database
      await setDoc(doc(db, 'foods', `food${food.id}`), food, { merge: true })

      // Update in store
      commit('updateFood', food)
    },
    async deleteFoodAction({ commit }, food) {
      const db = getFirestore()

      // Delete from database
      await deleteDoc(doc(db, "foods", `food${food.id}`));

      // Delete from store
      commit('deleteFood', food)
    },
    async getAllUsersAction({ commit }) {
      // Create firestore database instance
      const db = getFirestore();

      // Fetch the foods from the database
      const snapShot = await getDocs(collection(db, 'profiles'))

      // Map the foods to an array
      const users = snapShot.docs.map(doc => doc.data())

      // Add the foods to the store
      commit('setAllUsers', users);
    },
    getAvailableFoodsAction({ commit }) {
      // Get the foods from the database

      // Commit the foods to the available foods state
      commit('setAvailableFoods', []);
    },
    getLikedFoodsAction({ commit }) {
      // Get the foods from the database

      // Commit the foods to the liked foods state
      commit('setLikedFoods', []);
    },
    async getUserSettingsAction({ commit, state }) {
      const db = getFirestore()

      const settings = await getDoc(doc(db, 'settings', state.userEmail))

      commit('setUserSettings', settings.data())
    },
    async getMenuAction({ commit, state }) {
      const db = getFirestore()

      // Fetch the menu foods from the database
      const snapShot = await getDocs(collection(db, 'menus', state.userEmail, 'menu'))

      // Map the foods to an array
      const menuFoods = snapShot.docs.map(doc => doc.data())

      commit('setMenu', menuFoods)
    },
    async addMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()

      // Upload the food to the database
      await setDoc(doc(db, 'menus', state.userEmail, 'menu', `food${food.food.id}`), food)

      // Add to store
      commit('addMenuFood', food)
    },
    async updateMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()

      // Upload the food to the database
      await setDoc(doc(db, 'menus', state.userEmail, 'menu', `food${food.food.id}`), food, { merge: true })

      // Update in store
      commit('updateMenuFood', food)
    },
    async deleteMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()

      // Delete from database
      await deleteDoc(doc(db, "menus", state.userEmail, 'menu', `food${food.food.id}`));

      // Delete from store
      commit('deleteMenuFood', food)
    },
    getNotificationsAction({ commit }) {
      // const notifications = [
      //   {
      //     message:
      //       "Magroove restaurant added another food to their menu. Check it out!",
      //     time: "07:00am",
      //     id: 1,
      //     link: "",
      //     read: false,
      //   },
      //   {
      //     message: "The nitty gritty details of it",
      //     time: "06:12am",
      //     id: 2,
      //     link: "",
      //     read: true,
      //   },
      // ]

      commit('setNotifications', [])
    },

    getMealsAction({ commit }) {
      // // Get the meals from the database
      // const meals = [
      //   {
      //     name: "breakfast",
      //     image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      //     id: 1,
      //     time: "07:00am",
      //     ate: false,
      //     revealServings: false,
      //     servingsDialog: false,
      //     foods: [
      //       { name: "chapati", cost: 10, serving: 1 },
      //       { name: "cabbage", cost: 20, serving: 1 },
      //       { name: "meat stew", cost: 50, serving: 1 },
      //     ],
      //   },
      //   {
      //     name: "lunch",
      //     image: 'https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=80',
      //     id: 2,
      //     time: "01:00pm",
      //     ate: false,
      //     revealServings: false,
      //     servingsDialog: false,
      //     foods: [
      //       { name: "pilau", cost: 150, serving: 1 },
      //       { name: "mango juice", cost: 70, serving: 1 },
      //       { name: "meat stew", cost: 50, serving: 1 },
      //     ],
      //   },
      //   {
      //     name: "snack",
      //     image: 'https://images.unsplash.com/photo-1566496875470-68ada46a38c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      //     id: 4,
      //     time: "04:00pm",
      //     ate: false,
      //     revealServings: false,
      //     servingsDialog: false,
      //     foods: [
      //       { name: "donut", cost: 10, serving: 1 },
      //       { name: "passion juice", cost: 30, serving: 1 },
      //     ],
      //   },
      //   {
      //     name: "supper",
      //     image: 'https://images.unsplash.com/photo-1598515213692-5f252f75d785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      //     id: 3,
      //     time: "07:00pm",
      //     ate: false,
      //     revealServings: false,
      //     servingsDialog: false,
      //     foods: [
      //       { name: "rice", cost: 30, serving: 1 },
      //       { name: "cabbage", cost: 20, serving: 1 },
      //       { name: "beans", cost: 20, serving: 1 },
      //     ],
      //   },
      // ]

      // Commit the meals to the meals state
      commit('setMeals', []);
    },
    getEateriesAction({ commit }) {
      // // Get the eateries from the database
      // const eateries = [
      //   {
      //     id: 1,
      //     image: 'https://images.unsplash.com/photo-1608495368297-de9ff48e6997?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
      //     name: "mangroove restaurant",
      //     city: "kilifi",
      //     country: "kenya",
      //     ratings: 4,
      //   },
      // ]

      // Commit the eateries to the nearest eateries state
      commit('setEateries', []);
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
    getEateryById: state => id => state.eateries.find(e => e.id === id),
    getFoodByName: (state) => name => {
      return state.allFoods.find(food => food.name === name)
    },
  },
})
