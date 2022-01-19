<template>
  <v-row class="text-center b">
    <v-col cols="4" class="mx-auto">
      <h1 class="text-h4 my-4">Get started...</h1>
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
      <v-btn rounded @click="createAccount" color="success" class="text-none"
        >Create account</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    createAccount() {
      console.log(this.email, this.password);

      // const auth = getAuth();
      // createUserWithEmailAndPassword(auth, this.email, this.password)
      //   .then((userCredential) => {
      //     console.log(userCredential)

      //     // Redirect to dashboard
      //     this.$router.push({ path: "dashboard" });
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
    },
  },
};
</script>

<style scoped>
</style>