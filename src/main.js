import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import titleMixin from './mixins/titleMixin'
import { firestorePlugin } from 'vuefire'
import { initializeApp } from "firebase/app";
import VueGoogleCharts from 'vue-google-charts'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc_ClA6u_XdAQ4Mw8ZLwQ1IfS2UNbvXs4",
  authDomain: "demaplanner.app",
  projectId: "demaplanner",
  storageBucket: "demaplanner.appspot.com",
  messagingSenderId: "725807988259",
  appId: "1:725807988259:web:3edc7ad409145c83bcfb96"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Register vuefire plugin
Vue.use(firestorePlugin)

// Register Google Charts plugin
Vue.use(VueGoogleCharts)

// Register title mixin
Vue.mixin(titleMixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
