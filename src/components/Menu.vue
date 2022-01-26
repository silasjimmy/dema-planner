<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="foods"
            :search="searchFood"
            sort-by="name"
          >
            <template v-slot:top>
              <v-toolbar flat>
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

                <!-- Food form dialog -->
                <v-dialog v-model="foodFormDialog" max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      rounded
                      class="text-none"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left>mdi-plus</v-icon>
                      Add food
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title
                      class="d-flex justify-space-between align-center"
                    >
                      <span class="text-h6">{{ formTitle }}</span>
                      <v-btn icon @click="closeFoodFormDialog">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <v-combobox
                              outlined
                              hide-details
                              dense
                              v-model="editedFood.name"
                              :items="allFoods"
                              type="text"
                              label="Food name"
                              prepend-icon="mdi-pizza"
                              color="success"
                            ></v-combobox>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              outlined
                              hide-details
                              dense
                              prepend-icon="mdi-home"
                              type="number"
                              label="Cost"
                              v-model="editedFood.cost"
                              color="success"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-text class="text-center">
                      <v-btn
                        rounded
                        color="success"
                        class="text-none"
                        @click="saveFood"
                      >
                        <v-icon left>mdi-content-save</v-icon>
                        Save
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-dialog>

                <!-- Delete food dialog -->
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
                        rounded
                        @click="closeFoodDeleteDialog"
                        class="text-none mr-4"
                        color="error"
                        >No</v-btn
                      >
                      <v-btn
                        text
                        rounded
                        class="text-none ml-4"
                        color="success"
                        @click="deleteFoodConfirm"
                        >Yes</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editFood(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteFood(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  title: "Menu",
  name: "Menu",
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Cost", value: "cost" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      foods: [{ name: "Chapati", cost: "10" }],
      allFoods: ["Chapati", "Ugali"],
      searchFood: "",
      foodFormDialog: false,
      foodDeleteDialog: false,
      editedIndex: -1,
      editedFood: {
        name: "",
        cost: "",
      },
      defaultFood: {
        name: "",
        cost: "",
      },
      alertOn: false,
      alertType: "success",
      alertMsg: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add food" : "Edit food details";
    },
  },
  methods: {
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