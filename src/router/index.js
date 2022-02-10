import Vue from 'vue'
import VueRouter from 'vue-router'
import checkAuth from './routeGuards'

import Users from '@/views/Users.vue';
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import AboutUs from '@/views/AboutUs.vue';
import ContactUs from '@/views/ContactUs.vue';
import Foods from '@/views/Foods.vue';
import CreateProfile from '@/views/CreateProfile.vue';
import MealPlanner from '@/views/MealPlanner.vue';
import AvailableFoods from '@/views/AvailableFoods.vue';
import NearestEateries from '@/views/NearestEateries.vue';
import EateryDetails from '@/views/EateryDetails.vue';
import Menu from '@/views/Menu.vue';
import FoodRequest from '@/views/FoodRequest.vue';
import Summary from '@/views/Summary.vue';
import Profile from '@/views/Profile.vue';
import Settings from '@/views/Settings.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Notifications from '@/views/Notifications.vue';
import Messages from '@/views/Messages.vue';
import Chat from '@/views/Chat.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      preventLandingView: true,
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: {
      preventLandingView: true,
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: {
      preventLandingView: true,
    }
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUs,
    meta: {
      preventLandingView: true,
    }
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs,
    meta: {
      preventLandingView: true,
    }
  },
  {
    path: '/create-profile',
    name: 'create-profile',
    component: CreateProfile,
    meta: {
      requiresAuth: true,
      role: 'all'
    },
  },
  {
    path: '/meal-planner',
    name: 'meal-planner',
    component: MealPlanner,
    meta: {
      requiresAuth: true,
      role: 'consumer'
    }
  },
  {
    path: '/available-foods',
    name: 'available-foods',
    component: AvailableFoods,
    meta: {
      requiresAuth: true,
      role: 'consumer'
    }
  },
  {
    path: '/nearest-eateries',
    name: 'nearest-eateries',
    component: NearestEateries,
    meta: {
      requiresAuth: true,
      role: 'consumer'
    }
  },
  {
    path: '/nearest-eateries/:id',
    component: EateryDetails,
    name: 'eatery-details',
    props: r => ({ id: parseInt(r.params.id) }),
    meta: {
      requiresAuth: true,
      role: 'consumer'
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    meta: {
      requiresAuth: true,
      role: 'eatery'
    }
  },
  {
    path: '/food-request',
    name: 'food-request',
    component: FoodRequest,
    meta: {
      requiresAuth: true,
      role: 'eatery'
    }
  },
  {
    path: '/summary',
    name: 'summary',
    component: Summary,
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    path: '/foods',
    name: 'foods',
    component: Foods,
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true,
      role: 'all'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true,
      role: 'all'
    }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    meta: {
      requiresAuth: true,
      role: 'all'
    }
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
    meta: {
      requiresAuth: true,
      role: 'all'
    }
  },
  {
    path: '/messages/:id',
    name: 'message-chat',
    component: Chat,
    meta: {
      requiresAuth: true,
      role: 'all'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(checkAuth)

export default router
