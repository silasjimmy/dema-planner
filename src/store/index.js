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
    loggedIn: false,
    email: undefined,
    role: undefined,
    meals: undefined,
    profile: {},
    settings: {},
    eateries: [],
    likedFoods: [],
    dashboardLinks: [],
    availableFoods: [],

    allFoods: [],
    allUsers: [],
    menu: [],
    notifications: [],
    messages: [],
    mealTimes: null,
  },
  mutations: {
    setPageTitle(state, title) {
      state.pageTitle = title
    },
    setLoggedIn(state, status) {
      state.loggedIn = status
    },
    setEmail(state, email) {
      state.email = email
    },
    setRole(state, role) {
      state.role = role
    },
    setProfile(state, profile) {
      state.profile = profile
    },
    setSettings(state, settings) {
      state.settings = settings
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
    updateMeal(state, meal) {
      const index = state.meals.findIndex(m => m.id === meal.id);
      state.meals.splice(index, 1, meal);
      state.meals = [...state.meals];
    },
    deleteMeal(state, meal) {
      state.meals.splice(meal, 1);
    },
    setLikedFoods(state, foods) {
      state.likedFoods = foods
    },
    addLikedFood(state, food) {
      state.likedFoods.push(food)
    },
    removeLikedFood(state, food) {
      state.likedFoods.splice(food, 1);
    },

    setMeals(state, meals) {
      state.meals = meals
    },
    setMealTimes(state, mealTimes) {
      state.mealTimes = mealTimes
    },
  },
  actions: {
    async getProfileAction({ commit, state }) {
      // Get the user profile from the database
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}`)
      const snapShot = await getDoc(docRef);
      const profile = snapShot.data()
      commit('setProfile', profile)
    },
    async getSettingsAction({ commit, state }) {
      // Get the user settings
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/settings/all`)
      const snapShot = await getDoc(docRef)
      const settings = snapShot.data()
      commit('setSettings', settings)
    },
    async uploadProfileAction({ commit, state }, profile) {
      // Upload the user profile to the database
      const db = getFirestore();
      const docRef = doc(db, "users", state.email)
      await setDoc(docRef, profile, { merge: true });
      commit('setProfile', profile)
    },
    async uploadSettingsAction({ commit, state }, settings) {
      // Upload the user settings to the database
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/settings/all`)
      await setDoc(docRef, settings, { merge: true });
      commit('setSettings', settings)
    },
    async getMealsAction({ commit, state }) {
      const db = getFirestore();
      const docRef = collection(db, `users/${state.email}/meals`)
      const snapShot = await getDocs(docRef)
      const meals = snapShot.docs.map(doc => doc.data())
      commit('setMeals', meals);
    },
    async getAvailableFoodsAction({ commit, state }) {
      // Get the foods from the database
      const db = getFirestore()
      const docRef = collection(db, "foods")
      const foodsQuery = query(docRef, where("regions", "array-contains", state.profile.country));
      const snapShot = await getDocs(foodsQuery)
      const availableFoods = snapShot.docs.map(doc => doc.data())
      commit('setAvailableFoods', availableFoods);
    },
    async getLikedFoodsAction({ commit, state }) {
      // Get user's liked foods from the database
      const db = getFirestore();
      const docRef = collection(db, `users/${state.email}/likedFoods`)
      const snapShot = await getDocs(docRef)
      const likedFoods = snapShot.docs.map(doc => doc.data())
      commit('setLikedFoods', likedFoods);
    },
    async getEateriesAction({ commit }) {
      // Get all registered eateries from the database
      const db = getFirestore()
      const eateriesRef = collection(db, "users");
      const eateriesQuery = query(eateriesRef, where("role", "==", "eatery"));
      const snapShot = await getDocs(eateriesQuery)
      const eateries = snapShot.docs.map(doc => doc.data())
      commit('setEateries', eateries);
    },

    async getMessagesAction({ commit, state }) {
      // Get user messages
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/messages/all`)
      const snapshot = await getDoc(docRef)
      const messages = snapshot.data()

      // Sort the messages
      const sortedMessages = sortMessages(messages)
      commit('setMessages', sortedMessages)
    },
    async getNotificationsAction({ commit, state }) {
      // Get user notifications
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/notifications/all`)
      const snapshot = await getDoc(docRef)
      const notifications = snapshot.data()

      // Sort the notifications according to created time
      const sortedNotifications = sortNotifications(notifications)
      commit('setNotifications', sortedNotifications)
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
    async getMenuAction({ commit, state }) {
      const db = getFirestore()

      // Fetch the menu foods from the database
      const snapShot = await getDocs(collection(db, 'menus', state.email, 'menu'))

      // Map the foods to an array
      const menuFoods = snapShot.docs.map(doc => doc.data())

      commit('setMenu', menuFoods)
    },
    async addMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()

      // Upload the food to the database
      await setDoc(doc(db, 'menus', state.email, 'menu', `food${food.food.id}`), food)

      // Add to store
      commit('addMenuFood', food)
    },
    async updateMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()

      // Upload the food to the database
      await setDoc(doc(db, 'menus', state.email, 'menu', `food${food.food.id}`), food, { merge: true })

      // Update in store
      commit('updateMenuFood', food)
    },
    async deleteMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()

      // Delete from database
      await deleteDoc(doc(db, "menus", state.email, 'menu', `food${food.food.id}`));

      // Delete from store
      commit('deleteMenuFood', food)
    },

    async addMealAction({ commit, state }, meal) {
      // Add a single meal to the database
      const db = getFirestore();
      const docRef = doc(db, `profiles/${state.email}/meals/meal${meal.id}`)
      await setDoc(docRef, meal, { merge: true })
      commit('addMeal', meal)
    },
    async updateMealAction({ commit, state }, meal) {
      const db = getFirestore()

      // Change the dialog variables to false
      meal.servingsDialog = false
      meal.revealServings = false

      await setDoc(doc(db, `profiles/${state.email}/meals/meal${meal.id}`), meal, { merge: true })

      commit('updateMeal', meal)
    },
    async deleteMealAction({ commit, state }, meal) {
      const db = getFirestore()

      // Delete from database
      await deleteDoc(doc(db, `profiles/${state.email}/meals/meal${meal.id}`));

      // Delete from store
      commit('deleteMeal', meal)
    },
    async addLikedFoodAction({ commit, state }, food) {
      // Add a single liked food to the database
      const db = getFirestore();
      const docRef = doc(db, `profiles/${state.email}/likedFoods/food${food.id}`)
      await setDoc(docRef, food)
      commit('addLikedFood', food)
    },
    async removeLikedFoodAction({ commit, state }, food) {
      const db = getFirestore()

      // Delete from database
      await deleteDoc(doc(db, `profiles/${state.email}/likedFoods/food${food.id}`));

      // Delete from store
      commit('removeLikedFood', food)
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
    calculateNutrientContent: (state) => nutrient => {
      let nutrientValues = []

      // Get the nutrient values from the meal foods
      state.meals.forEach(meal => {
        const foodWithNutrient = meal.foods.find(food => food.nutrient.name === nutrient)
        nutrientValues.push(parseInt(foodWithNutrient.nutrient.amount))
      });

      // Calculate the total of the nutrient amount
      const nutrientContent = nutrientValues.reduce((prevValue, currentValue) => prevValue + currentValue, 0)

      return nutrientContent
    },
    calculateCaloricContent: (state) => () => {
      let calorieValues = []

      // Get the calorie values in each food
      state.meals.forEach(meal => {

        meal.foods.forEach(food => {
          calorieValues.push(parseInt(food.calories.amount))
        });
      });

      // Calculate the total of the nutrient amount
      const caloricContent = calorieValues.reduce((prevValue, currentValue) => prevValue + currentValue, 0)

      return caloricContent
    },
  },
})
