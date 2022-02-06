<template>
  <v-row align="center" class="text-center fill-height">
    <v-col cols="10" sm="8" md="6" lg="4" xl="3" class="mx-auto my-2">
      <h1 class="text-h4 font-weight-medium my-4">Welcome back!</h1>
      <v-form ref="loginForm" lazy-validation>
        <!-- Log in error alert -->
        <v-alert
          outlined
          dense
          dismissible
          transition="scale-transition"
          v-model="errorAlert"
          type="error"
          >{{ errorMessage }}</v-alert
        >
        <v-text-field
          dense
          outlined
          clearable
          single-line
          :rules="[rules.required]"
          placeholder="example@domain.com"
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
          single-line
          :rules="[rules.required]"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (showPassword = !showPassword)"
          color="success"
          prepend-icon="mdi-lock"
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
        ></v-text-field>
      </v-form>
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
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      errorAlert: false,
      errorMessage: "",
    };
  },
  methods: {
    emailSignIn() {
      if (this.$refs.loginForm.validate()) {
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

            this.errorAlert = true;
            this.errorMessage = error.code;
          });
      }
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

          this.errorAlert = true;
          this.errorMessage = error.code;
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
            this.$router.replace(this.$route.query.redirect || "/meal-planner");
            break;
          case "eatery":
            this.$router.replace(this.$route.query.redirect || "/menu");
            break;
          case "admin":
            this.$router.replace(this.$route.query.redirect || "/summary");
            break;
          default:
            this.$router.replace({ path: "/home" });
            break;
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