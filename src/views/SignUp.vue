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

export default {
  name: "SignUp",
  title: "Sign up",
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
    emailSignUp() {
      if (this.$refs.signUpForm.validate()) {
        this.emailCreateLoad = true;

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((response) => {
            // Store the user email locally
            localStorage.setItem("userEmail", response.user.email);

            // Set logged in to true
            localStorage.setItem("loggedIn", "true");

            // Direct to create profile page
            this.$router.replace({ name: "create-profile" });
          })
          .catch((error) => {
            this.emailCreateLoad = false;

            this.errorAlert = true;
            this.errorMessage = error.code;
          });
      }
    },
    googleSignUp() {
      this.googleCreateLoad = true;

      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      signInWithPopup(auth, provider)
        .then((response) => {
          // Store the user email locally
          localStorage.setItem("userEmail", response.user.email);

          // Set logged in to true
          localStorage.setItem("loggedIn", "true");

          // Direct to create profile page
          this.$router.replace({ name: "create-profile" });
        })
        .catch((error) => {
          this.googleCreateLoad = false;

          this.errorAlert = true;
          this.errorMessage = error.code;
        });
    },
  },
};
</script>

<style scoped>
</style>