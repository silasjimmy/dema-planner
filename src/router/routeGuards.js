import { roleRedirect } from '../utils'

export default function checkAuth(to, from, next) {
    // Restrict viewing the landing pages if the user is logged in
    if (to.meta.preventLandingView) {
        if (localStorage.getItem('loggedIn') === 'true') {
            next({ name: roleRedirect(localStorage.getItem('role')) })
        }
        else next()
    }

    // Restrict user from viewing pages which require authentication
    if (to.meta.requiresAuth) {
        if (localStorage.getItem('loggedIn') === 'true') next()
        else next({ name: 'sign-in', query: { redirect: to.path } })
    }
    else next()
}