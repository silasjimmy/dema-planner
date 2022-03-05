<template>
  <v-container>
    <v-card flat>
      <v-card-text class="text--primary">
        <v-container class="pa-0">
          <v-row no-gutters align="center">
            <v-col cols="6" class="d-flex">
              <div class="text-center">
                <h1 class="text-h6 text-uppercase font-weight-light">
                  {{ weekday }}
                </h1>
                <h1 class="text-h3 font-weight-bold">{{ day }}</h1>
                <h2 class="subtitle-1 font-weight-regular">
                  {{ monthAndYear }}
                </h2>

                <!-- Date picker -->
                <!-- <v-menu
                    offset-y
                    v-model="datePickerMenu"
                    transition="scale-transition"
                    ref="dateMenu"
                    :return-value.sync="mealsDate"
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        class="mx-1"
                        :disabled="!meals"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-calendar</v-icon>
                      </v-btn>
                    </template>

                    <v-date-picker
                      v-if="datePickerMenu"
                      v-model="mealsDate"
                      header-color="blue-grey"
                      color="green"
                      show-current="false"
                    >
                      <v-btn
                        text
                        color="red"
                        class="font-weight-bold"
                        @click="datePickerMenu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="orange"
                        class="font-weight-bold"
                        @click="$refs.dateMenu.save(mealsDate)"
                      >
                        Ok
                      </v-btn>
                    </v-date-picker>
                  </v-menu> -->
              </div>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-tooltip left color="black">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    small
                    disabled
                    :loading="loadingRegenerate"
                    elevation="1"
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                    @click="regenerateMeals"
                  >
                    <v-icon>mdi-rotate-right</v-icon>
                  </v-btn>
                </template>
                <span>Regenerate all meals</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Load meals -->
      <data-loader
        :show="loadingData"
        :message="loadingDataMessage"
        :success="loadingDataSuccess"
      ></data-loader>

      <v-card-text v-if="!loadingData">
        <!-- No meals message -->
        <div class="text-center" v-if="meals.length === 0">
          <p class="subtitle-1">
            It seems you don't have meals for today. Click generate to
            automatically create a meal plan. Don't worry, we know what you
            like...
          </p>
          <v-btn
            rounded
            :loading="generatingMeals"
            @click="generateMeals"
            color="success"
          >
            <v-icon left>mdi-rotate-right</v-icon>
            Generate
          </v-btn>
        </div>

        <!-- User meals -->
        <v-container class="pa-0" v-if="meals.length > 0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="6"
              xl="4"
              v-for="(meal, index) in meals"
              :key="meal.id"
            >
              <v-card outlined class="rounded-lg">
                <div class="d-flex align-center justify-space-between pr-4">
                  <!-- Meal name and time -->
                  <div>
                    <v-card-title class="pt-2">{{ meal.name }}</v-card-title>
                    <v-card-subtitle class="pb-2">{{
                      formatTime(meal.time)
                    }}</v-card-subtitle>
                  </div>

                  <!-- Dropdown menu -->
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                  <!-- <v-menu offset-x left transition="slide-y-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item link @click="regenerateMeal(meal.id)">
                            <v-list-item-title class="font-weight-light"
                              >Regenerate this meal</v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu> -->
                </div>

                <v-card-text class="d-flex align-center py-2">
                  <!-- Meal image -->
                  <v-img
                    class="rounded-lg mr-2"
                    width="50"
                    max-width="50"
                    height="50"
                    :src="meal.image"
                  ></v-img>

                  <!-- Meal foods -->
                  <div class="food-names subtitle-1 text--primary">
                    <span v-for="food in meal.foods" :key="food.name">{{
                      food.name
                    }}</span>
                  </div>
                </v-card-text>

                <v-card-actions class="px-4">
                  <!-- Ate meal checkbox -->
                  <v-checkbox
                    hide-details
                    dense
                    @change="ateMeal(meal)"
                    v-model="meal.ate"
                    label="I ate this meal"
                    color="green"
                    class="pt-0"
                  ></v-checkbox>

                  <v-spacer></v-spacer>

                  <!-- View servings button -->
                  <v-btn icon @click="$set(servingsReveal, index, true)">
                    <v-icon>mdi-chevron-up</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <v-card
                    flat
                    v-if="servingsReveal[index]"
                    class="
                      transition-fast-in-fast-out
                      v-card--revealServings
                      rounded-lg
                      overflow-auto
                    "
                    height="100%"
                  >
                    <v-card-title class="py-2">
                      <span>Servings</span>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="$set(servingsReveal, index, false)">
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </v-card-title>

                    <v-card-text class="overflow-auto py-0">
                      <div
                        v-for="food in meal.foods"
                        :key="food.name"
                        class="d-flex align-center my-1 px-4"
                      >
                        <span class="text-capitalize text--primary">{{
                          food.name
                        }}</span>
                        <v-spacer></v-spacer>
                        <span>{{ food.serving }}</span>
                      </div>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                      <v-dialog
                        persistent
                        v-model="servingsDialog[index]"
                        width="400"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            rounded
                            v-bind="attrs"
                            v-on="on"
                            color="success"
                          >
                            Edit
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title>
                            <span>Edit food servings</span>
                            <v-spacer></v-spacer>
                            <v-btn
                              icon
                              @click="$set(servingsDialog, index, false)"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-card-title>

                          <v-divider></v-divider>

                          <v-card-text class="py-0">
                            <v-text-field
                              outlined
                              dense
                              hide-spin-buttons
                              hide-details
                              class="my-4"
                              v-for="food in meal.foods"
                              :key="food.name"
                              :label="food.name"
                              v-model="food.serving"
                              color="green"
                              type="number"
                            ></v-text-field>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions class="justify-center">
                            <v-btn
                              text
                              rounded
                              color="success"
                              @click="saveServings(meal, index)"
                            >
                              save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-expand-transition>

                <!-- Meal load overlay -->
                <v-fade-transition>
                  <v-overlay
                    absolute
                    z-index="0"
                    :opacity="1"
                    color="green lighten-5"
                    :value="loadingRegenerate"
                  >
                    <v-progress-circular
                      indeterminate
                      size="64"
                      width="3"
                      color="success"
                    ></v-progress-circular>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <!-- Action toast -->
    <toast
      :show="showToast"
      :message="toastMessage"
      :success="actionSuccess"
      @close="showToast = false"
    ></toast>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { generateMeal, suggestEatery } from "../utils";
