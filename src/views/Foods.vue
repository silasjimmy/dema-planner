<template>
  <v-container fluid>
    <v-card flat>
      <!-- Load foods -->
      <data-loader
        :show="loadingData"
        :message="loadingDataMessage"
        :success="loadingDataSuccess"
      ></data-loader>

      <v-card-text v-if="!loadingData">
        <!-- Food data table -->
        <v-data-table
          divider
          item-key="name"
          :headers="headers"
          :items="allFoods"
          :items-per-page="5"
          :search="searchFood"
          sort-by="name"
        >
          <template v-slot:top>
            <v-toolbar flat class="rounded-lg">
              <!-- Search food field -->
              <v-text-field
                hide-details
                outlined
                dense
                single-line
                class="shrink"
                v-model="searchFood"
                append-icon="mdi-magnify"
                label="Search for food..."
                color="green"
              ></v-text-field>

              <v-spacer></v-spacer>

              <!-- Add food button -->
              <v-btn
                rounded
                class="text-none"
                color="success"
                @click="addNewFood"
              >
                Add food
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:[`item.nutrient`]="{ item }">
            <span class="text-capitalize">{{ item.nutrient.name }}</span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon @click="editFood(item)">
              <v-icon small> mdi-pencil </v-icon>
            </v-btn>
            <v-btn icon @click="deleteFood(item)">
              <v-icon small> mdi-delete </v-icon>
            </v-btn>
            <v-btn icon @click="vieFoodDetails(item)">
              <v-icon small>mdi-information</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>

      <!-- Add food form dialog -->
      <food-form
        :dialog="foodFormDialog"
        :food="selectedFood"
        :foodAction="foodAction"
        :loading="loadingFood"
        @addIngredient="addIngredient"
        @addInstruction="addInstruction"
        @deleteIngredient="deleteIngredient"
        @deleteInstruction="deleteInstruction"
        @setUnits="setUnits"
        @save="saveFood"
        @close="foodFormDialog = false"
        @uploadFoodImg="uploadFoodImg"
      ></food-form>

      <!-- Food delete dialog -->
      <question-prompt
        :question="'Are you sure you want to delete this food?'"
        :dialog="deleteFoodPrompt"
        :overlay="promptOverlay"
        @cancel="deleteFoodCancel"
        @confirm="deleteFoodConfirm"
      ></question-prompt>

      <!-- Food details dialog -->
      <food-details
        :food="selectedFood"
        :dialog="foodDetailsDialog"
        @close="foodDetailsDialog = false"
      ></food-details>
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
import FoodForm from "@/components/FoodForm.vue";
import Toast from "@/components/Toast.vue";
import FoodDetails from "../components/FoodDetails.vue";
import QuestionPrompt from "../components/QuestionPrompt.vue";
import DataLoader from "@/components/DataLoader.vue";
import { mapState, mapActions } from "vuex";
import { getCounter, updateCounter } from "../utils";

