<template>
  <v-card flat>
    <v-card-title class="justify-center">Summary</v-card-title>
    <v-card-subtitle
      class="text-center text--primary font-weight-regular subtitle-1 py-2"
    >
      Ratings
    </v-card-subtitle>
    <v-card-text class="text-center">
      <v-rating
        readonly
        :value="0"
        color="orange"
        background-color="orange--text"
      ></v-rating>
      <span>0 stars</span>
    </v-card-text>

    <v-divider class="mb-2"></v-divider>

    <v-card-subtitle
      class="text-center text--primary font-weight-regular subtitle-1 py-2"
    >
      Foods
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column justify-center align-center">
      <span class="text-h3 text--primary">{{ menu.length }}</span>
      <span>foods in my menu</span>
    </v-card-text>

    <v-divider class="mb-2"></v-divider>

    <v-card-subtitle
      class="text-center text--primary font-weight-regular subtitle-1 py-2"
    >
      Bookings
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column justify-center align-center">
      <span class="text-h3 text--primary">{{ eateryBookings.length }}</span>
      <span>bookings today</span>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "EaterySummary",
  async created() {
    if (this.menu.length === 0) await this.getMenuAction();
    if (this.eateryBookings.length === 0) await this.getEateryBookingsAction();
  },
  computed: {
    ...mapState(["menu", "eateryBookings"]),
  },
  methods: {
    ...mapActions(["getMenuAction", "getEateryBookingsAction"]),
  },
};
</script>