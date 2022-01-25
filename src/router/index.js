import Vue from 'vue'
import VueRouter from 'vue-router'
import checkAuth from './routeGuards'

import Users from '@/components/Users.vue';
import Home from '@/components/Home.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import Foods from '@/components/Foods.vue';
import CreateProfile from '@/components/CreateProfile.vue';
import MealPlanner from '@/components/MealPlanner.vue';
import AvailableFoods from '@/components/AvailableFoods.vue';
import NearestEateries from '@/components/NearestEateries.vue';
import EateryDetails from '@/components/EateryDetails.vue';
import Profile from '@/components/Profile.vue';
import Settings from '@/components/Settings.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/create-profile',
    name: 'create-profile',
    component: CreateProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    path: '/foods',
    name: 'foods',
    component: Foods,
  },
  {
    path: '/meal-planner',
    name: 'meal-planner',
    component: MealPlanner,
  },
  {
    path: '/available-foods',
    name: 'available-foods',
    component: AvailableFoods,
  },
  {
    path: '/nearest-eateries',
    name: 'nearest-eateries',
    component: NearestEateries,
  },
  {
    path: '/nearest-eateries/:id',
    component: EateryDetails,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(checkAuth)

export default router
