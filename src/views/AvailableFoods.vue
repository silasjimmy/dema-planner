<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-data-table
        v-model="likedFoods"
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
          <v-item-group multiple v-model="favoriteFoods">
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
  created() {
    this.getAvailableFoodsAction();
    this.getLikedFoodsAction();
  },
  data() {
    return {
      loadingFoods: false,
      favoriteFoods: [],
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
    likeFood(state) {
      if (state) return "mdi-heart";
      else return "mdi-heart-outline";
    },
  },
};
</script>