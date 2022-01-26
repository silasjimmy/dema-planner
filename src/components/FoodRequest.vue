<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="8" class="text-center mx-auto">
            <p class="text--secondary my-2">
              The food you want to add does not appear in the list? Put a
              request for the food below.
            </p>
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
              auto-grow
              dense
              rows="1"
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
              <v-icon left>mdi-send</v-icon>
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