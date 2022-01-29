<template>
  <v-container fluid>
    <v-row align="center" class="my-8 px-4">
      <v-col cols="12">
        <h1 class="text-center text-h4 font-weight-medium">About us</h1>
      </v-col>
      <v-col cols="6">
        <p class="my-0">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed ad saepe
          animi repellat quo, eum quas dolorem ut? Cupiditate eligendi maxime
          temporibus et, velit ipsam repellat. Non voluptas iste itaque?
        </p>
      </v-col>
      <v-col cols="6">
        <v-img height="400px" class="b"></v-img>
      </v-col>
    </v-row>
    <v-row class="my-8 px-4">
      <v-col cols="12">
        <h1 class="text-center text-h4 font-weight-medium">Our mission</h1>
      </v-col>
      <v-col cols="12">
        <p class="my-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum sunt
          iste sint autem nulla, adipisci vitae facere, consectetur perspiciatis
          officia officiis repellat saepe rem commodi porro, architecto culpa
          quam eveniet.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center text-h4 font-weight-medium">Meet the team</h1>
      </v-col>
      <v-col cols="12" class="b">
        <v-card outlined width="250px" class="rounded-lg mx-auto my-2">
          <v-img
            src="../assets/images/silas-jimmy.jpg"
            class="d-flex align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.8)"
          >
            <div class="white--text">
              <v-card-title class="text-capitalize">silas jimmy</v-card-title>
              <v-card-subtitle>CEO & Founder</v-card-subtitle>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutUs",
  title: "About us",
};
</script>

<style>
</style>