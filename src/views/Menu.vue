<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-data-table
        :loading="menu.length === 0"
        loading-text="Fetching menu... please wait"
        :items-per-page="5"
        :headers="headers"
        :items="menu"
        :search="searchFood"
        sort-by="name"
      >
        <template v-slot:top>
          <v-toolbar flat class="rounded-lg">
            <!-- Search text field -->
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
              @click="addNewFood"
              class="text-none"
            >
              Add food
            </v-btn>

            <!-- Delete food dialog -->
            <question-prompt
              :question="'Are you sure you want to delete this food?'"
              :dialog="deleteFoodPrompt"
              :overlay="promptOverlay"
              @cancel="deleteFoodCancel"
              @confirm="deleteFoodConfirm"
            ></question-prompt>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-3" @click="editFood(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteFood(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Food form dialog -->
    <v-dialog persistent v-model="foodFormDialog" max-width="450px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h6">{{ formTitle }}</span>
          <v-btn icon @click="foodFormDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form ref="foodForm">
            <v-container>
              <v-row>
                <!-- Food name field  -->
                <v-col cols="12">
                  <v-combobox
                    outlined
                    dense
                    hide-details
                    :rules="[rules.required]"
                    v-model="selectedFood.food.name"
                    :items="foodNames()"
                    type="text"
                    label="Food name"
                    prepend-icon="mdi-pizza"
                    color="success"
                  ></v-combobox>
                </v-col>
                <!-- Food cost field -->
                <v-col cols="12">
                  <v-text-field
                    outlined
                    hide-details
                    hide-spin-buttons
                    dense
                    :rules="[rules.required]"
                    prepend-icon="mdi-cash"
                    type="number"
                    label="Cost"
                    v-model="selectedFood.cost"
                    color="success"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            :loading="loadingFood"
            color="success"
            class="text-none"
            @click="saveFood"
          >
            Save
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Action toast -->
    <v-snackbar
      :transition="
        showToast ? 'scroll-x-reverse-transition' : 'scroll-x-transition'
      "
      :timeout="3000"
      v-model="showToast"
    >
      <div class="d-flex align-center">
        <v-icon color="success">mdi-check-circle</v-icon>
        <span class="ml-2">{{ toastMessage }}</span>
      </div>

      <template v-slot:action>
        <v-btn color="success" text @click="showToast = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import QuestionPrompt from "../components/QuestionPrompt.vue";

export default {
  title: "Menu",
  name: "Menu",
  async created() {
    await this.getAllFoodsAction();
    await this.getMenuAction();
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "food.name", align: "center" },
        { text: "Cost", value: "cost", align: "center" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
      promptOverlay: false,
      searchFood: "",
      showToast: false,
      toastMessage: "",
      foodAction: "new",
      foodFormDialog: false,
      deleteFoodPrompt: false,
      loadingFood: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      selectedFood: {
        food: {
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
        cost: "",
      },
      defaultFood: {
        food: {
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
        cost: "",
      },
    };
  },
  computed: {
    ...mapState(["menu", "allFoods"]),
    ...mapGetters(["getFoodByName"]),
    formTitle() {
      return this.editedIndex === -1 ? "Add food" : "Edit food details";
    },
  },
  methods: {
    ...mapActions([
      "getMenuAction",
      "getAllFoodsAction",
      "addMenuFoodAction",
      "updateMenuFoodAction",
      "deleteMenuFoodAction",
    ]),
    foodNames() {
      return this.allFoods.map((food) => food.name);
    },
    addNewFood() {
      this.selectedFood = JSON.parse(JSON.stringify(this.defaultFood));
      this.foodAction = "new";
      this.foodFormDialog = true;
    },
    editFood(food) {
      this.selectedFood = Object.assign({}, food);
      this.foodAction = "edit";
      this.foodFormDialog = true;
    },
    deleteFood(food) {
      this.selectedFood = Object.assign({}, food);
      this.deleteFoodPrompt = true;
    },
    async deleteFoodConfirm() {
      this.promptOverlay = true;

      try {
        await this.deleteMenuFoodAction(this.selectedFood);
        this.toastMessage = "Food deleted successfully!";
      } catch (error) {
        this.toastMessage = error.code;
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
    async saveFood() {
      if (this.$refs.foodForm.validate()) {
        this.loadingFood = true;

        try {
          if (this.foodAction === "new") {
            // Add the food to menu
            this.addMenuFoodAction(this.selectedFood);

            this.toastMessage = "Food added successfully!";
          } else {
            // // Edit food
            await this.updateMenuFoodAction(this.selectedFood);
            this.toastMessage = "Food updated successfully!";
          }
        } catch (error) {
          this.toastMessage = error.code;
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
  },
  components: {
    QuestionPrompt,
  },
};
</script>