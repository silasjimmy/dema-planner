import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc_ClA6u_XdAQ4Mw8ZLwQ1IfS2UNbvXs4",
  authDomain: "demaplanner.firebaseapp.com",
  projectId: "demaplanner",
  storageBucket: "demaplanner.appspot.com",
  messagingSenderId: "725807988259",
  appId: "1:725807988259:web:3edc7ad409145c83bcfb96"
};

// Initialize Firebase
initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
