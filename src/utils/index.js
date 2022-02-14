import { getFirestore, getDoc, doc } from "firebase/firestore";
import store from '../store'

/**
 * Redirects the user based on their role
 * @param {string} role User's role
 * @returns {string} Name of the route to redirect to
 */
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

/**
 * Check if the user's profile exists
 * @param {string} email User's email address
 * @returns {object} If the user's profile exists and the user's role
 */
async function checkUserProfile(email) {
    const db = getFirestore();
    const profile = await getDoc(doc(db, "profiles", email))

    if (profile.exists()) {
        const data = profile.data()

        // Set user role
        localStorage.setItem("role", data.role);
        store.commit("setUserRole", data.role);

        // Set user profile and dashboard links
        store.commit("setUserProfile", data);
        store.commit("setDashboardLinks", data.role);

        // Update log in status
        localStorage.setItem("loggedIn", "true");
        store.commit("setLoggedIn", true);

        return {
            hasProfile: true,
            role: data.role
        }
    } else {
        return {
            hasProfile: false,
            role: undefined
        }
    }
}

/**
 * Transforms the messages object to an array of messages
 * @param {object} messages user messages
 * @returns {array} AN array of sorted messages
 */
function sortMessages(messages) {
    const messagesArray = Object.entries(messages);

    let sortedMessages = [];

    messagesArray.forEach((message) => {
        // Create a new message object
        let newObj = message[1];
        newObj.email = message[0];

        // Sort replies
        newObj.replies.sort((a, b) => a.created - b.created)

        // Add to the sorted list
        sortedMessages.push(newObj);
    });

    return sortedMessages.sort((a, b) => b.created - a.created);
}

/**
 * Sorts the notifications from latest to earliest
 * @param {object} notifications User notifications
 * @returns {array} An array of user notifications
 */
function sortNotifications(notifications) {
    const notificationsArray = Object.values(notifications);

    // Sort the notifications
    return notificationsArray.sort((a, b) => b.created - a.created);
}

const defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/demaplanner.appspot.com/o/profileAvatars%2Fdefault%2Fdefault-image.png?alt=media&token=c5fac7bb-ab08-4cf4-9e53-4560d08b60df"

export { roleRedirect, checkUserProfile, defaultImageUrl, sortMessages, sortNotifications }