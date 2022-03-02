<template>
  <v-card flat>
    <v-card-subtitle v-if="meals.length === 0"
      >No data available</v-card-subtitle
    >

    <v-card-title class="justify-center" v-if="meals.length > 0"
      >Summary</v-card-title
    >
    <v-card-subtitle class="text-center pb-0" v-if="meals.length > 0"
      >Nutritional content</v-card-subtitle
    >

    <!-- Chart -->
    <v-card-text v-if="meals.length > 0">
      <GChart type="PieChart" :data="chartData" :options="chartOptions" />

      <div class="d-flex align-center green--text font-weight-medium">
        <span>Proteins</span>
        <v-spacer></v-spacer>
        <span>{{ proteins }}g</span>
      </div>

      <div class="d-flex align-center my-1 blue-grey--text font-weight-medium">
        <span>Carbohydrates</span>
        <v-spacer></v-spacer>
        <span>{{ carbohydrates }}g</span>
      </div>

      <div class="d-flex align-center orange--text font-weight-medium">
        <span>Vitamins</span>
        <v-spacer></v-spacer>
        <span>{{ vitamins }}g</span>
      </div>

      <div class="d-flex align-center mt-2 text--primary font-weight-bold">
        <span>Calories</span>
        <v-spacer></v-spacer>
        <span>{{ calories }} cal</span>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <!-- Eateries suggestions -->
    <v-list subheader two-line>
      <v-subheader>Suggested eateries</v-subheader>
      <v-list-item v-for="(eatery, index) in suggestedEateries" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ eatery.mealName }}</v-list-item-title>
          <v-list-item-subtitle>{{ eatery.eateryName }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon size="18px"> mdi-information </v-icon>
              </v-btn>
            </template>
            <div class="b text-center">
              <v-btn
                plain
                small
                link
                :to="`/nearest-eateries/${eatery.eateryId}`"
                >view eatery</v-btn
              >
            </div>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "MealsInfo",
  async created() {
    if (this.suggestedEateries.length === 0)
      await this.getSuggestedEateriesAction();
  },
  data() {
    return {
      chartOptions: {
        chartArea: {
          top: 0,
          bottom: 0,
        },
        tooltip: {
          showColorCode: true,
          text: "value",
        },
        backgroundColor: "transparent",
        colors: ["#4CAF50", "#607D8B", "#FF9800"],
        legend: {
          position: "none",
        },
      },
    };
  },
  methods: {
    ...mapActions(["getSuggestedEateriesAction"]),
  },
  computed: {
    ...mapState(["meals", "suggestedEateries"]),
    ...mapGetters(["calculateNutrientContent", "calculateCaloricContent"]),
    chartData() {
      return [
        ["Nutrient", "Amount"],
        ["Proteins", this.calculateNutrientContent("protein")],
        ["Carbohydrates", this.calculateNutrientContent("carbohydrate")],
        ["Vitamins", this.calculateNutrientContent("vitamin")],
      ];
    },
    proteins() {
      return this.calculateNutrientContent("protein");
    },
    carbohydrates() {
      return this.calculateNutrientContent("carbohydrate");
    },
    vitamins() {
      return this.calculateNutrientContent("vitamin");
    },
    calories() {
      return this.calculateCaloricContent();
    },
  },
  components: {
    GChart,
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>