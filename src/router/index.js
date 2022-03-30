import Vue from 'vue'
import VueRouter from 'vue-router'
import checkAuth from './routeGuards'
import i18n from '../i18n'

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
import Bookings from '@/views/Bookings.vue';

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
      landingPage: true,
      title: 'Home'
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
    meta: {
      landingPage: true,
      title: 'Log in'
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    meta: {
      landingPage: true,
      title: 'Create account'
    }
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUs,
    meta: {
      landingPage: true,
      title: 'About us'
    }
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs,
    meta: {
      landingPage: true,
      title: 'Contact us'
    }
  },
  {
    path: '/create-profile',
    name: 'create-profile',
    component: CreateProfile,
    meta: {
      requiresAuth: true,
      role: 'all',
      title: 'Create profile'
    },
  },
  {
    path: '/meal-planner',
    name: 'meal-planner',
    component: MealPlanner,
    meta: {
      requiresAuth: true,
      role: 'consumer',
      title: i18n.t("app.links.one")
    }
  },
  {
    path: '/available-foods',
    name: 'available-foods',
    component: AvailableFoods,
    meta: {
      requiresAuth: true,
      role: 'consumer',
      title: 'Available foods'
    }
  },
  {
    path: '/nearest-eateries',
    name: 'nearest-eateries',
    component: NearestEateries,
    meta: {
      requiresAuth: true,
      role: 'consumer',
      title: 'Nearest eateries'
    }
  },
  {
    path: '/nearest-eateries/:id',
    component: EateryDetails,
    name: 'eatery-details',
    props: r => ({ id: parseInt(r.params.id) }),
    meta: {
      requiresAuth: true,
      role: 'consumer',
      title: 'Details'
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    meta: {
      requiresAuth: true,
      role: 'eatery',
      title: 'Menu'
    }
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: Bookings,
    meta: {
      requiresAuth: true,
      role: 'eatery',
      title: 'Bookings'
    }
  },
  {
    path: '/food-request',
    name: 'food-request',
    component: FoodRequest,
    meta: {
      requiresAuth: true,
      role: 'eatery',
      title: 'Food request'
    }
  },
  {
    path: '/summary',
    name: 'summary',
    component: Summary,
    meta: {
      requiresAuth: true,
      role: 'admin',
      title: 'Summary'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      requiresAuth: true,
      role: 'admin',
      title: 'Users'
    }
  },
  {
    path: '/foods',
    name: 'foods',
    component: Foods,
    meta: {
      requiresAuth: true,
      role: 'admin',
      title: 'Foods'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true,
      role: 'all',
      title: 'Profile'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true,
      role: 'all',
      title: 'Settings'
    }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    meta: {
      requiresAuth: true,
      role: 'all',
      title: 'Notifications'
    }
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
    meta: {
      requiresAuth: true,
      role: 'all',
      title: 'Messages'
    }
  },
  {
    path: '/messages/:id',
    name: 'message-chat',
    component: Chat,
    meta: {
      requiresAuth: true,
      role: 'all',
      title: 'Chat'
    },
    props: r => ({ id: parseInt(r.params.id) }),
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
