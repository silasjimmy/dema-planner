<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
              hide-details
              outlined
              dense
              class="shrink"
              v-model="searchFood"
              append-icon="mdi-magnify"
              label="Search..."
              color="green"
            ></v-text-field>
            <v-spacer></v-spacer>

            <!-- Food ad/edit dialog -->
            <v-dialog v-model="foodFormDialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  <span class="text-h6">{{ formTitle }}</span>
                  <v-btn icon @click="closeFoodFormDialog">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Name"
                          v-model="editedFood.name"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-text class="text-center">
                  <v-btn color="green" class="white--text" @click="saveFood">
                    save
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>

            <!-- Food delete dialog -->
            <v-dialog persistent width="auto" v-model="foodDeleteDialog">
              <v-card>
                <v-card-text class="py-0 text-center">
                  <p class="pt-4 subtitle-1">
                    Are you sure you want to delete this food?
                  </p>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    @click="closeFoodDeleteDialog"
                    class="text-none mr-4"
                    color="error"
                    >No</v-btn
                  >
                  <v-btn
                    text
                    class="text-none ml-4"
                    color="success"
                    @click="deleteFoodConfirm"
                    >Yes</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table
            fixed-header
            class="elevation-4 text-center"
            show-expand
            single-expand
            :expanded.sync="expanded"
            item-key="name"
            :headers="headers"
            :items="foods"
            :items-per-page="5"
            :search="searchFood"
            sort-by="name"
            color="success"
          >
            <template v-slot:item.nutrient="{ item }">
              <span :class="setNutrientColor(item.nutrient)">{{
                item.nutrient
              }}</span>
            </template>
            <template v-slot:item.calories="{ item }">
              <v-chip dark small :color="setCaloriesColor(item.nutrient)">
                {{ item.calories }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editFood(item)"> mdi-pencil </v-icon>
              <v-icon small class="mx-3" @click="deleteFood(item)">
                mdi-delete
              </v-icon>
              <v-icon small @click="viewFoodInfoDialog = true">mdi-pin</v-icon>
            </template>
            <template v-slot:expanded-item="{ item }">
              <span>More information about {{ item.name }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  title: "Foods",
  name: "Foods",
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Nutrient", value: "nutrient" },
        { text: "Calories (cal)", value: "calories" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "View more", value: "data-table-expand" },
      ],
      foods: [
        { name: "Chapati", nutrient: "Carbohydrate", calories: 10 },
        { name: "Githeri", nutrient: "Protein", calories: 10 },
        { name: "Banana", nutrient: "Vitamin", calories: 10 },
      ],
      foodFormDialog: false,
      foodDeleteDialog: false,
      viewFoodInfoDialog: false,
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
      expanded: [],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New food" : "Edit food";
    },
  },
  methods: {
    setNutrientColor(nutrient) {
      if (nutrient === "Carbohydrate") return "blue-grey--text";
      else if (nutrient === "Protein") return "green--text";
      else return "orange--text";
    },
    setCaloriesColor(nutrient) {
      if (nutrient === "Carbohydrate") return "blue-grey";
      else if (nutrient === "Protein") return "green";
      else return "orange";
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
};
</script>

<style scoped>
</style>