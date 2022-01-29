<template>
  <v-container fluid>
    <v-row align="center" class="my-2 px-4">
      <v-col cols="12">
        <h1 class="text-h4 text-center font-weight-medium">Contact us</h1>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          contain
          height="400px"
          src="../assets/images/contact-us.jpg"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" class="text-center">
        <v-text-field
          dense
          outlined
          color="success"
          prepend-icon="mdi-account"
          label="Name"
        ></v-text-field>
        <v-text-field
          dense
          outlined
          color="success"
          prepend-icon="mdi-email"
          label="Email address"
        ></v-text-field>
        <v-textarea
          dense
          outlined
          color="success"
          prepend-icon="mdi-message"
          label="Message"
        ></v-textarea>
        <v-btn rounded class="text-none" color="success"> Send </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContactUs",
  title: "Contact us",
};
</script>

<style>
</style>