<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- Load bookings -->
      <data-loader
        :show="loadingData"
        :message="loadingDataMessage"
        :success="loadingDataSuccess"
      ></data-loader>

      <v-data-table
        show-expand
        single-expand
        :expanded.sync="expanded"
        v-if="!loadingData"
        :items-per-page="5"
        :headers="headers"
        :items="eateryBookings"
        :search="searchBooking"
        sort-by="name"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-0">
            <v-simple-table dense dark>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Time</th>
                    <th class="text-center">Foods</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-center"
                    v-for="(meal, index) in item.meals"
                    :key="index"
                  >
                    <td>{{ formatTime(meal.time) }}</td>
                    <td>{{ meal.foods.join(", ") }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DataLoader from "@/components/DataLoader.vue";

export default {
  name: "Bookings",
  title: "Bookings",
  async created() {
    try {
      this.loadingData = true;

      if (this.eateryBookings.length === 0)
        await this.getEateryBookingsAction();
    } catch (error) {
      this.loadingDataMessage = error.code;
      this.loadingDataSuccess = false;
    } finally {
      this.loadingData = false;
    }
  },
  data() {
    return {
      loadingData: false,
      loadingDataMessage: "Loading bookings...",
      loadingDataSuccess: true,
      searchBooking: "",
      expanded: [],
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  computed: {
    ...mapState(["eateryBookings"]),
  },
  methods: {
    ...mapActions(["getEateryBookingsAction"]),
    formatTime(timeString) {
      const date = new Date("1970-01-01 " + timeString);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  components: {
    DataLoader,
  },
};
</script>