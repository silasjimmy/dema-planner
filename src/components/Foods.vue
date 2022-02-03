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
          label="Search..."
          color="green"
        ></v-text-field>

        <v-spacer></v-spacer>

        <!-- Add food button -->
        <v-btn
          rounded
          color="success"
          @click="foodFormDialog = true"
          class="text-none"
        >
          Add food
        </v-btn>

        <!-- Food add/edit dialog -->
        <v-dialog v-model="foodFormDialog" width="400px">
          <v-card>
            <v-card-title>
              <span class="text-h6">{{ formTitle }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeFoodFormDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text>
              <v-form class="b">
                <div class="b">
                  <v-img
                    class="b rounded-circle mx-auto"
                    width="100px"
                    height="100px"
                  ></v-img>
                </div>
                <v-text-field
                  outlined
                  dense
                  color="success"
                  label="Name"
                  v-model="editedFood.name"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn
                rounded
                color="success"
                class="text-none"
                @click="saveFood"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Food delete dialog -->
        <question-prompt
          :question="'Are you sure you want to delete this food?'"
          :dialog="foodDeleteDialog"
          @cancel="closeFoodDeleteDialog"
          @confirm="deleteFoodConfirm"
        ></question-prompt>

        <!-- Food details dialog -->
        <food-details
          :food="foodToView"
          :dialog="foodDetailsDialog"
          @close="foodDetailsDialog = false"
        ></food-details>
      </v-card-title>

      <v-data-table
        divider
        item-key="name"
        :headers="headers"
        :items="foods"
        :items-per-page="5"
        :search="searchFood"
        sort-by="name"
      >
        <template v-slot:[`item.nutrient`]="{ item }">
          <v-chip :class="setNutrientColor(item.nutrient.name)">
            <span class="white--text">{{ item.nutrient.name }}</span>
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="editFood(item)">
            <v-icon small> mdi-pencil </v-icon>
          </v-btn>
          <v-btn icon @click="deleteFood(item)">
            <v-icon small> mdi-delete </v-icon>
          </v-btn>
          <v-btn icon @click="openFoodDetails(item)">
            <v-icon small>mdi-information</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import FoodDetails from "./FoodDetails.vue";
import QuestionPrompt from "./QuestionPrompt.vue";

export default {
  title: "Foods",
  name: "Foods",
  created() {
    this.$store.commit("setDashboardLinks", localStorage.getItem("userRole"));
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Nutrient", value: "nutrient", align: "center" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
      foods: [
        {
          id: 0,
          avatar:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80",
          name: "Burger",
          nutrient: {
            name: "carbohydrates",
            amount: 144,
            units: "g",
          },
          group: "starch",
          form: "solid",
          calories: {
            amount: 100,
            units: "cal",
          },
          ingredients: [{ name: "onions", amount: 2, units: "slices" }],
          regions: ["kenya"],
          recipe: [{ step: 1, text: "Do something first" }],
        },
      ],
      foodToView: {},
      foodFormDialog: false,
      foodDetailsDialog: false,
      foodDeleteDialog: false,
      searchFood: "",
      editedIndex: -1,
      editedFood: {
        name: "",
      },
      defaultFood: {
        name: "",
      },
      alertOn: false,
      alertType: "success",
      alertMsg: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New food" : "Edit food";
    },
  },
  methods: {
    setNutrientColor(nutrient) {
      if (nutrient === "Carbohydrate") return "blue-grey";
      else if (nutrient === "Protein") return "green";
      else return "orange";
    },
    openFoodDetails(food) {
      this.foodToView = food;
      this.foodDetailsDialog = true;
    },
    saveFood() {
      this.closeFoodFormDialog();

      // Show a success alert
      this.alertOn = true;
      this.alertType = "success";
      this.alertMsg = "Food details saved successfully!";
    },
    deleteFoodConfirm() {
      this.foodDeleteDialog = false;

      // Show a success alert
      this.alertOn = true;
      this.alertType = "success";
      this.alertMsg = "Food deleted successfully!";
    },
    editFood(food) {
      this.editedIndex = this.foods.indexOf(food);
      this.editedFood = Object.assign({}, food);
      this.foodFormDialog = true;
    },
    deleteFood(food) {
      this.editedIndex = this.foods.indexOf(food);
      this.editedFood = Object.assign({}, food);
      this.foodDeleteDialog = true;
    },
    closeFoodFormDialog() {
      this.foodFormDialog = false;
      this.$nextTick(() => {
        this.editedFood = Object.assign({}, this.defaultFood);
        this.editedIndex = -1;
      });
    },
    closeFoodDeleteDialog() {
      this.foodDeleteDialog = false;
      this.$nextTick(() => {
        this.editedFood = Object.assign({}, this.defaultFood);
        this.editedIndex = -1;
      });
    },
  },
  components: { QuestionPrompt, FoodDetails },
};
</script>

<st
    FoodDetailsyle scoped>
</style>