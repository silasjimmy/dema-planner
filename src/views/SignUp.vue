<template>
  <v-card flat class="rounded-lg mx-auto my-8" :width="cardWidth">
    <v-card-title class="justify-center text-h5 text-md-h4 font-weight-bold">{{
      $t("signup.title")
    }}</v-card-title>
    <v-card-subtitle
      class="text-center subtitle-2 text-md-subtitle-1 font-weight-regular"
      >{{ $t("signup.subtitle") }}</v-card-subtitle
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

      <v-form ref="signUpForm" lazy-validation>
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
          :label="$t(`signup.email`)"
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
          :label="$t(`signup.password`)"
          :type="showPassword ? 'text' : 'password'"
        ></v-text-field>

        <!-- Submit button -->
        <v-btn
          rounded
          :loading="emailSignUpLoad"
          @click="emailSignUp"
          color="success"
          class="text-none"
          >{{ $t("signup.btn") }}</v-btn
        >
      </v-form>

      <!-- Log in link -->
      <v-btn text rounded link to="/sign-in" class="text-none mt-4">
        {{ $t("signup.yesacc") }}
        <span class="success--text"> {{ $t("signup.login") }}</span>
      </v-btn>
    </v-card-text>

    <v-card-subtitle
      class="text-center subtitle-2 text-md-subtitle-1 font-weight-regular"
      >{{ $t("signup.alt") }}</v-card-subtitle
    >

    <v-card-actions class="justify-center">
      <!-- Google sign up button -->
      <v-btn
        outlined
        color="grey"
        class="rounded-lg"
        :loading="googleSignUpLoad"
        @click="googleSignUp"
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
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default {
  name: "SignUp",
  title: "Sign up",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      emailSignUpLoad: false,
      googleSignUpLoad: false,
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
    async emailSignUp() {
      if (this.$refs.signUpForm.validate()) {
        try {
          // Start loading
          this.emailSignUpLoad = true;

          const auth = getAuth();

          // Create the user account
          await createUserWithEmailAndPassword(auth, this.email, this.password);

          // Sign out the user
          await signOut(auth);

          // Show success message
          this.actionSuccess = true;
          this.alertMessage = "You will be redirected to log in";
          this.showAlert = true;

          // Redirect to log in
          setTimeout(() => this.$router.replace({ name: "sign-in" }), 1000);
        } catch (error) {
          // Stop loading
          this.emailSignUpLoad = false;

          // Show error message
          this.actionSuccess = false;
          this.alertMessage = error.code;
          this.showAlert = true;
        }
      }
    },
    async googleSignUp() {
      try {
        // Start loading
        this.googleSignUpLoad = true;

        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        // Create user account
        const res = await signInWithPopup(auth, provider);

        // Save the photo url
        localStorage.setItem("imageUrl", res.user.photoURL);

        // Sign out the user
        await signOut(auth);

        // Show success message
        this.actionSuccess = true;
        this.alertMessage = "You will be redirected to log in";
        this.showAlert = true;

        setTimeout(() => this.$router.replace({ name: "sign-in" }), 1000);
      } catch (error) {
        // Stop loading
        this.googleSignUpLoad = false;

        // Show error message
        this.actionSuccess = false;
        this.alertMessage = error.code;
        this.showAlert = true;
      }
    },
  },
};
</script>