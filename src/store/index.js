import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { sortMessages, sortNotifications } from '../utils'
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default new Vuex.Store({
  state: {
    pageTitle: 'Home',
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
    messages: [],
    eateries: [],
    meals: [],

    likedFoods: null,
    mealTimes: null,
  },
  mutations: {
    setPageTitle(state, title) {
      state.pageTitle = title
    },
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
    setMessages(state, messages) {
      state.messages = messages
    },
    setEateries(state, eateries) {
      state.eateries = eateries
    },
    addMeal(state, meal) {
      state.meals.push(meal)
    },

    setMeals(state, meals) {
      state.meals = meals
    },
    setLikedFoods(state, foods) {
      state.likedFoods = foods
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
    async getAvailableFoodsAction({ commit, state }) {
      // Get the foods from the database
      const db = getFirestore()
      const foodsQuery = query(collection(db, "foods"), where("regions", "array-contains", state.userProfile.country));
      const snapShot = await getDocs(foodsQuery)
      const availableFoods = snapShot.docs.map(doc => doc.data())

      // Commit the foods to the available foods state
      commit('setAvailableFoods', availableFoods);
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
    async getNotificationsAction({ commit }) {
      // Get user notifications
      const db = getFirestore();
      const snapshot = await getDoc(doc(db, 'notifications/jimmysilas17@gmail.com'))
      const notifications = snapshot.data()

      // Sort the notifications according to created time
      const sortedNotifications = sortNotifications(notifications)

      commit('setNotifications', sortedNotifications)
    },
    async getEateriesAction({ commit }) {
      const db = getFirestore()
      const eateriesRef = collection(db, "profiles");
      const eateriesQuery = query(eateriesRef, where("role", "==", "eatery"));
      const snapShot = await getDocs(eateriesQuery)
      const eateries = snapShot.docs.map(doc => doc.data())

      // Commit the eateries to the nearest eateries state
      commit('setEateries', eateries);
    },
    async getMessagesAction({ commit }) {
      // Get user messages
      const db = getFirestore();
      const snapshot = await getDoc(doc(db, 'messages/jimmysilas17@gmail.com'))
      const messages = snapshot.data()

      // Sort the messages
      const sortedMessages = sortMessages(messages)

      commit('setMessages', sortedMessages)
    },
    async addMealAction({ commit, state }, meal) {
      // Add a single meal to the database
      const db = getFirestore();
      const docRef = doc(db, `profiles/${state.userEmail}/meals/meal${meal.id}`)
      await setDoc(docRef, meal, { merge: true })
      commit('addMeal', meal)
    },
    async getMealsAction({ commit, state }) {
      const db = getFirestore();
      const docRef = collection(db, `profiles/${state.userEmail}/meals`)
      const snapShot = await getDocs(docRef)
      const meals = snapShot.docs.map(doc => doc.data())
      commit('setMeals', meals);
    },
  },
  getters: {
    getEateryById: (state) => id => {
      return state.eateries.find(e => e.id === id)
    },
    getMessageById: (state) => id => {
      return state.messages.find(m => m.id === id)
    },
    getFoodByName: (state) => name => {
      return state.allFoods.find(food => food.name === name)
    },
    getMessagesByRead: (state) => read => {
      return state.messages.filter(m => m.read === read)
    },
    getNotificationsByRead: (state) => read => {
      return state.notifications.filter(m => m.read === read)
    },
    getFoodsByNutrient: (state) => nutrient => {
      return state.availableFoods.filter(f => f.nutrient.name === nutrient)
    },
  },
})
