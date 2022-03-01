<template>
  <v-card flat :width="cardWidth" class="mx-auto">
    <v-card-title class="justify-center">Create your profile</v-card-title>
    <v-card-subtitle class="text-center"
      >This will help us know you better</v-card-subtitle
    >

    <v-card-text>
      <v-tabs fixed-tabs icons-and-text v-model="tab" color="success">
        <v-tabs-slider></v-tabs-slider>
        <v-tab class="text-capitalize">
          <span v-if="$vuetify.breakpoint.smAndUp">Consumer</span>
          <v-icon>mdi-account-details</v-icon>
        </v-tab>
        <v-tab class="text-capitalize">
          <span v-if="$vuetify.breakpoint.smAndUp">Eatery</span>
          <v-icon>mdi-table-chair</v-icon>
        </v-tab>
      </v-tabs>
    </v-card-text>

    <v-card-text>
      <!-- Action alert -->
      <v-alert
        text
        dismissible
        dense
        v-model="showAlert"
        transition="scale-transition"
        :type="actionSuccess ? 'success' : 'error'"
        :icon="actionSuccess ? 'mdi-account-check' : 'mdi-account-alert'"
        class="rounded-lg"
      >
        {{ alertMessage }}
      </v-alert>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card outlined class="rounded-lg">
            <v-card-title>{{ currentConsumerTitle }}</v-card-title>
            <v-card-subtitle>{{ currentConsumerSubtitle }}</v-card-subtitle>

            <v-divider></v-divider>

            <v-window v-model="consumerWindowStep">
              <v-window-item :value="1">
                <v-subheader>Primary</v-subheader>
                <v-form ref="consumerOne" lazy-validation>
                  <v-container>
                    <v-row>
                      <!-- Name -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          :rules="[rules.required]"
                          v-model="consumerProfile.name"
                          label="Name"
                          color="success"
                          type="text"
                          prepend-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                      <!-- Date of birth -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          :rules="[rules.required, rules.age]"
                          v-model="consumerProfile.dateOfBirth"
                          label="Date of birth"
                          color="success"
                          type="date"
                          prepend-icon="mdi-calendar"
                        ></v-text-field>
                      </v-col>
                      <!-- Gender -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-select
                          outlined
                          dense
                          :rules="[rules.required]"
                          v-model="consumerProfile.gender"
                          color="success"
                          item-color="success"
                          :items="['Male', 'Female']"
                          label="Gender"
                          prepend-icon="mdi-gender-male-female"
                        ></v-select>
                      </v-col>
                      <!-- Town -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          readonly
                          :rules="[rules.required]"
                          v-model="consumerProfile.town"
                          label="City"
                          color="success"
                          type="text"
                          prepend-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <!-- Country -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          readonly
                          :rules="[rules.required]"
                          v-model="consumerProfile.country"
                          label="Country"
                          color="success"
                          type="text"
                          prepend-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <!-- <v-subheader class="text-center">Secondary</v-subheader>
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
                  </v-container> -->
              </v-window-item>

              <!-- <v-window-item :value="2">
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
                </v-window-item> -->

              <v-window-item :value="2">
                <v-card-text>
                  <div class="text-center mb-2">
                    <v-img
                      contain
                      class="mx-auto mb-1"
                      width="100px"
                      height="100px"
                      src="../assets/logo.png"
                    ></v-img>
                    <v-btn
                      text
                      rounded
                      @click="termsAndConditionsDialog = true"
                    >
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
                          <v-btn icon @click="termsAndConditionsDialog = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-card-text>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum. Lorem ipsum
                            dolor sit, amet consectetur adipisicing elit. Quos
                            modi unde quis harum nihil possimus dolorem hic, ea
                            mollitia dolor asperiores, nemo quasi aliquam
                            aperiam voluptatem. Dolores voluptatem consectetur
                            dolor.
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

                  <!-- Terms and conditions checkbox -->
                  <v-checkbox
                    v-model="agreeTermsAndConditions"
                    label="I have read and i accept the terms and conditions"
                    color="success"
                    hide-details
                    dense
                  >
                  </v-checkbox>

                  <!-- Receive news checkbox -->
                  <v-checkbox
                    v-model="consumerSettings.receiveNews"
                    color="success"
                    label="Send me any news or updates about Dema"
                    hide-details
                    dense
                  ></v-checkbox>
                </v-card-text>
              </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                rounded
                text
                class="text-none"
                :disabled="consumerWindowStep === 1"
                v-if="consumerWindowStep > 1"
                @click="consumerWindowStep--"
              >
                <v-icon left>mdi-chevron-left</v-icon>
                <span class="mr-2">Back</span>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                rounded
                text
                class="text-none"
                :disabled="consumerWindowStep === 2"
                v-if="consumerWindowStep < 2"
                @click="consumerNext"
              >
                <span class="ml-2">Next</span>
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>

              <v-btn
                rounded
                v-if="consumerWindowStep === 2"
                @click="createProfile('consumer')"
                :disabled="!agreeTermsAndConditions"
                :loading="consumerLoading"
                color="success"
                class="text-none"
              >
                <v-icon left>mdi-check-all</v-icon>
                <span class="mr-2">Finish</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card outlined class="rounded-lg">
            <v-card-title>{{ currentEateryTitle }}</v-card-title>
            <v-card-subtitle>{{ currentEaterySubtitle }}</v-card-subtitle>

            <v-divider></v-divider>

            <v-window v-model="eateryWindowStep">
              <v-window-item :value="1">
                <v-subheader>Primary</v-subheader>
                <v-form lazy-validation ref="eateryOne">
                  <v-container>
                    <v-row>
                      <!-- Name -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          :rules="[rules.required]"
                          v-model="eateryProfile.name"
                          label="Name"
                          color="success"
                          type="text"
                          prepend-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                      <!-- Town -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          readonly
                          v-model="eateryProfile.town"
                          label="Town"
                          color="success"
                          type="text"
                          prepend-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <!-- Country -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          readonly
                          v-model="eateryProfile.country"
                          label="Country"
                          color="success"
                          type="text"
                          prepend-icon="mdi-map-marker"
                        ></v-text-field>
                      </v-col>
                      <!-- Website -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          :rules="[rules.required]"
                          v-model="eateryProfile.website"
                          label="Website link"
                          color="success"
                          type="url"
                          prepend-icon="mdi-web"
                        ></v-text-field>
                      </v-col>
                      <!-- Phone number -->
                      <v-col cols="12" sm="6" class="pb-0">
                        <v-text-field
                          dense
                          outlined
                          :rules="[rules.required]"
                          v-model="eateryProfile.phoneNumber"
                          label="Phone number"
                          color="success"
                          type="tel"
                          prepend-icon="mdi-phone"
                        ></v-text-field>
                      </v-col>
                      <!-- Bio -->
                      <v-col cols="12" class="pb-0">
                        <v-textarea
                          outlined
                          auto-grow
                          dense
                          :rules="[rules.required]"
                          v-model="eateryProfile.bio"
                          rows="1"
                          color="success"
                          label="Bio"
                          prepend-icon="mdi-message"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <!-- <v-subheader class="text-center">Secondary</v-subheader>
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
                  </v-container> -->
              </v-window-item>

              <!-- <v-window-item :value="2">
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
                </v-window-item> -->

              <v-window-item :value="2">
                <v-card-text>
                  <div class="text-center mb-2">
                    <v-img
                      contain
                      class="mx-auto mb-1"
                      width="100px"
                      height="100px"
                      src="../assets/logo.png"
                    ></v-img>
                    <v-btn
                      text
                      rounded
                      @click="termsAndConditionsDialog = true"
                    >
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
                          <v-btn icon @click="termsAndConditionsDialog = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-card-text>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum. Lorem ipsum
                            dolor sit, amet consectetur adipisicing elit. Quos
                            modi unde quis harum nihil possimus dolorem hic, ea
                            mollitia dolor asperiores, nemo quasi aliquam
                            aperiam voluptatem. Dolores voluptatem consectetur
                            dolor.
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
                        v-model="eaterySettings.receiveNews"
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

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                rounded
                text
                class="text-none"
                :disabled="eateryWindowStep === 1"
                v-if="eateryWindowStep > 1"
                @click="eateryWindowStep--"
              >
                <v-icon left>mdi-chevron-left</v-icon>
                <span class="mr-2">Back</span>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                rounded
                text
                class="text-none"
                :disabled="eateryWindowStep === 2"
                v-if="eateryWindowStep < 2"
                @click="eateryNext"
              >
                <span class="ml-2">Next</span>
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>

              <v-btn
                rounded
                :loading="eateryLoading"
                v-if="eateryWindowStep === 2"
                @click="createProfile('eatery')"
                :disabled="!agreeTermsAndConditions"
                color="success"
              >
                <v-icon left>mdi-check-all</v-icon>
                <span class="text-none mr-2">Finish</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { differenceInYears } from "date-fns";
