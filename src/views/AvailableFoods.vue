<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- Loading foods -->
      <data-loader
        :show="loadingData"
        :message="loadingDataMessage"
        :success="loadingDataSuccess"
      ></data-loader>

      <v-data-table
        v-if="!loadingData"
        :headers="headers"
        :items="availableFoods"
        :search="searchFood"
        item-key="name"
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
          <v-icon color="success" @click="likeFood(item)">{{
            foodIcon(item)
          }}</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Action toast -->
    <toast
      :show="showToast"
      :message="toastMessage"
      :success="toastActionSuccess"
      @close="showToast = false"
    ></toast>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Toast from "@/components/Toast.vue";
import DataLoader from "@/components/DataLoader.vue";

export default {
  title: "Available foods",
  name: "AvailableFoods",
  async created() {
    try {
      this.loadingData = true;

      if (this.availableFoods.length === 0)
        await this.getAvailableFoodsAction();
      if (this.likedFoods.length === 0) await this.getLikedFoodsAction();
    } catch (error) {
      this.loadingDataMessage = error.code;
      this.loadingDataSuccess = false;
    } finally {
      setTimeout(() => (this.loadingData = false), 1000);
    }
  },
  data() {
    return {
      loadingData: false,
      loadingDataMessage: "Loading foods...",
      loadingDataSuccess: true,
      toastActionSuccess: false,
      toastMessage: "",
      showToast: false,
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
    ...mapGetters(["getLikedFoodById"]),
  },
  methods: {
    ...mapActions([
      "getAvailableFoodsAction",
      "getLikedFoodsAction",
      "addLikedFoodAction",
      "removeLikedFoodAction",
    ]),
    async likeFood(food) {
      const foodLiked = this.getLikedFoodById(food.id);

      try {
        if (foodLiked) {
          await this.removeLikedFoodAction(food);

          this.toastMessage = "Food removed successfully!";
        } else {
          await this.addLikedFoodAction(food);

          this.toastMessage = "Food added successfully!";
        }

        this.toastActionSuccess = true;
      } catch (error) {
        this.toastMessage = error.code;
        this.toastActionSuccess = false;
      } finally {
        this.showToast = true;
      }
    },
    foodIcon(food) {
      const foodLiked = this.getLikedFoodById(food.id);

      if (foodLiked) return "mdi-heart";
      else return "mdi-heart-outline";
    },
  },
  components: {
    Toast,
    DataLoader,
  },
};
</script>