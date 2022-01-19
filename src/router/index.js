import Vue from 'vue'
import VueRouter from 'vue-router'

import EasterEgg from '@/components/EasterEgg.vue';
import Home from '@/components/Home.vue';
import SignIn from '@/components/SignIn.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn
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
