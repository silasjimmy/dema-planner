<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-data-table
        :headers="headers"
        :items="availableFoods"
        :search="searchFood"
        item-key="name"
        :loading="loadingFoods"
        loading-text="Loading foods... Please wait"
        :items-per-page="5"
      >
        <template v-slot:top>
          <v-toolbar flat class="rounded-lg">
            <v-text-field
              outlined
              dense
              hide-details
              single-line
              :class="$vuetify.breakpoint.smAndUp ? 'shrink' : ''"
              color="success"
              v-model="searchFood"
              append-icon="mdi-magnify"
              label="Search for food..."
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:[`item.favorite`]="{ item }">
          <v-item-group multiple v-model="favorites" @change="favoriteChange">
            <v-item v-slot="{ active, toggle }" :value="item">
              <v-icon @click="toggle" :color="active ? 'success' : ''">{{
                likeFood(active)
              }}</v-icon>
            </v-item>
          </v-item-group>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  title: "Available foods",
  name: "AvailableFoods",
  async created() {
    await this.getLikedFoodsAction();
    this.favorites = [...this.likedFoods];
  },
  data() {
    return {
      loadingFoods: false,
      searchFood: "",
      favorites: [],
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
    ...mapActions([
      "getLikedFoodsAction",
      "addLikedFoodAction",
      "removeLikedFoodAction",
    ]),
    likeFood(liked) {
      if (liked) return "mdi-heart";
      else return "mdi-heart-outline";
    },
    async favoriteChange() {
      // Get the added food
      const newLikedFoods = this.favorites.filter(
        (f) => !this.likedFoods.includes(f)
      );

      if (newLikedFoods.length > 0) {
        // Update the store
        try {
          await this.addLikedFoodAction(newLikedFoods[0]);
        } catch (error) {
          console.log(error.code);
        }
      } else {
        // Get the removed food
        const removedLikedFoods = this.likedFoods.filter(
          (f) => !this.favorites.includes(f)
        );

        // Update the store
        try {
          await this.removeLikedFoodAction(removedLikedFoods[0]);
        } catch (error) {
          console.log(error.code);
        }
      }
    },
  },
};
</script>