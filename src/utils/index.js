function roleRedirect(role) {
    switch (role) {
        case "consumer":
            return "meal-planner"
        case "eatery":
            return "menu"
        case "admin":
            return "summary"
        default:
            return "home"
    }
}

export { roleRedirect }