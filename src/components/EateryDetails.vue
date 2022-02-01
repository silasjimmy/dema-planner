<template>
  <v-container fluid class="b">
    <v-row class="b">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-row>
    <v-row class="b">
      <v-col cols="5">
        <v-img class="b" height="200px"></v-img>
      </v-col>
      <v-col cols="7" align-self="end">
        <div class="b">
          <h1>Eatery name</h1>
          <h2>Eatery bio</h2>
          <h3>Eatery rating</h3>
        </div>
      </v-col>
      <v-col cols="5">
        <v-list two-line class="py-0">
          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-map-marker </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Address</v-list-item-title>
              <v-list-item-subtitle>City, Country</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-email </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>name@domain.com</v-list-item-title>
              <v-list-item-subtitle>Email address</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-phone </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>+0 000 000 000</v-list-item-title>
              <v-list-item-subtitle>Phone number</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>www.domainname.com</v-list-item-title>
              <v-list-item-subtitle>Website</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-btn block>
              <v-icon left>mdi-message-text</v-icon>
              Send a message
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="7">
        <div class="b">
          <h1>Menu</h1>
        </div>
        <div class="b text-center">
          <p>You have meals today in this restaurant</p>
          <v-btn>Reserve a seat</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EateryDetails",
  title: "Details",
};
</script>

<style>
</style>