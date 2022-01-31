<template>
  <div>
    <p class="text-center mt-16 text--secondary" v-if="!meals">
      No data available.
    </p>

    <!-- Meal information -->
    <v-list v-if="meals">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-bold text-center"
            >Summary</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <GChart type="PieChart" :data="chartData" :options="chartOptions" />
          </div>
          <div>
            <v-card-text>
              <div
                class="
                  font-weight-bold
                  green--text
                  d-flex
                  justify-space-between
                  align-center
                  py-1
                "
              >
                <span>Proteins</span><span>180g</span>
              </div>
              <div
                class="
                  font-weight-bold
                  orange--text
                  d-flex
                  justify-space-between
                  align-center
                  py-1
                "
              >
                <span>Vitamins</span><span>100g</span>
              </div>
              <div
                class="
                  font-weight-bold
                  blue-grey--text
                  d-flex
                  justify-space-between
                  align-center
                  py-1
                "
              >
                <span>Carbs</span><span>200g</span>
              </div>
              <div
                class="
                  font-weight-bold
                  grey--text
                  text--darken-4
                  d-flex
                  justify-space-between
                  align-center
                  mt-3
                "
              >
                <span>Calories</span><span>1800cal</span>
              </div>
            </v-card-text>
            <v-subheader>Suggested eateries</v-subheader>
            <v-card-text class="pt-0 pb-1">
              <div class="d-flex align-center justify-space-between">
                <span class="subtitle-2 text--primary">Breakfast</span>
                <v-tooltip left class="rounded-lg" color="grey darken-4">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      plain
                      link
                      v-bind="attrs"
                      v-on="on"
                      class="text-none subtitle-2"
                      color="black"
                      >Mr Foxx</v-btn
                    >
                  </template>
                  <v-card elevation="0" width="200px" color="grey darken-4">
                    <v-card-title class="px-1 pt-1 white--text"
                      >Breakfast</v-card-title
                    >
                    <v-card-subtitle class="px-1 pb-1 white--text"
                      >Meal time</v-card-subtitle
                    >
                    <v-card-text class="px-1 py-2 white--text">
                      <div>1 Chapati - 10</div>
                      <div>1 Meat stew - 50</div>
                      <div>1 Banana - 10</div>
                    </v-card-text>
                    <v-divider class="grey"></v-divider>
                    <v-card-text class="px-2 py-2 white--text">
                      <div>Total: 70</div>
                    </v-card-text>
                  </v-card>
                </v-tooltip>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="subtitle-2 text--primary">Lunch</span>
                <v-btn
                  plain
                  link
                  class="text-none subtitle-2"
                  color="black"
                  to="/#"
                  >Mr Foxx</v-btn
                >
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="subtitle-2 text--primary">Dinner</span>
                <v-btn
                  plain
                  link
                  class="text-none subtitle-2"
                  color="black"
                  to="/#"
                  >Mr Foxx</v-btn
                >
              </div>
            </v-card-text>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapState } from "vuex";

export default {
  name: "MealsInfo",
  data() {
    return {
      chartData: [
        ["Nutrient", "Amount"],
        ["Proteins", 180],
        ["Carbohydrates", 200],
        ["Vitamins", 100],
      ],
      chartOptions: {
        chartArea: {
          top: 0,
          bottom: 0,
        },
        colors: ["#4CAF50", "#607D8B", "#FF9800"],
        legend: {
          position: "none",
        },
      },
    };
  },
  computed: {
    ...mapState(["meals"]),
  },
  components: {
    GChart,
  },
};
</script>

<style scoped>
</style>