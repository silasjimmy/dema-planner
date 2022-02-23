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
          <v-btn icon color="success">
            <v-icon @click="like(item)"> mdi-heart </v-icon>
          </v-btn>
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
import { mapState, mapActions } from "vuex";
import Toast from "@/components/Toast.vue";

export default {
  title: "Available foods",
  name: "AvailableFoods",
  async created() {
    await this.getAvailableFoodsAction();
    await this.getLikedFoodsAction();
    this.favorites = [...this.likedFoods];
  },
  data() {
    return {
      actionSuccess: false,
      toastMessage: "",
      showToast: false,
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
      "getAvailableFoodsAction",
      "getLikedFoodsAction",
      "addLikedFoodAction",
      "updateLikedFoodAction",
    ]),
    like(food) {
      const index = this.favorites.indexOf(food);
      console.log(index);
    },
    async favoriteChange() {
      // Get the added food
      const newLikedFoods = this.favorites.filter(
        (f) => !this.likedFoods.includes(f)
      );

      if (newLikedFoods.length > 0) {
        console.log("Food liked!");
        console.log(this.likedFoods);
        console.log(this.favorites);
        // try {
        //   await this.addLikedFoodAction(newLikedFoods[0]);

        //   this.toastMessage = "Food added successfully!";
        //   this.actionSuccess = true;
        // } catch (error) {
        //   this.toastMessage = error.code;
        //   this.actionSuccess = false;
        // } finally {
        //   this.showToast = true;
        // }
      } else {
        console.log("Food unliked!");
        console.log(this.likedFoods);
        console.log(this.favorites);
        // // Get the removed food
        // const removedLikedFoods = this.likedFoods.filter(
        //   (f) => !this.favorites.includes(f)
        // );

        // try {
        //   await this.updateLikedFoodAction(removedLikedFoods[0]);

        //   this.toastMessage = "Food removed successfully!";
        //   this.actionSuccess = true;
        // } catch (error) {
        //   this.toastMessage = error.code;
        //   this.actionSuccess = false;
        // } finally {
        //   this.showToast = true;
        // }
      }
    },
  },
  // watch: {
  //   favorites(newValue) {
  //     console.log(newValue);
  //   }
  // },
  components: {
    Toast,
  },
};
</script>