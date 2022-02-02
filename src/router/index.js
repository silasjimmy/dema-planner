import Vue from 'vue'
import VueRouter from 'vue-router'
import checkAuth from './routeGuards'

import Users from '@/components/Users.vue';
import Home from '@/components/Home.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import AboutUs from '@/components/AboutUs.vue';
import ContactUs from '@/components/ContactUs.vue';
import Foods from '@/components/Foods.vue';
import CreateProfile from '@/components/CreateProfile.vue';
import MealPlanner from '@/components/MealPlanner.vue';
import AvailableFoods from '@/components/AvailableFoods.vue';
import NearestEateries from '@/components/NearestEateries.vue';
import EateryDetails from '@/components/EateryDetails.vue';
import Menu from '@/components/Menu.vue';
import FoodRequest from '@/components/FoodRequest.vue';
import Summary from '@/components/Summary.vue';
import Profile from '@/components/Profile.vue';
import Settings from '@/components/Settings.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import Notifications from '@/components/Notifications.vue';

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
    path: '/about-us',
    name: 'about-us',
    component: AboutUs
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs
  },
  {
    path: '/create-profile',
    name: 'create-profile',
    component: CreateProfile,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // User should have an account with no profile to access this page

      // 1. Check if the user is logged in
      // 1.1 If not redirect to log in page
      // 2 If logged in, check if his/her profile exists
      // 2.1 If it does not exists, persist
      // 3. If profile exists, redirect according to role
      const role = localStorage.getItem('userRole')
      if (role !== null) {
        switch (role) {
          case 'value':

            break;

          default:
            break;
        }
      }
      console.log(to, from, next);
    }
  },
  {
    path: '/meal-planner',
    name: 'meal-planner',
    component: MealPlanner,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/available-foods',
    name: 'available-foods',
    component: AvailableFoods,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nearest-eateries',
    name: 'nearest-eateries',
    component: NearestEateries,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nearest-eateries/:id',
    component: EateryDetails,
    name: 'eatery-details',
    props: r => ({ id: parseInt(r.params.id) }),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/food-request',
    name: 'food-request',
    component: FoodRequest,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/summary',
    name: 'summary',
    component: Summary,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/foods',
    name: 'foods',
    component: Foods,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/page-not-found',
    name: 'page-not-found',
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