export default {
  title: "Foods",
  name: "Foods",
  async created() {
    try {
      this.loadingData = true;
      if (this.allFoods.length === 0) await this.getAllFoodsAction();
    } catch (error) {
      this.loadingDataMessage = error.code;
      this.loadingDataSuccess = false;
    } finally {
      this.loadingData = false;
    }
  },
  data() {
    return {
      loadingData: false,
      loadingDataMessage: "Fetching foods...",
      loadingDataSuccess: true,
      foodImg: undefined,
      foodFormDialog: false,
      foodAction: "new",
      promptOverlay: false,
      searchFood: "",
      deleteFoodPrompt: false,
      foodDetailsDialog: false,
      loadingFood: false,
      showToast: false,
      toastMessage: "",
      actionSuccess: true,
      selectedFood: {
        id: "",
        imageUrl: "",
        name: "",
        nutrient: {
          name: "",
          amount: "",
          units: "g",
        },
        group: "",
        form: "",
        calories: {
          amount: "",
          units: "cal",
        },
        ingredients: [
          {
            amount: "",
            unit: "",
            name: "",
          },
        ],
        regions: [],
        instructions: [
          {
            step: "",
            description: "",
          },
        ],
      },
      defaultFood: {
        id: "",
        imageUrl: "",
        name: "",
        nutrient: {
          name: "",
          amount: "",
          units: "g",
        },
        group: "",
        form: "",
        calories: {
          amount: "",
          units: "cal",
        },
        ingredients: [
          {
            amount: "",
            unit: "",
            name: "",
          },
        ],
        regions: [],
        instructions: [
          {
            step: "",
            description: "",
          },
        ],
      },
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Nutrient", value: "nutrient", align: "center" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions([
      "getAllFoodsAction",
      "addFoodAction",
      "updateFoodAction",
      "deleteFoodAction",
    ]),
    uploadFoodImg(e) {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.selectedFood.imageUrl = reader.result;
      };

      let images = e.target.files || e.dataTransfer.files;

      if (!images.length) return;
      else {
        this.foodImg = images[0];
        this.selectedFood.imageUrl = reader.readAsDataURL(images[0]);
      }
    },
    addNewFood() {
      this.selectedFood = JSON.parse(JSON.stringify(this.defaultFood));
      this.foodAction = "new";
      this.foodFormDialog = true;
    },
    addIngredient() {
      this.selectedFood.ingredients.push({
        amount: "",
        unit: "",
        name: "",
      });
    },
    addInstruction() {
      this.selectedFood.instructions.push({
        step: "",
        description: "",
      });
    },
    deleteIngredient(i) {
      this.selectedFood.ingredients.splice(i, 1);
    },
    deleteInstruction(i) {
      this.selectedFood.instructions.splice(i, 1);
    },
    setUnits(unit, value) {
      switch (unit) {
        case "nutrients":
          this.selectedFood.nutrient.units = value;
          break;
        case "calories":
          this.selectedFood.calories.units = value;
          break;
      }
    },
    editFood(food) {
      this.selectedFood = Object.assign({}, food);
      this.foodAction = "edit";
      this.foodFormDialog = true;
    },
    vieFoodDetails(food) {
      this.selectedFood = Object.assign({}, food);
      this.foodDetailsDialog = true;
    },
    async saveFood(validated) {
      if (validated) {
        this.loadingFood = true;

        try {
          if (this.foodAction === "new") {
            // Set the food id
            const foodId = await getCounter("foods");
            this.selectedFood.id = foodId;

            // Add new food
            this.addFoodAction(this.selectedFood);
            this.toastMessage = "Food added successfully!";
            this.actionSuccess = true;

            // Update counter
            await updateCounter("foods", { last: foodId + 1 });
          } else {
            // Edit food
            await this.updateFoodAction(this.selectedFood);
            this.toastMessage = "Food updated successfully!";
            this.actionSuccess = true;
          }
        } catch (error) {
          this.toastMessage = error.code;
          this.actionSuccess = false;
        } finally {
          // Stop button loading
          this.loadingFood = false;
          // Close food form dialog
          this.foodFormDialog = false;

          // Display toast
          this.showToast = true;
        }
      }
    },
    deleteFood(food) {
      this.selectedFood = Object.assign({}, food);
      this.deleteFoodPrompt = true;
    },
    async deleteFoodConfirm() {
      this.promptOverlay = true;

      try {
        await this.deleteFoodAction(this.selectedFood);
        this.toastMessage = "Food deleted successfully!";
      } catch (error) {
        this.toastMessage = error;
      } finally {
        this.promptOverlay = false;
        this.deleteFoodPrompt = false;
        this.showToast = true;
      }
    },
    deleteFoodCancel() {
      this.selectedFood = JSON.parse(JSON.stringify(this.defaultFood));
      this.deleteFoodPrompt = false;
    },
  },
  computed: {
    ...mapState(["allFoods"]),
  },
  components: {
    QuestionPrompt,
    FoodDetails,
    FoodForm,
    Toast,
    DataLoader,
  },
};
</script>
