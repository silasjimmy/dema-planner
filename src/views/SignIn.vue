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
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { roleRedirect } from "../utils";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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
    emailSignIn() {
      if (this.$refs.loginForm.validate()) {
        this.emailAuthLoad = true;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((response) => {
            this.$store.commit("setUserEmail", response.user.email);
            localStorage.setItem("email", response.user.email);
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
          this.$store.commit("setUserEmail", response.user.email);
          localStorage.setItem("email", response.user.email);
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
      const profile = await getDoc(
        doc(db, "users", this.$store.state.userEmail)
      );

      if (profile.exists()) {
        this.emailAuthLoad = false;
        this.googleAuthLoad = false;

        const profileData = profile.data();

        // Update user logged in state and role
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", profileData.role);

        this.$store.commit("setLoggedIn", true);
        this.$store.commit("setUserRole", profileData.role);

        // Set the user profile
        this.$store.commit("setUserProfile", profileData);

        // Set the dashboard links
        this.$store.commit("setDashboardLinks", localStorage.getItem("role"));

        // Redirect to requested page or default dashboard page
        this.$router.replace(
          this.$route.query.redirect || `/${roleRedirect(profileData.role)}`
        );
      } else {
        this.$router.replace({ name: "create-profile" });
      }
    },
  },
};
</script>

<style scoped>
</style>