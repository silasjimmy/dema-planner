<template>
  <v-app>
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
