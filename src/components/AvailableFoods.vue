<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="10" class="mx-auto">
        <p class="text--secondary text-center">
          Avaliable foods in your area. You can add foods to you favorites by
          clicking the heart icon next to the food name. If you don't find the
          food you are looking for, request the food.
        </p>
      </v-col>
      <v-col cols="12" lg="10" class="mx-auto">
        <v-data-table
          v-model="likedFoods"
          :headers="headers"
          :items="availableFoods"
          :search="searchFood"
          item-key="name"
          class="elevation-1"
          :loading="loadingFoods"
          loading-text="Loading... Please wait"
          :items-per-page="itemsPerPage"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-text-field
                outlined
                dense
                hide-details
                single-line
                class="shrink"
                color="success"
                v-model="searchFood"
                append-icon="mdi-magnify"
                label="Search for food"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:item.favorite="{ item }">
            <v-item-group multiple v-model="favoriteFoods">
              <v-item v-slot="{ active, toggle }" :value="item">
                <v-icon @click="toggle" :color="active ? 'success' : ''">{{
                  likeFood(active)
                }}</v-icon>
              </v-item>
            </v-item-group>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  title: "Available foods",
  name: "AvailableFoods",
  created() {
    this.$store.commit("setDashboardLinks", localStorage.getItem("userRole"));
    this.loadFoods();
  },
  data() {
    return {
      loadingFoods: false,
      favoriteFoods: [],
      itemsPerPage: 5,
      searchFood: "",
      headers: [
        {
          text: "Name",
          align: "center",
          value: "name",
        },
        {
          text: "Favorite",
          align: "center",
          sortable: false,
          value: "favorite",
        },
      ],
    };
  },
  computed: {
    ...mapState(["availableFoods", "likedFoods"]),
  },
  methods: {
    ...mapActions(["getAvailableFoodsAction", "getLikedFoodsAction"]),
    loadFoods() {
      this.getAvailableFoodsAction();
      this.getLikedFoodsAction();
      console.log("Load foods!");
    },
    likeFood(state) {
      if (state) return "mdi-heart";
      else return "mdi-heart-outline";
    },
  },
};
</script>

<style scoped>
</style>