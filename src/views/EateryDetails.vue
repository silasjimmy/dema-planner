<template>
  <v-container fluid>
    <v-row>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" lg="5">
        <v-img :src="eatery.image" class="rounded-lg" height="200px"></v-img>
      </v-col>
      <v-col cols="12" lg="7" align-self="end">
        <div class="text-center text-lg-left">
          <h1 class="font-weight-medium text-h5 text-capitalize">
            {{ eatery.name }}
          </h1>
          <div class="my-2 d-flex align-center justify-center justify-lg-start">
            <v-rating
              :value="eatery.ratings"
              background-color="grey"
              color="orange"
              dense
              half-increments
              readonly
              size="20"
            ></v-rating>
            <span class="subtitle-2 ml-4">({{ eatery.ratings }})</span>
          </div>
          <p class="blockquote pl-0 py-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias modi
            obcaecati ducimus voluptate.
          </p>
        </div>
      </v-col>
      <v-col cols="9" lg="5" class="mx-auto mx-lg-0">
        <v-list two-line class="py-0">
          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-map-marker </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Location</v-list-item-title>
              <v-list-item-subtitle>City, Country</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-email </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Email address</v-list-item-title>
              <v-list-item-subtitle>name@domain.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-phone </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Phone number</v-list-item-title>
              <v-list-item-subtitle>+0 000 000 000</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-web</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Website</v-list-item-title>
              <v-list-item-subtitle>www.domainname.com</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-btn block color="success">
              <v-icon left>mdi-message-text</v-icon>
              Send a message
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" lg="7">
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EateryDetails",
  title: "Eatery details",
  created() {
    // Load the eateries to the store first if list is empty
    if (this.$store.state.eateries.length === 0) this.getEateriesAction();

    // Retrieve the eatery with the specified id
    this.eatery = this.getEateryById(this.id);
  },
  data() {
    return {
      eatery: "",
    };
  },
  computed: {
    ...mapGetters(["getEateryById"]),
  },
  methods: {
    ...mapActions(["getEateriesAction"]),
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
</style>