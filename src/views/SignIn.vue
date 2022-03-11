<template>
  <v-sheet class="d-flex flex-column align-center justify-center" height="100%">
    <v-card flat class="rounded-lg mx-auto" :width="cardWidth">
      <v-card-title class="justify-center text-h5 text-md-h4 font-weight-bold"
        >Welcome back!</v-card-title
      >
      <v-card-subtitle
        class="text-center subtitle-2 text-md-subtitle-1 font-weight-regular"
        >Log in to continue</v-card-subtitle
      >

      <v-card-text class="text-center py-2">
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

          <!-- Forgot password link -->
          <div class="pb-4 d-none">
            <v-btn text color="success" class="text-none"
              >Forgot password?</v-btn
            >
          </div>

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

        <!-- Create account link -->
        <v-btn text rounded link to="/sign-up" class="text-none mt-4">
          No account?
          <span class="success--text"> Create one</span>
        </v-btn>
      </v-card-text>

      <v-card-subtitle
        class="text-center subtitle-2 text-md-subtitle-1 font-weight-regular"
        >or log in with...</v-card-subtitle
      >

      <v-card-actions class="justify-center">
        <!-- Google sign up button -->
        <v-btn
          outlined
          color="grey"
          class="rounded-lg"
          :loading="googleSignInLoad"
          @click="googleSignIn"
        >
          <v-img
            width="20px"
            height="20px"
            src="../assets/icons/google.svg"
          ></v-img>
          <span class="text-capitalize grey--text text--darken-4 ml-2"
            >Google</span
          >
        </v-btn>
      </v-card-actions>
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
import { roleRedirect } from "../utils";

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
          return "45vw";
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
    ...mapActions(["getProfileAction"]),
    async emailSignIn() {
      if (this.$refs.loginForm.validate()) {
        try {
          // Start loading
          this.emailSignInLoad = true;

          const auth = getAuth();

          // Log in the user
          await signInWithEmailAndPassword(auth, this.email, this.password);

          // Stop loading
          this.emailSignInLoad = false;

          // Start loading page
          this.$store.commit("setPageLoading", true);

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
    async googleSignIn() {
      try {
        // Start loading
        this.googleSignInLoad = true;

        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        // Log in the user
        await signInWithPopup(auth, provider);

        // Stop loading
        this.googleSignInLoad = false;

        // Start loading page
        this.$store.commit("setPageLoading", true);

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
    async redirect() {
      // Fetch user profile
      await this.getProfileAction();

      // Redirect based on if the profile exists
      if (this.$store.state.profile)
        this.$router.replace({
          name: roleRedirect(this.$store.state.profile.role),
        });
      else this.$router.replace({ name: "create-profile" });
    },
  },
};
</script>
