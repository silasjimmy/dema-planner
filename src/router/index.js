import Vue from 'vue'
import VueRouter from 'vue-router'

import EasterEgg from '@/components/EasterEgg.vue';
import Home from '@/components/Home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/easter-egg',
    component: EasterEgg,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
