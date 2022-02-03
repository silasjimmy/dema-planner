<template>
  <v-dialog persistent scrollable :width="width" v-model="dialog">
    <v-card>
      <v-toolbar elevation="0">
        <v-toolbar-title>Food details</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

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
                <v-subheader>Recipe</v-subheader>
                <v-list-item v-for="r in food.recipe" :key="r.step">
                  <v-list-item-icon>
                    <v-icon>{{ `mdi-numeric-${r.step}` }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <p class="my-0">
                      {{ r.text }}
                    </p>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn rounded @click="edit" class="text-none mx-2" color="success">
          Edit
        </v-btn>
        <v-btn rounded class="text-none mx-2" color="error" @click="deleteFood"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FoodDetails",
  methods: {
    edit() {
      this.$emit("edit");
    },
    deleteFood() {
      this.$emit("deleteFood");
    },
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