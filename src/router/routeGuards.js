export default function checkAuth(to, from, next) {
    if (to.meta.requiresAuth) {
        const loggedIn = localStorage.getItem('loggedIn')

        if (loggedIn === 'true') next()
        else next({ name: 'sign-in', query: { redirect: to.path } })
    }
    else next()
}