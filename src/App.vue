<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="white">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title> Dema </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn plain rounded link class="text-none" to="/home">Home</v-btn>
      <v-btn plain rounded link class="text-none" to="/sign-in">Log in</v-btn>
      <v-btn plain rounded link class="text-none" to="/sign-up">Sign up</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app absolute padless>
      <v-row justify="center" align="center" no-gutters>
        <v-btn text rounded class="my-2 text-none"> Home </v-btn>
        <v-col class="pa-2 d-flex align-center" cols="12">
          <v-btn link plain class="text-none">Terms & Conditions</v-btn>
          <v-spacer></v-spacer>
          <span>{{ new Date().getFullYear() }} — <strong>Dema</strong></span>
          <v-spacer></v-spacer>
          <span>All rights reserved.</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",
  created() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Store the user email locally
        localStorage.setItem("userEmail", user.email);

        // Set logged in to true
        localStorage.setItem("loggedIn", "true");
      } else {
        // Remove user email from local storage
        localStorage.removeItem("userEmail");

        // Set logged in to false
        localStorage.setItem("loggedIn", "false");
      }
    });
  },
};
</script>

<style>
.b {
  border: 1px solid black;
}
</style>
