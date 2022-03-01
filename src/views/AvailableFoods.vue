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
      :success="actionSuccess"
      @close="showToast = false"
    ></toast>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Toast from "@/components/Toast.vue";

export default {
  title: "Available foods",
  name: "AvailableFoods",
  async created() {
    await this.getAvailableFoodsAction();
    await this.getLikedFoodsAction();
  },
  data() {
    return {
      actionSuccess: false,
      toastMessage: "",
      showToast: false,
      loadingFoods: false,
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

        this.actionSuccess = true;
      } catch (error) {
        this.toastMessage = error.code;
        this.actionSuccess = false;
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
  },
};
</script>