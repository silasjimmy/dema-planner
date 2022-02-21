import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
 * @returns {object} If the user's profile exists and the profile object
 */
async function checkUserProfile() {
    const db = getFirestore();
    const docRef = doc(db, "users", store.state.email)
    const snapShot = await getDoc(docRef);

    return {
        hasProfile: snapShot.exists(),
        profile: snapShot.data()
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

function generateMeal(foods, mealTime) {
    const nutrients = ['protein', 'carbohydrate', 'vitamin']
    let mealFoods = []
    let mealImages = []

    nutrients.forEach(nutrient => {
        // 1. Filter foods based on nutrient
        const foodsByNutrient = foods.filter(food => food.nutrient.name === nutrient)

        // 2. Pick a random food from the list
        const n = Math.floor(Math.random() * foodsByNutrient.length);
        let randomFood = foodsByNutrient[n]

        // 3. Add the food to the list
        mealFoods.push(
            {
                id: randomFood.id,
                name: randomFood.name,
                calories: randomFood.calories,
                group: randomFood.group,
                nutrient: randomFood.nutrient,
                serving: 1,
                cost: 0,
            }
        )

        // 4. Add the food image url to the list
        mealImages.push(randomFood.imageUrl)
    });

    return {
        name: mealTime.name,
        time: mealTime.time,
        id: mealTime.id,
        created: new Date(),
        ate: false,
        image: mealImages[Math.floor(Math.random() * mealImages.length)],
        foods: mealFoods,
        revealServings: false,
        servingsDialog: false,
    }
}

async function getCounter(docString) {
    // Get the counter of the specified document
    const db = getFirestore();
    const docRef = doc(db, `counters/${docString}`);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    return data.last
}

async function updateCounter(docString, counterData) {
    // Get the counter of the specified document
    const db = getFirestore();
    const docRef = doc(db, `counters/${docString}`);
    await setDoc(docRef, counterData)
}

async function uploadImage(imageObject) {
    const storage = getStorage();

    // Upload the image to storage
    const imageRef = ref(storage, `profileAvatars/${store.state.email}/avatar.jpg`)
    const snapshot = await uploadBytes(imageRef, imageObject);

    // Get the image url
    const url = await getDownloadURL(snapshot.ref);
    return url
}

const defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/demaplanner.appspot.com/o/profileAvatars%2Fdefault%2Fdefault-image.png?alt=media&token=c5fac7bb-ab08-4cf4-9e53-4560d08b60df"

export {
    roleRedirect,
    checkUserProfile,
    defaultImageUrl,
    sortMessages,
    sortNotifications,
    generateMeal,
    getCounter,
    updateCounter,
    uploadImage
}