<template>
  <v-container>
    <v-row align="center" class="text-center">
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
          <!-- Email address field -->
          <v-text-field
            dense
            outlined
            clearable
            rounded
            single-line
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
        </v-form>
        <!-- Email log in button -->
        <v-btn
          rounded
          :loading="emailAuthLoad"
          @click="emailSignIn"
          color="success"
          class="text-none my-4"
          >Log in</v-btn
        >
        <div class="text-center">or</div>
        <!-- Google log in button -->
        <v-btn
          outlined
          rounded
          :loading="googleAuthLoad"
          @click="googleSignIn"
          class="my-4 text-none"
        >
          <v-icon left>mdi-google</v-icon>
          continue in with Google
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { roleRedirect, checkUserProfile } from "../utils";

export default {
  name: "SignIn",
  title: "Log in",
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
    /**
     * Signs in a user by their email and password
     */
    async emailSignIn() {
      if (this.$refs.loginForm.validate()) {
        try {
          this.emailAuthLoad = true;

          // Log in the user
          const auth = getAuth();
          const res = await signInWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );

          // Store user's email address
          this.$store.commit("setUserEmail", res.user.email);
          localStorage.setItem("email", res.user.email);

          // Redirect the user to the dashboard
          await this.redirect();
        } catch (error) {
          this.emailAuthLoad = false;
          this.errorAlert = true;
          this.errorMessage = error.code;
        }
      }
    },
    /**
     * Signs in a user using Google provider
     */
    async googleSignIn() {
      try {
        this.googleAuthLoad = true;

        // Log in the user
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);

        // Store user's email address
        this.$store.commit("setUserEmail", res.user.email);
        localStorage.setItem("email", res.user.email);

        // Redirect the user to the dashboard
        await this.redirect();
      } catch (error) {
        this.googleAuthLoad = false;
        this.errorAlert = true;
        this.errorMessage = error.code;
      }
    },
    /**
     * Handles the profile checking after logging in
     */
    async redirect() {
      try {
        // Check if the user has a profile set up
        const { ...res } = await checkUserProfile(
          localStorage.getItem("email")
        );

        // Stop button loading
        this.emailAuthLoad = false;
        this.googleAuthLoad = false;

        // Redirect to dashboard or create profile page
        if (res.hasProfile)
          this.$router.replace({ name: roleRedirect(res.role) });
        else this.$router.replace({ name: "create-profile" });
      } catch (error) {
        this.emailAuthLoad = false;
        this.googleAuthLoad = false;

        // Show the error
        this.errorAlert = true;
        this.errorMessage = error.code;
      }
    },
  },
};
</script>

<style scoped>
</style>