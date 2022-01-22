<template>
  <v-container class="py-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 text-center font-weight-medium my-4">
          Create your profile
        </h1>
      </v-col>
      <v-col cols="7" class="mx-auto">
        <v-tabs fixed-tabs color="success">
          <v-tab class="text-none subtitle-1 font-weight-medium"
            >Consumer</v-tab
          >
          <v-tab class="text-none subtitle-1 font-weight-medium">Eatery</v-tab>

          <v-tab-item>
            <v-card elevation="0" class="ma-4">
              <v-card-title class="font-weight-medium">{{
                currentTitle
              }}</v-card-title>
              <v-card-subtitle>{{ currentSubtitle }}</v-card-subtitle>

              <v-window v-model="windowStep">
                <v-window-item :value="1">
                  <v-subheader class="text-center">Primary</v-subheader>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          hide-details
                          dense
                          outlined
                          v-model="consumerProfile.name"
                          label="Name"
                          color="success"
                          type="text"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          hide-details
                          dense
                          outlined
                          v-model="consumerProfile.dateOfBirth"
                          label="Date of birth"
                          color="success"
                          type="date"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          outlined
                          hide-details
                          dense
                          v-model="consumerProfile.gender"
                          color="success"
                          item-color="success"
                          :items="['Male', 'Female']"
                          label="Gender"
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          hide-details
                          dense
                          outlined
                          readonly
                          v-model="consumerProfile.location"
                          label="Location"
                          color="success"
                          type="text"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-subheader class="text-center">Secondary</v-subheader>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          hide-details
                          dense
                          outlined
                          hide-spin-buttons
                          v-model="consumerProfile.weight.amount"
                          label="Weight"
                          :suffix="consumerProfile.weight.units"
                          color="success"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          hide-details
                          dense
                          outlined
                          hide-spin-buttons
                          v-model="consumerProfile.height.amount"
                          label="Height"
                          color="success"
                          type="number"
                          :suffix="consumerProfile.height.units"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          outlined
                          hide-details
                          dense
                          v-model="consumerProfile.activityLevel"
                          color="success"
                          item-color="success"
                          :items="[
                            'Very active',
                            'Lightly active',
                            'Not active',
                          ]"
                          label="Activity level"
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          outlined
                          hide-details
                          dense
                          v-model="consumerProfile.healthCondition"
                          color="success"
                          item-color="success"
                          :items="['None', 'Diabetic', 'High blood pressure']"
                          label="Health condition"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" class="d-flex flex-column align-center">
                        <span class="subtitle-1 grey--text text--darken-1"
                          >Body fat</span
                        >
                        <v-chip-group
                          manadatory
                          v-model="consumerProfile.bodyFat"
                          active-class="success--text"
                          class="d-inline-block"
                        >
                          <v-chip filter outlined class="mx-4" value="Low"
                            >Low</v-chip
                          >
                          <v-chip filter outlined class="mx-4" value="Medium"
                            >Medium</v-chip
                          >
                          <v-chip filter outlined class="mx-4" value="High"
                            >High</v-chip
                          >
                        </v-chip-group>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-window-item>

                <v-window-item :value="2">
                  <v-subheader>Primary diet</v-subheader>
                  <v-card-text>
                    <v-item-group v-model="consumerProfile.diet">
                      <v-row dense>
                        <v-col cols="4">
                          <v-item v-slot="{ active, toggle }" value="Anything">
                            <v-card
                              outlined
                              :class="
                                active ? 'green--text font-weight-bold' : ''
                              "
                              class="d-flex flex-column align-center py-2"
                              :color="active ? 'green lighten-5' : ''"
                              @click="toggle"
                            >
                              <v-img
                                width="50px"
                                height="50px"
                                class="my-1 rounded-lg b"
                              ></v-img>
                              <span class="my-1">Anything</span>
                            </v-card>
                          </v-item>
                        </v-col>
                      </v-row>
                    </v-item-group>
                  </v-card-text>
                  <v-subheader>Allergies</v-subheader>
                  <v-card-text>
                    <v-item-group multiple v-model="consumerProfile.allergies">
                      <v-container class="pa-0">
                        <v-row dense>
                          <v-col cols="3">
                            <v-item v-slot="{ active, toggle }" value="Nuts">
                              <v-card
                                outlined
                                :class="active ? 'white--text' : ''"
                                class="pa-2 text-center"
                                :color="active ? 'green' : ''"
                                @click="toggle"
                              >
                                <span class="subtitle-2 font-weight-regular"
                                  >Nuts</span
                                >
                              </v-card>
                            </v-item>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-expansion-panels flat class="mt-4">
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            hide-actions
                            class="text-center"
                          >
                            <template v-slot:default="{ open }">
                              <span class="green--text subtitle-2"
                                >View {{ open ? "less" : "more" }}</span
                              >
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-container class="pa-0">
                              <v-row dense>
                                <v-col cols="4">
                                  <v-item
                                    v-slot="{ active, toggle }"
                                    value="Fish"
                                  >
                                    <v-card
                                      outlined
                                      :class="active ? 'white--text' : ''"
                                      class="pa-2"
                                      :color="active ? 'green' : ''"
                                      @click="toggle"
                                    >
                                      <span
                                        class="subtitle-2 font-weight-regular"
                                        >Fish</span
                                      >
                                    </v-card>
                                  </v-item>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-item-group>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="3">
                  <v-card-text>
                    <div class="d-flex align-center">
                      <span class="subtitle-1 mr-2">I want to:</span>
                      <v-chip-group
                        mandatory
                        v-model="consumerProfile.objective"
                        active-class="success--text"
                        class="d-inline-block"
                      >
                        <v-chip filter outlined value="Loose weight"
                          >Loose weight</v-chip
                        >
                        <v-chip filter outlined value="Maintain weight"
                          >Maintain my weight</v-chip
                        >
                        <v-chip filter outlined value="Add weight"
                          >Add weight</v-chip
                        >
                      </v-chip-group>
                    </div>
                    <div class="d-flex align-center my-4">
                      <span class="subtitle-1 mr-2">Set a weight goal?</span>
                      <v-btn-toggle group mandatory tile color="success">
                        <v-btn
                          plain
                          @click="setWeightGoal = false"
                          class="text-none subtitle-1"
                          >No, am good</v-btn
                        >
                        <v-btn
                          plain
                          @click="setWeightGoal = true"
                          class="text-none subtitle-1"
                          >Yes please</v-btn
                        >
                      </v-btn-toggle>
                      <v-slide-x-transition>
                        <v-card
                          elevation="0"
                          width="170px"
                          v-if="setWeightGoal"
                        >
                          <v-text-field
                            hide-details
                            dense
                            outlined
                            hide-spin-buttons
                            :label="consumerProfile.objective"
                            v-model="consumerProfile.weightGoal"
                            type="number"
                            color="success"
                            suffix="kg"
                          ></v-text-field>
                        </v-card>
                      </v-slide-x-transition>
                    </div>
                    <div class="d-flex align-center">
                      <span class="subtitle-1 mr-2"
                        >Average daily spendings on meals:</span
                      >
                      <v-card elevation="0" width="100px">
                        <v-text-field
                          outlined
                          dense
                          hide-details
                          hide-spin-buttons
                          v-model="consumerProfile.dailySpending.amount"
                          color="success"
                          :suffix="consumerProfile.dailySpending.units"
                          type="number"
                          class="shrink"
                        ></v-text-field>
                      </v-card>
                    </div>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="4">
                  <v-card-text>
                    <div class="text-center mb-2">
                      <v-img
                        contain
                        class="mx-auto mb-1"
                        width="100px"
                        height="100px"
                        src="../assets/logo.png"
                      ></v-img>
                      <v-btn text @click="termsAndConditionsDialog = true">
                        <span class="subtitle-1 text-none font-weight-medium"
                          ><strong class="green--text">Dema</strong> terms and
                          conditions</span
                        >
                      </v-btn>

                      <!-- Terms and conditions dialog -->
                      <v-dialog
                        scrollable
                        v-model="termsAndConditionsDialog"
                        width="600"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <span
                            class="green--text"
                            v-bind="attrs"
                            v-on="on"
                            @click.stop
                          ></span>
                        </template>

                        <v-card height="70vh">
                          <v-card-title
                            class="d-flex align-center justify-space-between"
                          >
                            <span class="text-h6">Terms &amp; Conditions</span>
                            <v-btn
                              icon
                              @click="termsAndConditionsDialog = false"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-card-title>
                          <v-card-text>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum. Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Quos modi unde quis harum nihil
                              possimus dolorem hic, ea mollitia dolor
                              asperiores, nemo quasi aliquam aperiam voluptatem.
                              Dolores voluptatem consectetur dolor.
                            </p>
                            <v-checkbox
                              label="I agree with these terms and conditions"
                              color="success"
                              hide-details
                              dense
                            ></v-checkbox>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </div>
                    <v-row>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="agreeTermsAndConditions"
                          label="I have read and i accept the terms and conditions"
                          color="success"
                          hide-details
                          dense
                        >
                        </v-checkbox>
                        <v-checkbox
                          v-model="agreeToReceiveNews"
                          color="success"
                          label="Send me any news or updates about Dema"
                          hide-details
                          dense
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-window-item>
              </v-window>
              <v-card-actions class="py-4">
                <v-btn
                  rounded
                  text
                  class="text-none"
                  :disabled="windowStep === 1"
                  v-if="windowStep > 1"
                  @click="windowStep--"
                >
                  <v-icon left>mdi-chevron-left</v-icon>
                  <span class="text-none mr-2">Back</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  rounded
                  text
                  :disabled="windowStep === 4"
                  v-if="windowStep < 4"
                  @click="windowStep++"
                >
                  <span class="text-none ml-2">Next</span>
                  <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn
                  rounded
                  v-if="windowStep === 4"
                  @click="createProfile"
                  :disabled="!agreeTermsAndConditions"
                  color="success"
                  ><span class="text-none mx-2">Finish</span></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item>hello eatery</v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { getFirestore, setDoc, doc } from "firebase/firestore";

