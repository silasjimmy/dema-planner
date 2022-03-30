import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../i18n'

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
  addDoc,
  arrayUnion,
} from "firebase/firestore";

export default new Vuex.Store({
  state: {
    pageTitle: '',
    pageLoading: false,
    pageLoadingMessage: '',
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
    mealTimes: [],
    eateryBookings: [],

    allFoods: [],
    allUsers: [],
  },
  mutations: {
    setPageTitle(state, title) {
      state.pageTitle = title
    },
    setPageLoading(state, status) {
      state.pageLoading = status
    },
    setPageLoadingMessage(state, message) {
      state.pageLoadingMessage = message
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
            { url: "/meal-planner", icon: "mdi-hamburger", text: i18n.t("app.links.one") },
            { url: "/available-foods", icon: "mdi-pizza", text: i18n.t("app.links.two") },
            {
              url: "/nearest-eateries",
              icon: "mdi-table-chair",
              text: i18n.t("app.links.three"),
            },
          ]
          break;
        case 'eatery':
          state.dashboardLinks = [
            { url: "/menu", icon: "mdi-book-open-variant", text: "Menu" },
            { url: "/bookings", icon: "mdi-book", text: "Bookings" },
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
    removeLikedFood(state, food) {
      const index = state.likedFoods.findIndex(f => f.id === food.id);
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
    updateSuggestedEatery(state, eatery) {
      const index = state.suggestedEateries.findIndex(e => e.mealId === eatery.mealId);
      state.menu.splice(index, 1, eatery);
      state.suggestedEateries = [...state.suggestedEateries]
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
    setLikedFoods(state, foods) {
      state.likedFoods = foods
    },
    setMeals(state, meals) {
      state.meals = meals
    },
    setEateryBookings(state, bookings) {
      state.eateryBookings = bookings
    },
    addEateryBooking(state, booking) {
      state.eateryBookings.push(booking)
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
    async updateSettingsAction({ commit, state }, settings) {
      // Upload the user settings to the database
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/settings/all`)
      await setDoc(docRef, settings, { merge: true });
      commit('setSettings', settings)
    },
    async getMealsAction({ commit, state, dispatch }) {
      const db = getFirestore();
      const docRef = collection(db, `users/${state.email}/meals`)
      const snapShot = await getDocs(docRef)
      const meals = snapShot.docs.map(doc => doc.data())

      if (meals.length > 0) {
        const today = new Date()

        if (today.toDateString() !== meals[0].created.toDate().toDateString()) {
          for (let index = 0; index < meals.length; index++) {
            // Delete the meal
            await dispatch('deleteMealAction', meals[index])
            // Delete the suggested eatery
            await dispatch('deleteSuggestedEateryAction', meals[index])
          }

          commit('setMeals', []);
        } else commit('setMeals', meals);
      } else commit('setMeals', []);
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
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/meals/meal${meal.id}`)
      await setDoc(docRef, meal, { merge: true })
      commit('addMeal', meal)
    },
    async deleteMealAction({ state }, meal) {
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/meals/meal${meal.id}`)
      await deleteDoc(docRef)
    },
    async updateMealAction({ commit, state }, meal) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/meals/meal${meal.id}`)
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
    async removeLikedFoodAction({ commit, state }, food) {
      // Update the liked foods in the database
      const db = getFirestore();
      const docRef = doc(db, `users/${state.email}/likedFoods/food${food.id}`)
      await deleteDoc(docRef)
      commit('removeLikedFood', food)
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
    async getSuggestedEateriesAction({ commit, state }) {
      const db = getFirestore()
      const collectionRef = collection(db, `users/${state.email}/suggestedEateries`)
      const snapShot = await getDocs(collectionRef)
      const suggestedEateries = snapShot.docs.map(doc => doc.data())
      commit('setSuggestedEateries', suggestedEateries)
    },
    async addSuggestedEateryAction({ commit, state }, eatery) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/suggestedEateries/meal${eatery.mealId}`)
      await setDoc(docRef, eatery)
      commit('addSuggestedEatery', eatery)
    },
    async updateSuggestedEateryAction({ commit, state }, eatery) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/suggestedEateries/meal${eatery.mealId}`)
      await updateDoc(docRef, {
        reservedSeat: true
      })
      eatery.reservedSeat = true
      commit('updateSuggestedEatery', eatery)
    },
    async deleteSuggestedEateryAction({ commit, state }, meal) {
      const db = getFirestore()
      const docRef = doc(db, `users/${state.email}/suggestedEateries/meal${meal.id}`)
      await deleteDoc(docRef)
      commit('deleteSuggestedEatery', meal)
    },
    async getAllUsersAction({ commit }) {
      const db = getFirestore();
      const snapShot = await getDocs(collection(db, 'users'))
      const users = snapShot.docs.map(doc => doc.data())
      commit('setAllUsers', users);
    },
    async getAllFoodsAction({ commit }) {
      const db = getFirestore();
      const snapShot = await getDocs(collection(db, 'foods'))
      const foods = snapShot.docs.map(doc => doc.data())
      commit('setAllFoods', foods);
    },
    async addFoodAction({ commit }, food) {
      const db = getFirestore()
      const docRef = doc(db, 'foods', `food${food.id}`)
      await setDoc(docRef, food)
      commit('addFood', food)
    },
    async updateFoodAction({ commit }, food) {
      const db = getFirestore()
      const docRef = doc(db, 'foods', `food${food.id}`)
      await setDoc(docRef, food, { merge: true })
      commit('updateFood', food)
    },
    async deleteFoodAction({ commit }, food) {
      const db = getFirestore()
      const docRef = doc(db, "foods", `food${food.id}`)
      await deleteDoc(docRef);
      commit('deleteFood', food)
    },
    async saveMealHistoryAction({ state }, meal) {
      const db = getFirestore()
      const docRef = collection(db, `users/${state.email}/history`)
      await addDoc(docRef, meal)
    },
    async getEateryBookingsAction({ commit, state }) {
      const db = getFirestore()
      const collectionRef = collection(db, `users/${state.email}/bookings`)
      const snapShot = await getDocs(collectionRef)
      const eateryBookings = snapShot.docs.map(doc => doc.data())
      commit('setEateryBookings', eateryBookings)
    },
    async addEateryBookingAction({ commit, state }, payload) {
      const db = getFirestore()
      const docRef = doc(db, `users/${payload.email}/bookings/${state.email}`)
      const snapShot = await getDoc(docRef);

      if (snapShot.exists()) {
        await updateDoc(docRef, {
          meals: arrayUnion(payload.booking.meals[0])
        })
      } else { await setDoc(docRef, payload.booking) }

      commit('addEateryBooking', payload.booking)
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
    getLikedFoodById: (state) => id => {
      return state.likedFoods.find(food => food.id === id)
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
