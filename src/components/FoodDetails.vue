<template>
  <v-dialog persistent scrollable :width="dialogWidth" v-model="dialog">
    <v-card>
      <v-card-title>
        <span>Food details</span>

        <v-spacer></v-spacer>

        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text style="max-height: 70vh">
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-img
                :src="food.imageUrl"
                class="rounded-lg"
                height="120px"
              ></v-img>
            </v-col>
            <v-col cols="12" md="9" align-self="end">
              <div class="text-center text-lg-left">
                <h1 class="text-h5 text--primary">{{ food.name }}</h1>
                <h2 class="subtitle-1">
                  Available in {{ food.regions.join(", ") }}
                </h2>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="text-center text-md-left">
              <v-list subheader two-line class="py-0">
                <v-subheader class="justify-center justify-md-start"
                  >Details</v-subheader
                >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Nutrient</v-list-item-title>
                    <v-list-item-subtitle class="text-capitalize"
                      >{{ food.nutrient.name }} - {{ food.nutrient.amount
                      }}{{ food.nutrient.units }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Food group</v-list-item-title>
                    <v-list-item-subtitle class="text-capitalize">{{
                      food.group
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Calories</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ food.calories.amount }}
                      {{ food.calories.units }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Form</v-list-item-title>
                    <v-list-item-subtitle class="text-capitalize">{{
                      food.form
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6" class="text-center text-md-left">
              <v-list subheader two-line class="py-0">
                <v-subheader class="justify-center justify-md-start"
                  >Ingredients</v-subheader
                >
                <p
                  v-if="food.ingredients[0].name === ''"
                  class="text--secondary text-center font-italic"
                >
                  Ingredients not yet added.
                </p>

                <div v-else>
                  <v-list-item v-for="i in food.ingredients" :key="i.name">
                    <v-list-item-content>
                      <v-list-item-title class="text-capitalize">{{
                        i.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle
                        >{{ i.amount }} {{ i.unit }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list>
            </v-col>
            <v-col cols="12" class="text-center text-md-left">
              <v-list subheader one-line>
                <v-subheader class="justify-center justify-md-start"
                  >Instructions</v-subheader
                >
                <p
                  v-if="food.instructions[0].step === ''"
                  class="text--secondary text-center font-italic"
                >
                  Instructions not yet added.
                </p>

                <div v-else>
                  <v-list-item v-for="i in food.instructions" :key="i.step">
                    <v-list-item-icon>
                      <v-icon>{{ `mdi-numeric-${i.step}` }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <p class="my-0">
                        {{ i.description }}
                      </p>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FoodDetails",
  methods: {
    close() {
      this.$emit("close");
    },
  },
  computed: {
    dialogWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          return "50vw";
        case "lg":
          return "60vw";
        case "md":
          return "70vw";
        case "sm":
          return "80vw";
        case "xs":
          return "100vw";
        default:
          return "100vw";
      }
    },
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    food: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>