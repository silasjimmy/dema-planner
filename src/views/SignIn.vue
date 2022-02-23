<template>
  <v-sheet class="d-flex flex-column align-center justify-center" height="100%">
    <v-card outlined class="rounded-lg mx-auto" :width="cardWidth">
      <v-card-title class="justify-center">Welcome back!</v-card-title>
      <v-card-subtitle class="text-center">Log in to continue</v-card-subtitle>

      <v-card-text class="text-center pt-4">
        <!-- Action alert -->
        <v-alert
          text
          dismissible
          dense
          v-model="showAlert"
          transition="scale-transition"
          :type="actionSuccess ? 'success' : 'error'"
          :icon="actionSuccess ? 'mdi-account-check' : 'mdi-account-alert'"
          class="rounded-lg"
        >
          {{ alertMessage }}
        </v-alert>

        <v-form ref="loginForm" lazy-validation>
          <!-- Email address field -->
          <v-text-field
            dense
            outlined
            clearable
            single-line
            rounded
            :rules="[rules.required]"
            placeholder="example@domain.com"
            color="success"
            prepend-icon="mdi-email"
            v-model="email"
            label="Email address"
            type="email"
          ></v-text-field>

          <!-- Password field -->
          <v-text-field
            dense
            outlined
            clearable
            rounded
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

          <!-- Submit button -->
          <v-btn
            rounded
            :loading="emailSignInLoad"
            @click="emailSignIn"
            color="success"
            class="text-none"
            >Log in</v-btn
          >
        </v-form>
      </v-card-text>

      <v-card-text class="text-center">
        <p>Log in with</p>

        <!-- Google sign up button -->
        <v-btn
          small
          fab
          color="red"
          class="text-none"
          :loading="googleSignInLoad"
          @click="googleSignIn"
        >
          <v-icon small color="white">mdi-google</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { mapActions } from "vuex";
import { roleRedirect, checkUserProfile } from "../utils";

export default {
  name: "SignIn",
  title: "Log in",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      emailSignInLoad: false,
      googleSignInLoad: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      showAlert: false,
      actionSuccess: false,
      alertMessage: "",
    };
  },
  computed: {
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          return "30vw";
        case "lg":
          return "40vw";
        case "md":
          return "50vw";
        case "sm":
          return "70vw";
        case "xs":
          return "90vw";
        default:
          return "100vw";
      }
    },
  },
  methods: {
    ...mapActions([
      "getSettingsAction",
      "getMessagesAction",
      "getNotificationsAction",
    ]),
    /**
     * Signs in a user with email and password.
     */
    async emailSignIn() {
      if (this.$refs.loginForm.validate()) {
        try {
          // Start loading
          this.emailSignInLoad = true;

          const auth = getAuth();

          // Log in the user
          await signInWithEmailAndPassword(auth, this.email, this.password);

          // Redirect user to the dashboard
          await this.redirect();
        } catch (error) {
          // Stop loading
          this.emailSignInLoad = false;

          // Show error message
          this.alertMessage = error.code;
          this.actionSuccess = false;
          this.showAlert = true;
        }
      }
    },
    /**
     * Signs in a user with google provider.
     */
    async googleSignIn() {
      try {
        // Start loading
        this.googleSignInLoad = true;

        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        // Log in the user
        await signInWithPopup(auth, provider);

        // Redirect to dashboard
        await this.redirect();
      } catch (error) {
        // Stop loading
        this.googleSignInLoad = false;

        // Show error message
        this.alertMessage = error;
        this.actionSuccess = false;
        this.showAlert = true;
      }
    },
    /**
     * Redirects the user to the dashboard.
     */
    async redirect() {
      // Check if user profile exists
      const { ...response } = await checkUserProfile();

      // If it does, pull the required data from database
      if (response.hasProfile) {
        // Store user data in store
        this.$store.commit("setProfile", response.profile);
        this.$store.commit("setDashboardLinks", response.profile.role);

        // Fetch user data
        await this.getSettingsAction();
        // await this.getMessagesAction();
        // await this.getNotificationsAction();

        // Save role, email and log in state in local storage
        localStorage.setItem("role", response.profile.role);
        localStorage.setItem("email", response.profile.email);
        localStorage.setItem("loggedIn", "true");

        // Stop loading
        this.googleSignInLoad = false;

        // Set user role
        this.$store.commit("setRole", response.profile.role);

        // 5. Redirect to dashboard
        this.$router.replace({ name: roleRedirect(response.profile.role) });
      } else {
        // Stop loading
        this.googleSignInLoad = false;

        // If it does not exists, redirect to create profile page
        this.$router.replace({ name: "create-profile" });
      }
    },
  },
};
</script>

<style scoped>
</style>