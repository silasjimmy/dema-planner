import getAuth from 'firebase/auth'
// import { roleRedirect } from '../utils'
// import store from '../store'

/**
 * Checks if the user is authorized to access the page
 * @param {object} to Vue Router to object
 * @param {object} from Vue Router from object
 * @param {object} next Vue Router next object
 */
function checkAuth(to, from, next) {
    // // Scroll to top
    // window.scrollTo(0, 0)

    // // Restrict viewing the landing pages if the user is logged in
    // if (to.meta.preventLandingView && store.state.loggedIn) {
    //     next({ name: roleRedirect(store.state.role) })
    // }

    // Restrict user from viewing pages which require authentication
    if (to.meta.requiresAuth) {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(user);

        // if (user) {
        //     // Update store data
        //     store.commit("setLoggedIn", true);
        //     store.commit("setEmail", user.email);
        //     store.commit('setPageTitle', to.meta.title)
        //     next()
        // }
        // else next({ name: 'sign-in' })
    }
    else next()
}

export default checkAuth