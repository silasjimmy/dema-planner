import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import titleMixin from './mixins/titleMixin'
import { firestorePlugin } from 'vuefire'
import { initializeApp } from "firebase/app";
import VueGoogleCharts from 'vue-google-charts'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Register vuefire plugin
Vue.use(firestorePlugin)

// Register Google Charts plugin
Vue.use(VueGoogleCharts)

// Flag icons
Vue.use(FlagIcon);

// Register title mixin
Vue.mixin(titleMixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
