<template>
  <v-row align="center" class="text-center fill-height">
    <v-col cols="4" class="mx-auto">
      <h1 class="text-h4 font-weight-medium my-4">Welcome back!</h1>
      <v-text-field
        dense
        outlined
        clearable
        rounded
        color="success"
        prepend-icon="mdi-email"
        v-model="email"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        dense
        outlined
        rounded
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => (showPassword = !showPassword)"
        color="success"
        prepend-icon="mdi-lock"
        v-model="password"
        label="Password"
        type="password"
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
      <v-btn rounded @click="login" color="success" class="text-none my-4"
        >Log in</v-btn
      >
      <div class="text-center">or</div>
      <v-btn outlined rounded color="grey darken-3" class="my-4 text-none">
        <v-icon left>mdi-google</v-icon>
        continue in with Google
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignIn",
  title: "Sign in",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);

      //   const auth = getAuth();
      //   signInWithEmailAndPassword(auth, this.email, this.password)
      //     .then((userCredential) => {
      //       console.log(userCredential);

      //       // Redirect to dashboard
      //       this.$router.push({ path: "easter-egg" });
      //     })
      //     .catch((error) => {
      //       console.log(error.message);
      //     });
    },
  },
};
</script>

<style scoped>
</style>