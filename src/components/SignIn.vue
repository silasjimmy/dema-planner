<template>
  <v-row align="center" class="text-center fill-height">
    <v-col cols="10" sm="8" md="6" lg="4" xl="3" class="mx-auto my-2">
      <h1 class="text-h4 font-weight-medium my-4">Welcome back!</h1>
      <v-text-field
        dense
        outlined
        clearable
        color="success"
        prepend-icon="mdi-email"
        v-model="email"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        dense
        outlined
        clearable
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => (showPassword = !showPassword)"
        color="success"
        prepend-icon="mdi-lock"
        v-model="password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
      ></v-text-field>
      <div class="d-flex justify-space-between align-center">
        <v-checkbox
          hide-details
          dense
          class="my-0"
          label="Remember me"
          color="success"
        ></v-checkbox>
        <v-btn plain link rounded class="text-none">Forgot password?</v-btn>
      </div>
      <v-btn
        rounded
        :loading="emailAuthLoad"
        @click="emailSignIn"
        color="success"
        class="text-none my-4"
        >Log in</v-btn
      >
      <div class="text-center">or</div>
      <v-btn
        outlined
        rounded
        :loading="googleAuthLoad"
        @click="googleSignIn"
        color="grey darken-3"
        class="my-4 text-none"
      >
        <v-icon left>mdi-google</v-icon>
        continue in with Google
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export default {
  name: "SignIn",
  title: "Sign in",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      emailAuthLoad: false,
      googleAuthLoad: false,
    };
  },
  methods: {
    emailSignIn() {
      this.emailAuthLoad = true;

      // localStorage.setItem("loggedIn", "true");
      // this.redirect();

      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((response) => {
          // Store the user email locally
          localStorage.setItem("userEmail", response.user.email);

          // Set logged in to true
          localStorage.setItem("loggedIn", "true");
        })
        .then(() => this.redirect())
        .catch((error) => {
          this.emailAuthLoad = false;
          console.log(error.message);
        });
    },
    googleSignIn() {
      this.googleAuthLoad = true;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((response) => {
          // Store the user email locally
          localStorage.setItem("userEmail", response.user.email);

          // Set logged in to true
          localStorage.setItem("loggedIn", "true");
        })
        .then(() => this.redirect())
        .catch((error) => {
          this.googleAuthLoad = false;
          console.log(error.message);
        });
    },
    async redirect() {
      const db = getFirestore();

      // Check if user has a profile
      const profile = await getDoc(
        doc(db, "profiles", localStorage.getItem("userEmail"))
      );

      this.emailAuthLoad = false;
      this.googleAuthLoad = false;

      // localStorage.setItem("userRole", "admin");
      // this.$store.commit("setUserRole", "admin");
      // this.$router.replace({ name: "summary" });

      if (profile.exists()) {
        // Update signed in state in store
        this.$store.commit("setSignedIn", true);

        // If has profile, redirect based on role
        const profileData = profile.data();

        // Set user role
        localStorage.setItem("userRole", profileData.role);

        // Update user role state in store
        this.$store.commit("setUserRole", profileData.role);

        switch (profileData.role) {
          case "consumer":
            this.$router.replace({ name: "meal-planner" });
            break;
          case "eatery":
            this.$router.replace({ name: "menu" });
            break;
          default:
            this.$router.replace({ name: "menu" });
        }
      } else {
        // If has no profile, redirect to create profile page
        this.$router.replace({ name: "create-profile" });
      }
    },
  },
};
</script>

<style scoped>
</style>