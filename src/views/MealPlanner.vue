<template>
  <v-container>
    <div class="pa-3 d-flex justify-space-between align-center">
      <div class="d-flex flex-column align-center">
        <h2 class="text-h6 text-uppercase font-weight-light">
          {{ weekday }}
        </h2>
        <h2 class="text-h2 font-weight-bold">{{ day }}</h2>
      </div>
      <div class="d-flex align-center">
        <h2 class="text-h6 mr-2">
          {{ monthAndYear }}
        </h2>
        <v-menu
          offset-y
          v-model="datePickerMenu"
          transition="scale-transition"
          ref="dateMenu"
          :return-value.sync="mealsDate"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon :disabled="meals.length === 0" v-bind="attrs" v-on="on">
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
        </v-menu>
      </div>
      <v-tooltip left color="black">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            elevation="1"
            color="success"
            :loading="!showMeals"
            :disabled="meals.length === 0"
            v-bind="attrs"
            v-on="on"
            @click="regenerateMeals"
          >
            <v-icon>mdi-rotate-right</v-icon>
          </v-btn>
        </template>
        <span>Regenerate all meals</span>
      </v-tooltip>
    </div>

    <!-- Alert for anything that happens in the page -->
    <v-alert
      text
      dense
      dismissible
      prominent
      v-model="alertShow"
      :icon="alertIcon"
      :type="alertType"
      class="rounded-lg"
      transition="scale-transition"
    >
      {{ alertMessage }}
    </v-alert>

    <v-row no-gutters>
      <v-col cols="12" lg="8" class="mx-auto py-4" v-if="meals.length === 0">
        <div class="text-center">
          <p class="text--secondary">
            It seems you don't have meals for today. You can do so by clicking
            the button below to automatically create all meals of the day. Don't
            worry, we know what you like...
          </p>
          <v-btn
            rounded
            disabled
            :loading="loadingMeals"
            @click="generateMeals"
            color="success"
            class="text-none"
          >
            <v-icon left>mdi-rotate-right</v-icon>
            Generate
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" v-if="meals.length > 0">
        <div class="meal-cards" v-if="showMeals">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
                lg="6"
                xl="4"
                v-for="meal in meals"
                :key="meal.id"
              >
                <v-card outlined class="rounded-lg">
                  <v-card-text class="py-3 px-4">
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex flex-column">
                        <span
                          class="
                            text-h6 text--primary
                            font-weight-bold
                            text-capitalize
                            jost-font-family
                          "
                        >
                          {{ meal.name }}
                        </span>
                        <span
                          class="
                            subtitle-2
                            text--secondary
                            font-weight-light
                            text-uppercase
                          "
                        >
                          {{ meal.time }}
                        </span>
                      </div>
                      <!-- Dropdown menu -->
                      <v-menu offset-x bottom transition="slide-y-transition">
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
                      </v-menu>
                    </div>
                    <div class="my-3 d-flex align-center">
                      <v-img
                        class="rounded-lg mr-2"
                        width="50"
                        max-width="50"
                        height="50"
                        :src="meal.image"
                      ></v-img>
                      <div
                        class="
                          food-names
                          text--primary
                          subtitle-1
                          font-weight-light
                          text-capitalize
                        "
                      >
                        <span v-for="food in meal.foods" :key="food.name">{{
                          food.name
                        }}</span>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between align-center">
                      <div>
                        <v-checkbox
                          hide-details
                          dense
                          @change="ateMeal(meal.id)"
                          v-model="meal.ate"
                          label="I ate this meal"
                          color="green"
                        ></v-checkbox>
                      </div>
                      <!-- Open food servings view -->
                      <v-tooltip top color="black">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            icon
                            @click="meal.revealServings = true"
                          >
                            <v-icon>mdi-chevron-up</v-icon>
                          </v-btn>
                        </template>
                        <span>View food servings</span>
                      </v-tooltip>
                    </div>
                  </v-card-text>
                  <!-- Food servings view -->
                  <v-expand-transition>
                    <v-card
                      v-if="meal.revealServings"
                      class="transition-fast-in-fast-out v-card--revealServings"
                      style="height: 100%"
                    >
                      <v-card-text class="py-3 px-4">
                        <p class="mb-2 d-flex justify-space-between">
                          <strong class="text-h6 text--primary font-weight-bold"
                            >Servings</strong
                          >
                          <v-btn icon @click="meal.revealServings = false"
                            ><v-icon>mdi-chevron-down</v-icon></v-btn
                          >
                        </p>
                        <div class="px-8">
                          <div
                            v-for="food in meal.foods"
                            :key="food.name"
                            class="d-flex justify-space-between my-1"
                          >
                            <span
                              class="
                                subtitle-2
                                text--primary
                                font-weight-medium
                                text-capitalize
                              "
                              >{{ food.name }}</span
                            ><span
                              class="
                                subtitle-2
                                text--secondary
                                font-weight-medium
                              "
                              >{{ food.serving }}</span
                            >
                          </div>
                        </div>
                        <div class="text-center mt-2">
                          <!-- Food servings edit form -->
                          <v-dialog
                            v-model="meal.servingsDialog"
                            persistent
                            max-width="400"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                text
                                color="success"
                                v-bind="attrs"
                                v-on="on"
                                class="text-none"
                              >
                                Edit
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-title
                                class="d-flex justify-space-between"
                              >
                                <span class="text-h6 text--primary"
                                  >Edit food servings</span
                                >
                                <v-btn
                                  icon
                                  @click="meal.servingsDialog = false"
                                >
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </v-card-title>
                              <v-card-text class="mt-2">
                                <v-container class="text-center">
                                  <v-row>
                                    <v-col
                                      v-for="food in meal.foods"
                                      :key="food.name"
                                      cols="6"
                                    >
                                      <v-text-field
                                        hide-details
                                        outlined
                                        dense
                                        hide-spin-buttons
                                        :label="food.name"
                                        :value="food.serving"
                                        color="green"
                                        type="number"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-btn
                                        color="success"
                                        @click="saveServings(meal.id)"
                                      >
                                        save
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-expand-transition>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="meal-card-loaders" v-if="!showMeals">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="12"
                lg="6"
                xl="4"
                v-for="meal in meals"
                :key="meal.id"
              >
                <v-skeleton-loader
                  elevation="1"
                  type="card-heading, list-item-avatar, card-heading"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  title: "Meal planner",
  name: "MealPlanner",
  created() {
    // this.$store.commit("setDashboardLinks", localStorage.getItem("userRole"));
    // this.loadMeals();
  },
  data() {
    return {
      showMeals: true,
      alertIcon: "mdi-cloud-alert",
      alertType: "error",
      alertMessage: "Something..",
      alertShow: false,
      loadingMeals: false,
      datePickerMenu: false,
      mealsDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  computed: {
    ...mapState(["meals"]),
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
    ...mapActions(["getMealsAction"]),
    loadMeals() {
      this.getMealsAction();
    },
    generateMeals() {
      this.loadingMeals = true;

      // Create the meals and save them in database
      setTimeout(() => {
        this.loadingMeals = false;
        this.showMeals = true;
        this.loadMeals();
      }, 3000);
    },
    regenerateMeals() {
      this.showMeals = false;

      // Regenerate meals and save them in database
      setTimeout(() => {
        this.showMeals = true;
      }, 3000);
    },
    saveServings(id) {
      const meal = this.meals.find((obj) => obj.id === id);
      meal.servingsDialog = false;
    },
    regenerateMeal(id) {
      const meal = this.meals.find((obj) => obj.id === id);
      console.log(meal.name);
    },
    ateMeal(id) {
      const meal = this.meals.find((obj) => obj.id === id);
      console.log(meal.name);
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