import Toast from "@/components/Toast.vue";
import DataLoader from "@/components/DataLoader.vue";

export default {
  title: "Meal planner",
  name: "MealPlanner",
  async created() {
    try {
      this.loadingData = true;
      if (this.$store.state.eateries.length === 0)
        await this.getEateriesAction();
      if (this.meals.length === 0) await this.getMealsAction();
      if (this.availableFoods.length === 0)
        await this.getAvailableFoodsAction();
      if (this.allMenus.length === 0) await this.setAllMenusAction();
    } catch (error) {
      this.loadingDataMessage = error.code;
      this.loadingDataSuccess = false;
    } finally {
      setTimeout(() => (this.loadingData = false), 1000);
    }
  },
  data() {
    return {
      loadingData: false,
      loadingDataMessage: "Checking your meals...",
      loadingDataSuccess: true,
      actionSuccess: false,
      toastMessage: "",
      showToast: false,
      generatingMeals: false,
      loadingRegenerate: false,
      datePickerMenu: false,
      servingsDialog: [],
      servingsReveal: [],
      mealsDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  computed: {
    ...mapState(["meals", "availableFoods", "settings", "allMenus"]),
    ...mapGetters(["getFoodsByNutrient"]),
    monthAndYear() {
      return new Date(this.mealsDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    },
    weekday() {
      return new Date(this.mealsDate).toLocaleDateString("en-US", {
        weekday: "long",
      });
    },
    day() {
      return new Date(this.mealsDate).toLocaleDateString("en-US", {
        day: "numeric",
      });
    },
  },
  methods: {
    ...mapActions([
      "getAvailableFoodsAction",
      "getMealsAction",
      "deleteMealAction",
      "addMealAction",
      "updateMealAction",
      "saveAteMealAction",
      "setAllMenusAction",
      "getEateriesAction",
      "addSuggestedEateryAction",
      "deleteSuggestedEateryAction",
    ]),
    formatTime(timeString) {
      const date = new Date("1970-01-01 " + timeString);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    async generateMeals() {
      this.generatingMeals = true;

      try {
        for (let i = 0; i < this.settings.mealTimes.length; i++) {
          // Create the meals
          const meal = generateMeal(
            this.availableFoods,
            this.settings.mealTimes[i]
          );

          // Uplaod the generated meal to the database
          await this.addMealAction(meal);

          // Search for eatery
          const findEatery = suggestEatery(meal, this.allMenus);

          // Save the search details if found
          if (findEatery) await this.addSuggestedEateryAction(findEatery);
        }

        this.toastMessage = "Meals created successfully!";
        this.actionSuccess = true;
      } catch (error) {
        this.toastMessage = error.message;
        this.actionSuccess = false;
      } finally {
        this.generatingMeals = false;
        this.showToast = true;
      }
    },
    async regenerateMeals() {
      this.loadingRegenerate = true;

      const mealsCopy = [...this.meals];

      // First delete all the meals that exists
      for (let mealIndex = 0; mealIndex < mealsCopy.length; mealIndex++) {
        try {
          await this.deleteMealAction(mealsCopy[mealIndex]);
          // await this.deleteSuggestedEateryAction(mealsCopy[mealIndex]);
        } catch (error) {
          this.loadingRegenerate = false;
          this.toastMessage = error.code;
          this.actionSuccess = false;
          this.showToast = true;
          return;
        }
      }

      // Then create new meals
      for (let index = 0; index < this.settings.mealTimes.length; index++) {
        try {
          const meal = generateMeal(
            this.availableFoods,
            this.settings.mealTimes[index]
          );

          // Uplaod the generated meal to the database
          await this.addMealAction(meal);

          // Find an eatery
          const findEatery = suggestEatery(meal, this.allMenus);
          if (findEatery) await this.addSuggestedEateryAction(findEatery);
        } catch (error) {
          this.toastMessage = error.code;
          this.actionSuccess = false;
          return;
        }
      }

      this.loadingRegenerate = false;
      this.toastMessage = "Meals regenerated successfully!";
      this.actionSuccess = true;
      this.showToast = true;
    },
    async saveServings(meal, index) {
      try {
        await this.updateMealAction(meal);
        this.toastMessage = "Servings saved successfully!";
        this.actionSuccess = true;
      } catch (error) {
        this.toastMessage = error.code;
        this.actionSuccess = false;
      } finally {
        this.$set(this.servingsDialog, index, false);
        this.showToast = true;
      }
    },
    regenerateMeal(id) {
      const meal = this.meals.find((obj) => obj.id === id);
      console.log(meal.name);
    },
    async ateMeal(meal) {
      try {
        await this.saveAteMealAction(meal);
        this.toastMessage = "Congrats! That's the spirit!";
        this.actionSuccess = true;
      } catch (error) {
        this.toastMessage = error.message;
        this.actionSuccess = false;
      } finally {
        this.showToast = true;
      }
    },
  },
  components: {
    Toast,
    DataLoader,
  },
  watch: {
    "$store.state.meals": function (meals) {
      this.servingsDialog = meals.map(() => false);
      this.servingsReveal = meals.map(() => false);
    },
  },
};
</script>

<style scoped>
.v-card--revealServings {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.food-names > span:not(:last-child)::after {
  content: ",";
  margin-right: 4px;
}
</style>