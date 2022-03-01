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
  updateDoc,
} from "firebase/firestore";

export default new Vuex.Store({
  state: {
    pageTitle: '',
    pageLoading: false,
    loggedIn: false,
    email: undefined,
    role: undefined,
    meals: [],
    profile: undefined,
    settings: undefined,
    notifications: undefined,
    messages: undefined,
    eateries: [],
    likedFoods: [],
    dashboardLinks: [],
    availableFoods: [],
    menu: [],
    allMenus: [],
    suggestedEateries: [],

    allFoods: [],
    allUsers: [],
    mealTimes: null,
  },
  mutations: {
    setPageTitle(state, title) {
      state.pageTitle = title
    },
    setPageLoading(state, status) {
      state.pageLoading = status
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
    addLikedFood(state, food) {
      state.likedFoods.push(food)
    },
    updateLikedFood(state, food) {
      const index = state.availableFoods.findIndex(f => f.id === food.id);
      state.likedFoods.splice(index, 1);
      state.likedFoods = [...state.likedFoods];
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
      const index = state.menu.findIndex(f => f.id === food.id);
      state.menu.splice(index, 1);
      state.menu = [...state.menu]
    },
    addMenu(state, menu) {
      state.allMenus.push(menu)
    },
    addSuggestedEatery(state, eatery) {
      state.suggestedEateries.push(eatery)
    },
    setSuggestedEateries(state, eateries) {
      state.suggestedEateries = eateries
    },
    deleteSuggestedEatery(state, meal) {
      const index = state.suggestedEateries.findIndex(e => e.mealId === meal.id);
      state.suggestedEateries.splice(index, 1);
      state.suggestedEateries = [...state.suggestedEateries]
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
    async addMealAction({ commit, state }, meal) {
      // Add a single meal to the database
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/meals/meal${meal.id}`)
      await setDoc(docRef, meal, { merge: true })
      commit('addMeal', meal)
    },
    async deleteMealAction({ commit, state }, meal) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/meals/meal${meal.id}`)
      await deleteDoc(docRef);
      commit('deleteMeal', meal)
    },
    async updateMealAction({ commit, state }, meal) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/meals/meal${meal.id}`)

      // Change the dialog variables to false
      meal.servingsDialog = false
      meal.revealServings = false

      await setDoc(docRef, meal, { merge: true })
      commit('updateMeal', meal)
    },
    async saveAteMealAction({ commit, state }, meal) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/meals/meal${meal.id}`)
      await updateDoc(docRef, {
        ate: meal.ate
      })
      commit('updateMeal', meal)
    },
    async addLikedFoodAction({ commit, state }, food) {
      // Add a single liked food to the database
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/likedFoods/food${food.id}`)
      await setDoc(docRef, food)
      commit('addLikedFood', food)
    },
    async updateLikedFoodAction({ commit, state }, food) {
      // Update the liked foods in the database
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/likedFoods/food${food.id}`)
      await deleteDoc(docRef)
      commit('updateLikedFood', food)
    },
    async addMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/menu/food${food.id}`)
      await setDoc(docRef, food)
      commit('addMenuFood', food)
    },
    async getMenuAction({ commit, state }) {
      const db = getFirestore()
      const collectionRef = collection(db, `users/${state.email}/menu`)
      const snapShot = await getDocs(collectionRef)
      const menuFoods = snapShot.docs.map(doc => doc.data())
      commit('setMenu', menuFoods)
    },
    async updateMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/menu/food${food.id}`)
      await setDoc(docRef, food, { merge: true })
      commit('updateMenuFood', food)
    },
    async deleteMenuFoodAction({ commit, state }, food) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/menu/food${food.id}`)
      await deleteDoc(docRef);
      commit('deleteMenuFood', food)
    },
    async setAllMenusAction({ commit, state }) {
      for (let index = 0; index < state.eateries.length; index++) {
        // Get the email of the eatery
        const eatery = state.eateries[index]
        const email = eatery.email

        // Fetch the menu
        const db = getFirestore()
        const collectionRef = collection(db, `users/${email}/menu`)
        const snapShot = await getDocs(collectionRef)
        const menuFoods = snapShot.docs.map(doc => doc.data())

        // Create an object
        const menuObj = {
          name: eatery.name,
          id: eatery.id,
          foods: menuFoods
        }

        // Add to the list of menus
        commit('addMenu', menuObj)
      }
    },
    async getSuggestedEateries({ commit, state }) {
      const db = getFirestore()
      const collectionRef = collection(db, `users/${state.email}/suggestedEateries`)
      const snapShot = await getDocs(collectionRef)
      const suggestedEateries = snapShot.docs.map(doc => doc.data())
      commit('setSuggstedEateries', suggestedEateries)
    },
    async addSuggestedEatery({ commit, state }, eatery) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/suggestedEateries/meal${eatery.mealId}`)
      await setDoc(docRef, eatery)
      commit('addSuggestedEatery', eatery)
    },
    async deleteSuggestedEateryAction({ commit, state }, meal) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/suggestedEateries/meal${meal.id}`)
      await deleteDoc(docRef)
      commit('deleteSuggestedEatery', meal)
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
    getMenuById: (state) => id => {
      return state.allMenus.find(m => m.id === id)
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
