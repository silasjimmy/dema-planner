<template>
  <v-container fluid>
    <!-- Back button -->
    <v-card outlined class="rounded-lg">
      <v-card-title>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Eatery details -->
      <v-card-text class="py-0">
        <v-container>
          <v-row>
            <!-- Eatery image -->
            <v-col cols="12" lg="5">
              <!-- <v-img :src="eatery.image" class="rounded-lg" height="200px"></v-img> -->
              <v-img
                class="rounded-lg"
                height="200px"
                src="https://images.unsplash.com/photo-1608495368297-de9ff48e6997?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
              ></v-img>
            </v-col>

            <v-col cols="12" lg="7" align-self="end" class="text--primary">
              <div class="text-center text-lg-left">
                <!-- Eatery name -->
                <h1 class="font-weight-medium text-h5 text-capitalize">
                  {{ eatery.name }}
                </h1>

                <!-- Eatery ratings -->
                <div
                  class="
                    my-2
                    d-flex
                    align-center
                    justify-center justify-lg-start
                  "
                >
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

                <!-- Eatery bio -->
                <p class="blockquote pl-0 py-0">
                  {{ eatery.bio }}
                </p>
              </div>
            </v-col>

            <v-col cols="12" lg="5" class="mx-auto mx-lg-0">
              <v-list two-line class="py-0">
                <!-- Location -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-map-marker </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Location</v-list-item-title>
                    <v-list-item-subtitle class="text-capitalize"
                      >{{ eatery.city }},
                      {{ eatery.country }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <!-- Email -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-email </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Email address</v-list-item-title>
                    <v-list-item-subtitle>{{
                      eatery.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- Phone number -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-phone </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Phone number</v-list-item-title>
                    <v-list-item-subtitle>{{
                      eatery.phoneNumber
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- Website -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-web</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Website</v-list-item-title>
                    <v-list-item-subtitle>{{
                      eatery.website
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <!-- Send message button -->
                <v-list-item>
                  <v-btn block text rounded color="success">
                    <v-icon left>mdi-message-text</v-icon>
                    Send a message
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-col>

            <!-- <v-col cols="12" lg="7">
        <div class="b">
          <h1>Menu</h1>
        </div>
        <div class="b text-center">
          <p>You have meals today in this restaurant</p>
          <v-btn>Reserve a seat</v-btn>
        </div>
      </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EateryDetails",
  title: "Eatery details",
  async created() {
    // Load the eateries to the store first if list is empty
    if (this.$store.state.eateries.length === 0) await this.getEateriesAction();

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