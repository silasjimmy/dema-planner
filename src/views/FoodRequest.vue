<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-card-text class="text-center subtitle-1 text--secondary">
        Send a request for foods not in the database.
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="8" class="text-center mx-auto">
            <v-text-field
              label="Food name"
              outlined
              dense
              v-model="food.name"
              color="green"
              prepend-icon="mdi-pizza"
              placeholder="An english name is preferred..."
            ></v-text-field>
            <v-textarea
              outlined
              dense
              rows="4"
              v-model="food.description"
              label="Description"
              color="green"
              prepend-icon="mdi-message"
              placeholder="Give a detailed description of the food to aid us in searching..."
            ></v-textarea>
            <v-btn
              rounded
              @click="submitRequest"
              color="success"
              class="text-none"
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  title: "Food request",
  name: "FoodRequest",
  created() {},
  data() {
    return {
      food: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    submitRequest() {
      console.log(this.food);
    },
  },
};
</script>

<style scoped>
</style>