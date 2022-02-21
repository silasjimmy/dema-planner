import { roleRedirect } from '../utils'
import store from '../store'

/**
 * Checks if the user is authorized to access the page
 * @param {object} to Vue Router to object
 * @param {object} from Vue Router from object
 * @param {object} next Vue Router next object
 */
function checkAuth(to, from, next) {
    // Update page title in store
    store.commit('setPageTitle', to.meta.title)

    // Restrict viewing the landing pages if the user is logged in
    if (to.meta.preventLandingView) {
        if (localStorage.getItem('loggedIn') === 'true') {
            next({ name: roleRedirect(localStorage.getItem('role')) })
        }
        else next()
    }

    // Restrict user from viewing pages which require authentication
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('loggedIn') === 'true') {
            if (to.meta.role === localStorage.getItem('role') || to.meta.role === 'all') next()
            else next({ name: roleRedirect(localStorage.getItem('role')) })
        }
        else next({ name: 'sign-in' })
    }
    else next()
}

export default checkAuth