import {
  defaultImageUrl,
  roleRedirect,
  getCounter,
  updateCounter,
} from "../utils";

export default {
  name: "CreateProfile",
  title: "Create profile",
  created() {
    // Get the user's location
    this.getUserLocation();

    // Set the user's image url
    if (localStorage.getItem("imageUrl")) {
      this.consumerProfile.imageUrl = localStorage.getItem("imageUrl");
      this.eateryProfile.imageUrl = localStorage.getItem("imageUrl");
    }
  },
  data() {
    return {
      tab: null,
      consumerWindowStep: 1,
      eateryWindowStep: 1,
      agreeTermsAndConditions: false,
      termsAndConditionsDialog: false,
      showAlert: false,
      alertMessage: "",
      actionSuccess: false,
      consumerLoading: false,
      eateryLoading: false,
      // setWeightGoal: false,
      consumerProfile: {
        id: "",
        role: "consumer",
        name: "",
        dateOfBirth: "",
        gender: "",
        latitude: "",
        longitude: "",
        town: "",
        country: "",
        created: new Date(),
        email: this.$store.state.email,
        imageUrl: defaultImageUrl,
        // weight: { amount: null, units: "kg" },
        // height: { amount: null, units: "cm" },
        // activityLevel: "",
        // healthCondition: "",
        // bodyFat: "",
        // diet: "",
        // allergies: [],
        // objective: "Maintain weight",
        // weightGoal: "",
        // dailySpending: { amount: null, units: "ksh" },
      },
      eateryProfile: {
        id: "",
        role: "eatery",
        name: "",
        latitude: "",
        longitude: "",
        town: "",
        country: "",
        ratings: 0,
        website: "",
        phoneNumber: "",
        bio: "",
        created: new Date(),
        email: this.$store.state.email,
        imageUrl: defaultImageUrl,
      },
      consumerSettings: {
        receiveNews: true,
        notificationsAlert: false,
        autoUpdateLocation: true,
        appLanguage: "english",
        appTheme: "light",
        mealTimes: [
          {
            id: "1",
            name: "Breakfast",
            time: "07:00",
          },
          {
            id: "2",
            name: "Lunch",
            time: "13:00",
          },
          {
            id: "3",
            name: "Snack",
            time: "16:00",
          },
          {
            id: "4",
            name: "Supper",
            time: "19:00",
          },
        ],
      },
      eaterySettings: {
        receiveNews: true,
        notificationsAlert: false,
        appLanguage: "english",
        appTheme: "light",
      },
      rules: {
        required: (value) => !!value || "This field is required!",
        age: (dob) => this.validateAge(dob),
      },
      geoLocationOptions: {
        enableHighAccuracy: true,
        timeout: 1500,
        maximumAge: 0,
      },
    };
  },
  computed: {
    currentConsumerTitle() {
      switch (this.consumerWindowStep) {
        case 1:
          return "Personal information";
        // case 2:
        //   return "Dietary information";
        // case 3:
        //   return "Goals";
        default:
          return "Finish up";
      }
    },
    currentConsumerSubtitle() {
      switch (this.consumerWindowStep) {
        case 1:
          return "Take your time and tell us about yourself.";
        // case 2:
        //   return "Select your preferred diet and any foods you are allergic to.";
        // case 3:
        //   return "Anything you want to achieve by doing this?";
        default:
          return "Just one more thing...";
      }
    },
    currentEateryTitle() {
      switch (this.eateryWindowStep) {
        case 1:
          return "Primary information";
        default:
          return "Finish up";
      }
    },
    currentEaterySubtitle() {
      switch (this.eateryWindowStep) {
        case 1:
          return "Tell us about your eatery.";
        default:
          return "Just one more thing...";
      }
    },
    cardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          return "40vw";
        case "lg":
          return "50vw";
        case "md":
          return "60vw";
        case "sm":
          return "80vw";
        case "xs":
          return "95vw";
        default:
          return "100vw";
      }
    },
  },
  methods: {
    ...mapActions(["uploadProfileAction", "uploadSettingsAction"]),
    validateAge(dob) {
      const age = differenceInYears(new Date(), new Date(dob));

      if (age === 18 || age > 18) return true;

      return "You are not 18+ years!";
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.locateSuccess,
          this.locateError,
          this.geoLocationOptions
        );
      } else {
        this.alertMessage =
          "Your browser does not support geolocation. Please use a browser that does.";
        this.showAlert = true;
      }
    },
    locateSuccess(position) {
      const coords = position.coords;

      // Set the user geolocation coordinates
      this.consumerProfile.latitude = coords.latitude;
      this.consumerProfile.longitude = coords.longitude;
      this.eateryProfile.latitude = coords.latitude;
      this.eateryProfile.longitude = coords.longitude;

      // Fetch the user location details
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
      )
        .then((response) => {
          // Retrieve the json data
          return response.json();
        })
        .then((data) => {
          // Set the user location details
          this.consumerProfile.town = data.address.town || data.address.city;
          this.consumerProfile.country = data.address.country;
          this.eateryProfile.town = data.address.town || data.address.city;
          this.eateryProfile.country = data.address.country;
        })
        .catch((error) => {
          this.alertMessage = error;
          this.showAlert = true;
        });
    },
    locateError(error) {
      switch (error.code) {
        case 1:
          this.alertMessage = `${error.message}: Your location is required to continue`;
          break;
        default:
          this.alertMessage = error.message;
          break;
      }
      this.showAlert = true;
    },
    consumerNext() {
      let complete = null;

      switch (this.consumerWindowStep) {
        case 1:
          complete = this.$refs.consumerOne.validate();
          break;
        default:
          break;
      }
      if (complete) this.consumerWindowStep++;
    },
    eateryNext() {
      let complete = null;

      switch (this.eateryWindowStep) {
        case 1:
          complete = this.$refs.eateryOne.validate();
          break;
        default:
          break;
      }
      if (complete) this.eateryWindowStep++;
    },
    async createProfile(userType) {
      let profile = undefined;
      let settings = undefined;

      // Choose which profile and settings to upload
      switch (userType) {
        case "consumer":
          profile = this.consumerProfile;
          settings = this.consumerSettings;
          this.consumerLoading = true;
          break;
        case "eatery":
          profile = this.eateryProfile;
          settings = this.eaterySettings;
          this.eateryLoading = true;
          break;
      }

      try {
        // Set the user id
        const userId = await getCounter("users");
        profile.id = userId;

        // Show success message
        this.actionSuccess = true;
        this.alertMessage = "Setting up your profile... please wait";
        this.showAlert = true;

        // Add user profile
        await this.uploadProfileAction(profile);

        // Update counter
        await updateCounter("users", { last: userId + 1 });

        // Add user settings
        await this.uploadSettingsAction(settings);

        // Stop loading
        this.consumerLoading = false;
        this.eateryLoading = false;

        // Delete local storage data
        localStorage.removeItem("imageUrl");

        // Set the user role and dashboard links
        this.$store.commit("setRole", profile.role);
        this.$store.commit("setDashboardLinks", profile.role);

        // Redirect to dashboard
        this.$router.replace({ name: roleRedirect(profile.role) });
      } catch (error) {
        // Stop loading
        this.consumerLoading = false;
        this.eateryLoading = false;

        // Show error message
        this.actionSuccess = false;
        this.alertMessage = error;
        this.showAlert = true;
      }
    },
  },
};
</script>

<style>
</style>