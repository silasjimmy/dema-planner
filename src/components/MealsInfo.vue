<template>
  <v-card flat>
    <v-card-title class="justify-center">Summary</v-card-title>
    <v-card-subtitle
      class="text-center text--primary font-weight-regular subtitle-1 py-2"
    >
      Nutritional content
    </v-card-subtitle>

    <!-- Load meals -->
    <data-loader
      :show="loadingData"
      :message="loadingDataMessage"
      :success="loadingDataSuccess"
    ></data-loader>

    <v-card-text v-if="!loadingData">
      <v-subheader class="justify-center" v-if="meals.length === 0">
        No data available
      </v-subheader>

      <div v-if="meals.length > 0">
        <GChart type="PieChart" :data="chartData" :options="chartOptions" />

        <div class="d-flex align-center green--text font-weight-medium">
          <span>Proteins</span>
          <v-spacer></v-spacer>
          <span>{{ proteins }}g</span>
        </div>

        <div
          class="d-flex align-center my-1 blue-grey--text font-weight-medium"
        >
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
      </div>
    </v-card-text>

    <v-divider class="mb-2"></v-divider>

    <v-card-subtitle
      class="text-center text--primary font-weight-regular subtitle-1 py-2"
    >
      Sugessted eateries
    </v-card-subtitle>

    <!-- Load suggested eateries -->
    <data-loader
      :show="loadingData"
      :message="loadingDataMessage"
      :success="loadingDataSuccess"
    ></data-loader>

    <v-card-text v-if="!loadingData">
      <v-subheader class="justify-center" v-if="suggestedEateries.length === 0">
        No suggested eateries found
      </v-subheader>

      <v-list class="py-0" two-line v-if="suggestedEateries.length > 0">
        <v-list-item
          class="px-0"
          v-for="(eatery, index) in suggestedEateries"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title>{{ eatery.mealName }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ eatery.eateryName }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-tooltip
              left
              :open-on-hover="false"
              color="transparent"
              v-model="eateryTooltips[index]"
            >
              <template v-slot:activator="{}">
                <v-btn icon @click="openTooltip(index)">
                  <v-icon size="18px"> mdi-information </v-icon>
                </v-btn>
              </template>
              <v-simple-table dense dark>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="food in eatery.foods" :key="food.name">
                      <td>{{ food.name }}</td>
                      <td>{{ food.cost }}</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>100</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";
import DataLoader from "@/components/DataLoader.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "MealsInfo",
  async created() {
    try {
      if (this.meals.length === 0) await this.getMealsAction();
      if (this.suggestedEateries.length === 0)
        await this.getSuggestedEateriesAction();

      this.loadingDataSuccess = true;
    } catch (error) {
      this.loadingDataSuccess = false;
      this.loadingDataMessage = error.code;
    } finally {
      setTimeout(() => (this.loadingData = false), 1000);
    }
  },
  data() {
    return {
      loadingData: true,
      loadingDataSuccess: true,
      loadingDataMessage: "Loading...",
      eateryTooltips: [],
      tooltipAction: [],
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
    ...mapActions(["getSuggestedEateriesAction", "getMealsAction"]),
    openTooltip(index) {
      this.eateryTooltips = this.suggestedEateries.map(() => false);
      this.$set(this.eateryTooltips, index, true);
    },
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
  watch: {
    "$store.state.suggestedEateries": function (eateries) {
      this.eateryTooltips = eateries.map(() => false);
    },
  },
  components: {
    GChart,
    DataLoader,
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>