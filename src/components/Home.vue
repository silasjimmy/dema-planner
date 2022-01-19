<template>
  <v-container>
    <h1 class="text-h5 my-4 text-center">Welcome to Dema!</h1>
    <v-row class="text-center">
      <v-col cols="6" class="mx-auto">
        <v-text-field
          dense
          outlined
          clearable
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
          color="success"
          prepend-icon="mdi-lock"
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>
        <v-btn @click="login" color="success" class="text-none">Log in</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);

      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log(userCredential);

          // Redirect to dashboard
          this.$router.push({ path: "easter-egg" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>