export default {
  name: "CreateProfile",
  title: "Create profile",
  data() {
    return {
      windowStep: 1,
      agreeTermsAndConditions: false,
      agreeToReceiveNews: true,
      termsAndConditionsDialog: false,
      setWeightGoal: false,
      consumerProfile: {
        name: "",
        dateOfBirth: "",
        weight: { amount: null, units: "kg" },
        height: { amount: null, units: "cm" },
        gender: "",
        location: "Kilifi, Kenya",
        activityLevel: "",
        healthCondition: "",
        bodyFat: "",
        diet: "",
        allergies: [],
        objective: "Maintain weight",
        weightGoal: "",
        dailySpending: { amount: null, units: "ksh" },
        receiveNews: true,
      },
    };
  },
  computed: {
    currentTitle() {
      switch (this.windowStep) {
        case 1:
          return "Personal information";
        case 2:
          return "Dietary information";
        case 3:
          return "Goals";
        default:
          return "Finish up";
      }
    },
    currentSubtitle() {
      switch (this.windowStep) {
        case 1:
          return "Take your time and tell us about yourself.";
        case 2:
          return "Select your preferred diet and any foods you are allergic to.";
        case 3:
          return "Anything you want to achieve by doing this?";
        default:
          return "Just one more thing...";
      }
    },
  },
  methods: {
    createProfile() {
      console.log(this.consumerProfile);
      // const db = getFirestore();

      // setDoc(doc(db, "users", "jimmysilas19@gmail.com"), {
      //   fullname: this.fullname,
      // })
      //   .then((res) => {
      //     console.log("Doc written:", res);
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
    },
  },
};
</script>

<style>
</style>