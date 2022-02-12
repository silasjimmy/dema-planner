<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8" class="mx-auto">
        <!-- <p class="text--secondary text-center">Eateries around location.</p> -->
        <p class="text--secondary text-center">No data available</p>
      </v-col>
      <v-col v-for="eatery in eateries" :key="eatery.name" cols="12" lg="6">
        <v-card outlined class="rounded-lg">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title
                class="text-capitalize font-weight-bold jost-font-family"
                >{{ eatery.name }}</v-list-item-title
              >
              <v-list-item-subtitle class="text-capitalize"
                >{{ eatery.city }}, {{ eatery.country }}</v-list-item-subtitle
              >
              <v-list-item-subtitle class="d-flex align-center">
                <v-rating
                  :value="eatery.ratings"
                  background-color="grey"
                  color="orange"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <span class="caption ml-4">{{ eatery.ratings }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              tile
              class="rounded-lg"
              color="grey"
              width="80px"
              height="70px"
            >
              <v-img :src="eatery.image"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              link
              plain
              disabled
              :to="{ name: 'eatery-details', params: { id: eatery.id } }"
              >More info</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  title: "Nearest eateries",
  name: "NearestEateries",
  created() {
    // Load all eateries to the store
    this.getEateriesAction();
  },
  computed: {
    ...mapState(["eateries"]),
  },
  methods: {
    ...mapActions(["getEateriesAction"]),
  },
};
</script>

<style scoped>
</style>