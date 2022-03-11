<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- Load foods -->
      <data-loader
        :show="loadingData"
        :message="loadingDataMessage"
        :success="loadingDataSuccess"
      ></data-loader>

      <v-data-table
        v-if="!loadingData"
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

        <v-divider></v-divider>

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
                    v-model="selectedFood.name"
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

        <v-divider></v-divider>

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
import QuestionPrompt from "../components/QuestionPrompt.vue";
import Toast from "@/components/Toast.vue";
import DataLoader from "@/components/DataLoader.vue";

export default {
  title: "Menu",
  name: "Menu",
  async created() {
    try {
      this.loadingData = true;

      if (this.availableFoods.length === 0)
        await this.getAvailableFoodsAction();
      if (this.menu.length === 0) await this.getMenuAction();
    } catch (error) {
      this.loadingDataMessage = error.code;
      this.loadingDataSuccess = false;
    } finally {
      this.loadingData = false;
    }
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Cost", value: "cost", align: "center" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
      loadingData: true,
      loadingDataMessage: "Loading menu...",
      loadingDataSuccess: true,
      promptOverlay: false,
      searchFood: "",
      showToast: false,
      toastMessage: "",
      actionSuccess: true,
      foodAction: "new",
      foodFormDialog: false,
      deleteFoodPrompt: false,
      loadingFood: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      selectedFood: {
        id: "",
        name: "",
        cost: "",
      },
      defaultFood: {
        id: "",
        name: "",
        cost: "",
      },
    };
  },
  computed: {
    ...mapState(["menu", "availableFoods"]),
    ...mapGetters(["getFoodByName"]),
    formTitle() {
      return this.editedIndex === -1 ? "Add food" : "Edit food details";
    },
  },
  methods: {
    ...mapActions([
      "getMenuAction",
      "getAvailableFoodsAction",
      "addMenuFoodAction",
      "updateMenuFoodAction",
      "deleteMenuFoodAction",
    ]),
    foodNames() {
      const available = this.availableFoods.map((food) => food.name);
      const menu = this.menu.map((food) => food.name);

      return available.filter((f) => !menu.includes(f));
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
        this.actionSuccess = true;
      } catch (error) {
        this.toastMessage = error.code;
        this.actionSuccess = false;
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

        const foodObj = this.availableFoods.find(
          (f) => f.name === this.selectedFood.name
        );

        this.selectedFood.id = foodObj.id;

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
          this.actionSuccess = true;
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
  },
  components: {
    QuestionPrompt,
    Toast,
    DataLoader,
  },
};
</script>