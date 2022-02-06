<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-list flat subheader>
        <v-subheader>General</v-subheader>

        <v-list-item-group v-model="settings" multiple active-class="">
          <v-list-item class="mb-1" two-line>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox color="success" :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
                <v-list-item-subtitle
                  >Notify me about news and updates about
                  Dema</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item class="mb-1" two-line>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox color="success" :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Sound</v-list-item-title>
                <v-list-item-subtitle
                  >Alert me of any new notifications or
                  messages</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item class="mb-3" two-line>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox color="success" :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Location</v-list-item-title>
                <v-list-item-subtitle
                  >Auto-update my location wherever i go</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>

        <v-divider></v-divider>

        <v-subheader>Account</v-subheader>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Language</v-list-item-title>
            <v-list-item-subtitle
              >Change to your preferred language
            </v-list-item-subtitle>
            <v-list-item-subtitle class="ml-1">
              <v-sheet height="auto" class="py-3" width="250px">
                <v-combobox
                  hide-details
                  dense
                  outlined
                  color="success"
                  v-model="selectedLanguage"
                  item-color="success"
                  :items="languages"
                ></v-combobox>
              </v-sheet>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Theme</v-list-item-title>
            <v-list-item-subtitle
              >Choose your preferred theme</v-list-item-subtitle
            >
            <v-list-item-subtitle class="ml-1">
              <v-sheet class="py-3" height="auto">
                <v-item-group
                  mandatory
                  active-class="white--text"
                  v-model="appTheme"
                >
                  <v-item value="light-theme" v-slot="{ active, toggle }">
                    <v-btn
                      elevation="0"
                      width="120px"
                      height="42px"
                      class="rounded text-none mr-4"
                      :color="active ? 'grey darken-2' : 'grey lighten-2'"
                      @click="toggle"
                    >
                      <v-icon left>mdi-white-balance-sunny</v-icon>
                      Light
                    </v-btn>
                  </v-item>
                  <v-item value="dark-theme" v-slot="{ active, toggle }">
                    <v-btn
                      elevation="0"
                      width="120px"
                      height="42px"
                      class="rounded text-none"
                      @click="toggle"
                      :color="active ? 'grey darken-2' : 'grey lighten-2'"
                    >
                      <v-icon left>mdi-weather-night</v-icon>
                      Dark
                    </v-btn>
                  </v-item>
                </v-item-group>
              </v-sheet>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Meal times</v-list-item-title>
          <v-list-item-subtitle>Add or delete meal times</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->

        <v-divider></v-divider>

        <v-subheader>Advanced</v-subheader>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-list-item-subtitle>Change your password</v-list-item-subtitle>
            <v-list-item-subtitle class="py-3 ml-1"
              >s*******</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="grey">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle
              >Update to your current location</v-list-item-subtitle
            >
            <v-list-item-subtitle class="py-3">
              <v-icon>mdi-map-marker</v-icon>
              <span class="ml-2 text-capitalize">city, country</span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="grey">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Delete account</v-list-item-title>
            <v-list-item-subtitle
              >Remember all your data will be lost</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="grey">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <!-- <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list dense class="transparent">
              <v-list-item-title>General settings</v-list-item-title>
              <v-list-item-subtitle class="text--secondary"
                >Appearance</v-list-item-subtitle
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
              <v-list-item-title>Meal time</v-list-item-title>
              <v-list-item-subtitle
                class="
                  text--secondary
                  d-flex
                  justify-space-between
                  align-center
                "
              >
                <span>Add or delete time of meals</span>
                <v-btn
                  rounded
                  text
                  @click="newMealTimeDialog = true"
                  class="text-none"
                >
                  <v-icon left>mdi-plus</v-icon>
                  New meal time
                </v-btn>
              </v-list-item-subtitle>
              <v-list-item>
                <v-container fluid>
                  <v-row>
                    <v-col
                      v-for="meal in mealTimes"
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

            <v-dialog width="400" v-model="newMealTimeDialog">
              <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  <h1 class="text-h6">New meal time</h1>
                  <v-btn icon @click="newMealTimeDialog = !newMealTimeDialog">
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
                >Current location</v-list-item-subtitle
              >
              <v-list-item>
                <v-container>
                  <v-dialog
                    persistent
                    width="auto"
                    v-model="deleteAccountDialog"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        text
                        rounded
                        v-bind="attrs"
                        v-on="on"
                        class="text-capitalize"
                      >
                        <v-icon left>mdi-map-marker</v-icon>
                        Kilifi, Kenya
                      </v-btn>
                    </template>

                    <v-card max-width="50vw">
                      <v-card-text class="py-0 text-center">
                        <p class="pt-4 subtitle-1">
                          Turn location on to update to your current location.
                        </p>
                      </v-card-text>
                      <v-card-actions class="pt-0">
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          rounded
                          @click="deleteAccountDialog = !deleteAccountDialog"
                          class="text-none mr-4"
                          color="error"
                          >No</v-btn
                        >
                        <v-btn
                          text
                          rounded
                          class="text-none ml-4"
                          color="success"
                          @click="deleteAccountConfirm"
                          >Yes</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-container>
              </v-list-item>

              <v-list-item>
                <v-container class="text-center">
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

                    <v-card max-width="50vw">
                      <v-card-text class="py-0 text-center">
                        <p class="pt-4 subtitle-1">
                          Are you sure you want to delete your account? Once you
                          delete your account all data will be lost.
                        </p>
                      </v-card-text>
                      <v-card-actions class="pt-0">
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          rounded
                          @click="deleteAccountDialog = !deleteAccountDialog"
                          class="text-none mr-4"
                          color="error"
                          >No</v-btn
                        >
                        <v-btn
                          text
                          rounded
                          class="text-none ml-4"
                          color="success"
                          @click="deleteAccountConfirm"
                          >Yes</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-container>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

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
    </v-row> -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  title: "Settings",
  name: "Settings",
  created() {
    this.$store.commit("setDashboardLinks", localStorage.getItem("userRole"));
    this.getMealTimesAction();
  },
  data() {
    return {
      deleteAccountDialog: false,
      deleteMealTimeDialog: false,
      newMealTimeDialog: false,
      darkMode: false,
      mealIdToDelete: 0,
      settings: [],
      appTheme: "light-theme",
      selectedLanguage: ["English"],
      languages: ["English", "Swahili"],
      newMeal: {
        name: "",
        time: "",
      },
    };
  },
  computed: {
    ...mapState(["mealTimes"]),
    age() {
      // const a = (new Date() - new Date(this.profile.birthdate)) / 189210000;
      // console.log(a);
      return 22;
    },
  },
  methods: {
    ...mapActions(["getMealTimesAction"]),
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
      this.newMealTimeDialog = false;
    },
    viewMealTime(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
</style>