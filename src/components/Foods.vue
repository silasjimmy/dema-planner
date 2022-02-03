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
          label="Enter food name"
          color="green"
        ></v-text-field>

        <v-spacer></v-spacer>

        <!-- Add food button -->
        <v-btn rounded color="success" @click="addFood" class="text-none">
          Add food
        </v-btn>

        <!-- Food add/edit dialog -->
        <v-dialog persistent scrollable v-model="foodFormDialog" width="50vw">
          <v-card>
            <v-card-title>
              <span class="text-h6">{{ formTitle }}</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="foodFormDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text style="height: 60vh">
              <v-form>
                <avatar-field class="my-4"></avatar-field>
                <v-container class="pa-0">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        outlined
                        dense
                        hide-details
                        color="success"
                        label="Name"
                        type="text"
                        v-model="selectedFood.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        dense
                        outlined
                        hide-details
                        color="success"
                        label="Food group"
                        type="text"
                        item-color="success"
                        v-model="selectedFood.group"
                        :items="foodValues.groups"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        dense
                        outlined
                        hide-details
                        color="success"
                        label="Nutrient"
                        type="text"
                        item-color="success"
                        v-model="selectedFood.nutrient.name"
                        :items="foodValues.nutrients"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        outlined
                        dense
                        hide-details
                        hide-spin-buttons
                        color="success"
                        type="number"
                        label="Nutrient amount"
                        :suffix="selectedFood.nutrient.units"
                        v-model="selectedFood.nutrient.amount"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        dense
                        outlined
                        hide-details
                        color="success"
                        label="Food form"
                        type="text"
                        item-color="success"
                        v-model="selectedFood.form"
                        :items="foodValues.forms"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        outlined
                        dense
                        hide-details
                        hide-spin-buttons
                        color="success"
                        type="number"
                        label="Calories"
                        :suffix="selectedFood.calories.units"
                        v-model="selectedFood.calories.amount"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-combobox
                        outlined
                        dense
                        multiple
                        hide-details
                        hide-selected
                        color="success"
                        label="Regions"
                        item-color="success"
                        :items="foodValues.regions"
                        v-model="selectedFood.regions"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6">
                      <v-combobox
                        multiple
                        small-chips
                        outlined
                        dense
                        clearable
                        hide-details
                        placeholder="Example: 1.cup.milk"
                        color="success"
                        v-model="selectedFood.ingredients"
                        label="Ingredients"
                      >
                        <template v-slot:no-data>
                          <p class="my-0 pa-2">
                            Type <b>amount.unit.item</b> and press
                            <kbd>enter</kbd> to add.
                          </p>
                        </template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="12">
                      <v-combobox
                        multiple
                        small-chips
                        outlined
                        dense
                        clearable
                        hide-details
                        placeholder="Example: 1.Add sugar to the water and stir"
                        color="success"
                        v-model="selectedFood.instructions"
                        label="Instructions"
                      >
                        <template v-slot:no-data>
                          <p class="my-0 pa-2 text-center">
                            Type <b>step.description</b> and press
                            <kbd>enter</kbd> to add.
                          </p>
                        </template>
                      </v-combobox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

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
          :dialog="deleteFoodPrompt"
          @cancel="deleteFoodCancel"
          @confirm="deleteFoodConfirm"
        ></question-prompt>

        <!-- Food details dialog -->
        <food-details
          :food="selectedFood"
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
    </v-card>
  </v-container>
</template>

<script>
import AvatarField from "./AvatarField.vue";
import FoodDetails from "./FoodDetails.vue";
import QuestionPrompt from "./QuestionPrompt.vue";
import { mapState, mapActions } from "vuex";

export default {
  title: "Foods",
  name: "Foods",
  created() {
    this.getFoodsAction();
  },
  data() {
    return {
      searchFood: "",
      deleteFoodPrompt: false,
      foodFormDialog: false,
      editFoodIndex: -1,
      foodDetailsDialog: false,
      selectedFood: {
        id: "",
        avatar: "",
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
        ingredients: [],
        regions: [],
        instructions: [],
      },
      defaultFood: {
        id: "",
        avatar: "",
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
        ingredients: [],
        regions: [],
        instructions: [],
      },
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Nutrient", value: "nutrient", align: "center" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
      foodValues: {
        nutrients: [
          { text: "Proteins", value: "proteins" },
          { text: "Carbohydrates", value: "carbohydrates" },
          { text: "Vitamins", value: "vitamins" },
        ],
        groups: [
          { text: "Starch", value: "starch" },
          { text: "Animal proteins", value: "animal proteins" },
          { text: "Vegetables", value: "vegetables" },
        ],
        forms: [
          { text: "Solid", value: "solid" },
          { text: "Liquid", value: "liquid" },
          { text: "Plasma", value: "plasma" },
        ],
        regions: [
          { text: "Kenya", value: "kenya" },
          { text: "Uganda", value: "uganda" },
          { text: "Tanzania", value: "tanzania" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getFoodsAction"]),
    addFood() {
      this.editFoodIndex = -1;
      this.selectedFood = Object.assign({}, this.defaultFood);
      this.foodFormDialog = true;
    },
    vieFoodDetails(food) {
      this.editFoodIndex = this.foods.indexOf(food);
      this.selectedFood = Object.assign({}, food);
      this.foodDetailsDialog = true;
    },
    editFood(food) {
      this.editFoodIndex = this.foods.indexOf(food);
      this.selectedFood = Object.assign({}, food);
      this.foodFormDialog = true;
    },
    saveFood() {
      console.log("Save food!");
      this.foodFormDialog = false;
    },
    deleteFood(food) {
      this.editFoodIndex = this.foods.indexOf(food);
      this.selectedFood = Object.assign({}, food);
      this.deleteFoodPrompt = true;
    },
    deleteFoodConfirm() {
      this.foods.splice(this.selectedFood, 1);
      this.selectedFood = Object.assign({}, this.defaultFood);
      this.deleteFoodPrompt = false;
    },
    deleteFoodCancel() {
      this.selectedFood = Object.assign({}, this.defaultFood);
      this.deleteFoodPrompt = false;
    },
  },
  computed: {
    ...mapState(["foods"]),
    formTitle() {
      return this.editFoodIndex === -1 ? "New food" : "Edit food";
    },
  },
  components: {
    QuestionPrompt,
    FoodDetails,
    AvatarField,
  },
};
</script>
