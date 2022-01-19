<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="white">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title> Dema </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn plain link class="text-none" to="/home">Home</v-btn>
      <v-btn plain link class="text-none" to="/sign-in">Log in</v-btn>
      <v-btn plain link class="text-none" to="/sign-up">Sign up</v-btn>
    </v-app-bar>

    <v-main class="b">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.b {
  border: 1px solid black;
}
</style>
