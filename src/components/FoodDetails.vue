<template>
  <v-dialog persistent scrollable :width="width" v-model="dialog">
    <v-card>
      <v-card-title>
        <span>Food details</span>

        <v-spacer></v-spacer>

        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-0" style="height: 60vh">
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-img
                :src="food.avatar"
                class="rounded-lg"
                height="120px"
              ></v-img>
            </v-col>
            <v-col cols="9" align-self="end">
              <div>
                <h1 class="text-h5">{{ food.name }}</h1>
                <h2 class="subtitle-1">Available in many locations</h2>
              </div>
            </v-col>
            <v-col cols="6">
              <v-list subheader two-line>
                <v-subheader>Details</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Group</v-list-item-title>
                    <v-list-item-subtitle>{{
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
                    <v-list-item-subtitle>{{ food.form }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list subheader two-line>
                <v-subheader>Ingredients</v-subheader>
                <v-list-item v-for="i in food.ingredients" :key="i.name">
                  <v-list-item-content>
                    <v-list-item-title>{{ i.name }}</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ i.amount }} {{ i.units }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12">
              <v-list subheader one-line>
                <v-subheader>Instructions</v-subheader>
                <v-list-item v-for="i in food.instructions" :key="i.step">
                  <v-list-item-icon>
                    <v-icon>{{ `mdi-numeric-${i.step}` }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <p class="my-0">
                      {{ i.text }}
                    </p>
                  </v-list-item-content>
                </v-list-item>
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
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "50vw",
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