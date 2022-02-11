<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 text-center font-weight-medium my-4">
          Create your profile
        </h1>
      </v-col>
      <v-col cols="12" md="8" lg="6" xl="4" class="mx-auto">
        <!-- Error alert -->
        <v-alert
          outlined
          dense
          dismissible
          transition="scale-transition"
          v-model="errorAlert"
          type="error"
          >{{ errorMessage }}</v-alert
        >

        <!-- Profile tabs -->
        <v-tabs fixed-tabs hide-slider color="success">
          <v-tab class="text-none subtitle-1 font-weight-medium"
            >Consumer</v-tab
          >
          <v-tab class="text-none subtitle-1 font-weight-medium">Eatery</v-tab>

          <!-- Consumer tab item -->
          <v-tab-item>
            <v-card outlined class="rounded-lg ma-2">
              <v-card-title>{{ currentConsumerTitle }}</v-card-title>
              <v-card-subtitle>{{ currentConsumerSubtitle }}</v-card-subtitle>

              <v-window v-model="consumerWindowStep">
                <v-window-item :value="1">
                  <v-subheader>Primary</v-subheader>
                  <v-form ref="consumerOne" lazy-validation>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            hide-details
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
                        <v-col cols="12" sm="6">
                          <v-text-field
                            hide-details
                            dense
                            outlined
                            :rules="[rules.required]"
                            v-model="consumerProfile.dateOfBirth"
                            label="Date of birth"
                            color="success"
                            type="date"
                            prepend-icon="mdi-calendar"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            outlined
                            hide-details
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
                        <v-col cols="12" sm="6">
                          <v-text-field
                            hide-details
                            dense
                            outlined
                            readonly
                            v-model="consumerProfile.location"
                            label="Location"
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
                          v-model="consumerSettings.receiveNews"
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
                  @click="createConsumerProfile"
                  :disabled="!agreeTermsAndConditions"
                  :loading="consumerLoading"
                  color="success"
                >
                  <v-icon left>mdi-check-all</v-icon>
                  <span class="text-none mr-2">Finish</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <!-- Eatery tab item -->
          <v-tab-item>
            <v-card outlined class="rounded-lg ma-2">
              <v-card-title>{{ currentEateryTitle }}</v-card-title>
              <v-card-subtitle>{{ currentEaterySubtitle }}</v-card-subtitle>

              <v-window v-model="eateryWindowStep">
                <v-window-item :value="1">
                  <v-form lazy-validation ref="eateryOne">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            hide-details
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
                        <v-col cols="12" sm="6">
                          <v-text-field
                            hide-details
                            dense
                            outlined
                            readonly
                            v-model="eateryProfile.location"
                            label="Location"
                            color="success"
                            type="text"
                            prepend-icon="mdi-map-marker"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            hide-details
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
                        <v-col cols="12" sm="6">
                          <v-text-field
                            hide-details
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
                        <v-col cols="12">
                          <v-textarea
                            outlined
                            auto-grow
                            dense
                            hide-details
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
                  @click="createEateryProfile"
                  :disabled="!agreeTermsAndConditions"
                  color="success"
                >
                  <v-icon left>mdi-check-all</v-icon>
                  <span class="text-none mr-2">Finish</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { roleRedirect } from "../utils";

export default {
  name: "CreateProfile",
  title: "Create profile",
  data() {
    return {
      consumerWindowStep: 1,
      eateryWindowStep: 1,
      agreeTermsAndConditions: false,
      termsAndConditionsDialog: false,
      errorAlert: false,
      errorMessage: "",
      consumerLoading: false,
      eateryLoading: false,
      // setWeightGoal: false,
      consumerProfile: {
        role: "consumer",
        name: "",
        dateOfBirth: "",
        gender: "",
        location: "Kilifi, Kenya",
        created: new Date(),
        email: localStorage.getItem("email"),
        imageUrl: "",
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
        role: "eatery",
        name: "",
        location: "Kilifi, Kenya",
        website: "",
        phoneNumber: "",
        bio: "",
        created: new Date(),
        email: localStorage.getItem("email"),
        imageUrl: "",
      },
      consumerSettings: {
        receiveNews: true,
      },
      eaterySettings: {
        receiveNews: true,
      },
      rules: {
        required: (value) => !!value || "This field is required!",
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
  },
  methods: {
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
    async createConsumerProfile() {
      try {
        // Start button loading
        this.consumerLoading = true;

        const db = getFirestore();

        // Upload the user profile to the database
        await setDoc(
          doc(db, "profiles", this.$store.state.userEmail),
          this.consumerProfile,
          {
            merge: true,
          }
        );

        // Upload the user settings to the database
        await setDoc(
          doc(db, "settings", this.$store.state.userEmail),
          this.consumerSettings
        );

        // Stop button loading
        this.consumerLoading = false;

        // Set the dashboard links
        this.$store.commit("setDashboardLinks", this.consumerProfile.role);

        // Update local and store data and sync
        localStorage.setItem("role", this.consumerProfile.role);
        this.$store.commit("setUserRole", this.consumerProfile.role);
        this.$store.commit("setUserProfile", this.consumerProfile);
        this.$store.commit("setLoggedIn", true);

        // Redirect to dashboard
        this.$router.replace({ name: roleRedirect(this.consumerProfile.role) });
      } catch (error) {
        this.consumerLoading = false;
        this.errorAlert = true;
        this.errorMessage = error.message;
      }
    },
    async createEateryProfile() {
      try {
        // Start loading button
        this.eateryLoading = true;

        const db = getFirestore();

        // Upload the user profile to the database
        await setDoc(
          doc(db, "profiles", this.$store.state.userEmail),
          this.eateryProfile,
          {
            merge: true,
          }
        );

        // Upload the user settings to the database
        await setDoc(
          doc(db, "settings", this.$store.state.userEmail),
          this.eaterySettings
        );

        // Create an empty menu in the database
        await setDoc(doc(db, "menus", this.$store.state.userEmail), {
          menu: [],
        });

        // Stop button loading
        this.eateryLoading = false;

        // Set the dashboard links
        this.$store.commit("setDashboardLinks", this.eateryProfile.role);

        // Update local and store data and sync
        localStorage.setItem("role", this.eateryProfile.role);
        this.$store.commit("setUserRole", this.eateryProfile.role);
        this.$store.commit("setUserProfile", this.eateryProfile);
        this.$store.commit("setLoggedIn", true);

        // Redirect to dashboard
        this.$router.replace({ name: roleRedirect(this.eateryProfile.role) });
      } catch (error) {
        // Stop button loading
        this.consumerLoading = false;
        this.eateryLoading = false;

        this.errorAlert = true;
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style>
</style>