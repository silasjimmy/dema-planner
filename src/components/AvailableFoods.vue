<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text--secondary my-2">
          Available foods in your area. You can add foods to your favorites by
          clicking the heart icon.
        </p>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-simple-table class="mt-2" fixed-header max-height="65vh">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    class="
                      text-center
                      subtitle-1
                      font-weight-bold
                      jost-font-family
                      text--primary
                    "
                  >
                    Name
                  </th>
                  <th
                    class="
                      text-center
                      subtitle-1
                      font-weight-bold
                      jost-font-family
                      text--primary
                    "
                  >
                    Favorite
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="foodName in availableFoods" :key="foodName">
                  <td class="text-center text-capitalize">
                    {{ foodName }}
                  </td>
                  <td class="text-center">
                    <v-item-group multiple v-model="likedFoods">
                      <v-item v-slot="{ active, toggle }" :value="foodName">
                        <v-icon
                          @click="toggle"
                          :color="active ? 'success' : ''"
                          >{{ foodLikeIcon(active) }}</v-icon
                        >
                      </v-item>
                    </v-item-group>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapState, mapActions } from "vuex";

export default {
  title: "Available foods",
  name: "AvailableFoods",
  created() {
    this.loadFoods();
  },
  data() {
    return {
      availableFoods: ["Chapati"],
    };
  },
  computed: {
    // ...mapState(["availableFoods", "likedFoods"]),
  },
  methods: {
    // ...mapActions(["getAvailableFoodsAction", "getLikedFoodsAction"]),
    loadFoods() {
      //   this.getAvailableFoodsAction();
      //   this.getLikedFoodsAction();
      console.log("Load foods!");
    },
    foodLikeIcon(state) {
      if (state) return "mdi-heart";
      else return "mdi-heart-outline";
    },
  },
};
</script>

<style scoped>
.jost-font-family {
  font-family: Jost, sans-serif !important;
}
</style>