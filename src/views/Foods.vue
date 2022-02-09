<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-card-title>
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
        <v-btn rounded color="success" @click="addNewFood" class="text-none">
          Add food
        </v-btn>
      </v-card-title>

      <!-- Food data table -->
      <v-data-table
        divider
        :loading="allFoods.length === 0"
        loading-text="Fetching the foods... Please wait"
        item-key="name"
        :headers="headers"
        :items="allFoods"
        :items-per-page="5"
        :search="searchFood"
        sort-by="name"
      >
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
        @close="closeFoodForm"
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
    <v-snackbar
      :transition="
        actionToast ? 'scroll-x-reverse-transition' : 'scroll-x-transition'
      "
      :timeout="3000"
      v-model="actionToast"
    >
      <div class="d-flex align-center">
        <v-icon color="success">mdi-check-circle</v-icon>
        <span class="ml-2">{{ actionMessage }}</span>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="actionToast = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import FoodForm from "@/components/FoodForm.vue";
import FoodDetails from "../components/FoodDetails.vue";
import QuestionPrompt from "../components/QuestionPrompt.vue";
import { mapState, mapActions } from "vuex";

export default {
  title: "Foods",
  name: "Foods",
  created() {
    this.getAllFoodsAction();
  },
  data() {
    return {
      foodFormDialog: false,
      foodAction: "new",
      promptOverlay: false,
      searchFood: "",
      deleteFoodPrompt: false,
      foodDetailsDialog: false,
      loadingFood: false,
      actionToast: false,
      actionMessage: "",
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
    closeFoodForm() {
      this.foodFormDialog = false;
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
            this.selectedFood.id = this.allFoods.length;

            // Add new food
            this.addFoodAction(this.selectedFood);
            this.actionMessage = "Food added successfully!";
          } else {
            // Edit food
            await this.updateFoodAction(this.selectedFood);
            this.actionMessage = "Food updated successfully!";
          }
        } catch (error) {
          this.actionMessage = error;
        } finally {
          // Stop button loading
          this.loadingFood = false;
          // Close food form dialog
          this.foodFormDialog = false;

          // Display toast
          this.actionToast = true;
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
        this.actionMessage = "Food deleted successfully!";
      } catch (error) {
        this.actionMessage = error;
      } finally {
        this.promptOverlay = false;
        this.deleteFoodPrompt = false;
        this.actionToast = true;
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
  },
};
</script>
