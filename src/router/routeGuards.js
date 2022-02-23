import { roleRedirect } from '../utils'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import store from '../store'

/**
 * Checks if the user is authorized to access the page
 * @param {object} to Vue Router to object
 * @param {object} from Vue Router from object
 * @param {object} next Vue Router next object
 */
function checkAuth(to, from, next) {
    // Set the page title in the dashboard bar
    store.commit('setPageTitle', to.meta.title)

    let init = new Promise(resolve => resolve(false))

    // Initialize firebase before routing
    if (!store.state.email || !store.state.loggedIn || !store.state.role) {
        init = new Promise(resolve => {
            const auth = getAuth()

            onAuthStateChanged(auth, user => {
                if (user) {
                    store.commit('setPageLoading', true)
                    store.commit('setEmail', user.email)
                    store.commit('setLoggedIn', true)
                    resolve(true)
                } else {
                    store.commit('setEmail', undefined)
                    store.commit('setLoggedIn', undefined)
                    store.commit('setRole', undefined)
                    resolve(false)
                }
            })
        })
    }

    // Initialize firebase auth first
    init.then(status => {
        if (status) {
            // Fetch and store user data
            return Promise.all([
                store.dispatch('getProfileAction'),
                store.dispatch('getSettingsAction')
            ])
        } else return false
    }).then(data => {
        if (data.length > 0 && store.state.profile) {
            store.commit('setRole', store.state.profile.role)
            store.commit('setDashboardLinks', store.state.profile.role)
        }
    }).finally(() => {
        // Stop page laod
        store.commit('setPageLoading', false)

        // 1. Check if it is a landing page
        if (to.meta.landingPage) {
            // 1.1 If it is, check user is logged in
            if (store.state.loggedIn) {
                // 1.1.1 If he is, check if he has a role
                if (store.state.role) {
                    // 1.1.1.1 If he has, redirect according to the role
                    next({ name: roleRedirect(store.state.role) })
                } else {
                    // 1.1.1.2 If he does not, redirect to create profile page
                    next({ name: 'create-profile' })
                }
            } else {
                // 1.1.2 If he is not, let pass
                next()
            }
        }
        // 2. If not, check if it requires auth
        else if (to.meta.requiresAuth) {
            // 2.1 If it is , check user is logged in
            if (store.state.loggedIn) {
                // 2.1.1 If he is, check if he has a role
                if (store.state.role) {
                    // 2.1.1.1 If he has, check if it is the create profile page
                    if (to.name === 'create-profile') {
                        // 2.1.1.1.1 If it is, redirect according to role
                        next({ name: roleRedirect(store.state.role) })
                    } else {
                        // 2.1.1.1.2 If it is not, check if he can view the page
                        if (to.meta.role === store.state.role || to.meta.role === 'all') {
                            // 2.1.1.1.2.1 If he can, pass
                            next()
                        } else {
                            // 2.1.1.1.2.2 If he cannot, redirect according to role
                            next({ name: roleRedirect(store.state.role) })
                        }
                    }
                } else {
                    // 2.1.2 If he does not, check if it is the create profile page
                    if (to.name === 'create-profile') {
                        // 2.1.2.1 If it is, pass
                        next()
                    } else {
                        // 2.1.2.2 If not, redirect to create profile page
                        next({ name: 'create-profile' })
                    }
                }
            } else {
                // 2.2 If he is not, redirect to sign in
                next({ name: 'sign-in' })
            }
        }
        // 3. If not, it is probably a page not found so pass
        else next()
    })
}

export default checkAuth