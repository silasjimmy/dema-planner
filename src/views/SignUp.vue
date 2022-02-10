<template>
  <v-row align="center" class="text-center fill-height">
    <v-col cols="10" sm="8" md="6" lg="4" xl="3" class="mx-auto my-2">
      <h1 class="text-h4 font-weight-medium my-4">Get started</h1>
      <v-form ref="signUpForm" lazy-validation>
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
          rounded
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
      <v-btn
        rounded
        :loading="emailCreateLoad"
        @click="emailSignUp"
        color="success"
        class="text-none my-4"
        >Create account</v-btn
      >
      <div class="text-center">or</div>
      <v-btn
        outlined
        rounded
        :loading="googleCreateLoad"
        @click="googleSignUp"
        color="grey darken-3"
        class="my-4 text-none"
      >
        <v-icon left>mdi-google</v-icon>
        sign up in with Google
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { roleRedirect, checkUserProfile } from "../utils";

export default {
  name: "SignUp",
  title: "Create account",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      emailCreateLoad: false,
      googleCreateLoad: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      errorAlert: false,
      errorMessage: "",
    };
  },
  methods: {
    /**
     * Signs up a user using email and password
     */
    async emailSignUp() {
      if (this.$refs.signUpForm.validate()) {
        try {
          this.emailCreateLoad = true;

          // Create the user account
          const auth = getAuth();
          const res = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );

          // Store user's email address
          localStorage.setItem("email", res.user.email);
          this.$store.commit("setUserEmail", res.user.email);

          // Redirect according to user profile existence
          this.redirect();
        } catch (error) {
          this.emailCreateLoad = false;
          this.errorAlert = true;
          this.errorMessage = error.code;
        }
      }
    },
    /**
     * Signs up a user using Google provider
     */
    async googleSignUp() {
      try {
        this.googleCreateLoad = true;

        // Create user account
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const res = await signInWithPopup(auth, provider);

        // Store user's email address
        localStorage.setItem("email", res.user.email);
        this.$store.commit("setUserEmail", res.user.email);

        // Redirect according to user profile existence
        this.redirect();
      } catch (error) {
        this.googleCreateLoad = false;
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
        this.emailCreateLoad = false;
        this.googleCreateLoad = false;

        // Redirect according to role
        if (res.hasProfile)
          this.$router.replace({ name: roleRedirect(res.role) });
        else this.$router.replace({ name: "create-profile" });
      } catch (error) {
        this.emailCreateLoad = false;
        this.googleCreateLoad = false;

        // Show the error
        this.errorAlert = true;
        this.errorMessage = error.code;
      }
    },
  },
};
</script>