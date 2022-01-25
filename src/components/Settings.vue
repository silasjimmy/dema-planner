<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list dense class="transparent">
              <v-list-item-title>Appearance</v-list-item-title>
              <v-list-item-subtitle class="text--secondary"
                >Change the appearance of the app</v-list-item-subtitle
              >
              <v-list-item>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-switch
                        v-model="darkMode"
                        label="Dark mode"
                        color="grey darken-4"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-text>
            <v-list dense class="transparent">
              <v-list-item-title>Meals</v-list-item-title>
              <v-list-item-subtitle
                class="
                  text--secondary
                  d-flex
                  justify-space-between
                  align-center
                "
              >
                <span>Add or delete meals</span>
                <v-btn icon @click="newMealDialog = true" color="success">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-list-item-subtitle>
              <v-list-item>
                <v-container fluid>
                  <v-row>
                    <v-col
                      v-for="meal in meals"
                      :key="meal.name"
                      cols="12"
                      sm="6"
                      lg="4"
                      xl="3"
                    >
                      <v-card outlined>
                        <v-card-title class="subtitle-1 text-capitalize">{{
                          meal.name
                        }}</v-card-title>
                        <v-card-subtitle
                          class="subtitle-2 font-weight-thin text-uppercase"
                          >{{ meal.time }}</v-card-subtitle
                        >
                        <v-card-actions class="py-0">
                          <v-spacer></v-spacer>
                          <v-btn icon @click="deleteMeal(meal.id)">
                            <v-icon small>mdi-delete</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
            <v-dialog width="400" v-model="newMealDialog">
              <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  <h1 class="text-h6">New meal time</h1>
                  <v-btn icon @click="newMealDialog = !newMealDialog">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text class="pt-3">
                  <v-text-field
                    outlined
                    dense
                    type="text"
                    color="success"
                    label="Name"
                    prepend-icon="mdi-pizza"
                    v-model="newMeal.name"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    dense
                    type="time"
                    label="Time"
                    color="success"
                    prepend-icon="mdi-clock"
                    v-model="newMeal.time"
                  ></v-text-field>
                  <div class="text-center">
                    <v-btn
                      @click="createMealTime"
                      color="success"
                      class="text-none"
                      >Create</v-btn
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card-text>
          <v-card-text>
            <v-list dense class="transparent">
              <v-list-item-title>Advanced</v-list-item-title>
              <v-list-item-subtitle class="text--secondary"
                >Tread carefully</v-list-item-subtitle
              >
              <v-list-item>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <div>
                        <v-icon>mdi-map-marker</v-icon>
                        <span>Kilifi, Kenya</span>
                      </div>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-dialog
                        persistent
                        width="auto"
                        v-model="deleteAccountDialog"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            rounded
                            class="text-none"
                            v-bind="attrs"
                            v-on="on"
                            color="error"
                          >
                            <v-icon left>mdi-delete</v-icon>
                            Delete account
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-text class="py-0 text-center">
                            <p class="pt-4 subtitle-1">
                              Are you sure you want to delete your account?
                            </p>
                          </v-card-text>
                          <v-card-actions class="pt-0">
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              @click="
                                deleteAccountDialog = !deleteAccountDialog
                              "
                              class="text-none mr-4"
                              color="error"
                              >No</v-btn
                            >
                            <v-btn
                              text
                              class="text-none ml-4"
                              color="success"
                              @click="deleteAccountConfirm"
                              >Yes</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Delete meal time dialog -->
      <v-dialog persistent v-model="deleteMealTimeDialog" width="auto">
        <v-card>
          <v-card-text class="py-0 text-center">
            <p class="pt-4 subtitle-1">
              Are you sure you want to delete this meal time?
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="deleteMealTimeDialog = !deleteMealTimeDialog"
              class="text-none mr-4"
              color="error"
              >No</v-btn
            >
            <v-btn
              text
              class="text-none ml-4"
              color="success"
              @click="deleteMealTimeConfirm(mealIdToDelete)"
              >Yes</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  title: "Settings",
  name: "Settings",
  data() {
    return {
      deleteAccountDialog: false,
      deleteMealTimeDialog: false,
      newMealDialog: false,
      darkMode: false,
      mealIdToDelete: 0,
      newMeal: {
        name: "",
        time: "",
      },
      meals: [
        { id: 1, name: "breakfast", time: "07:00am" },
        { id: 2, name: "lunch", time: "01:00pm" },
        { id: 3, name: "snack", time: "04:00pm" },
        { id: 4, name: "supper", time: "07:00pm" },
      ],
    };
  },
  computed: {
    age() {
      // const a = (new Date() - new Date(this.profile.birthdate)) / 189210000;
      // console.log(a);
      return 22;
    },
  },
  methods: {
    deleteAccountConfirm() {
      console.log("Deleted account!");
      this.deleteAccountDialog = false;
    },
    deleteMeal(id) {
      this.mealIdToDelete = id;
      this.deleteMealTimeDialog = true;
    },
    deleteMealTimeConfirm(id) {
      console.log(`Deleted meal id: ${id}`);
      this.deleteMealTimeDialog = false;
    },
    createMealTime() {
      console.log(this.newMeal);
      this.newMealDialog = false;
    },
  },
};
</script>

<style scoped>
</style>