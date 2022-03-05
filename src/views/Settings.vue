<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-list flat subheader>
        <v-subheader>General</v-subheader>
        <!-- Dema notifications -->
        <v-list-item two-line>
          <v-list-item-action>
            <v-checkbox
              color="success"
              v-model="settings.receiveNews"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-subtitle>Send me news about Dema</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- Sound notifications -->
        <v-list-item two-line>
          <v-list-item-action>
            <v-checkbox
              color="success"
              v-model="settings.notificationsAlert"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle
              >Alert me of any notifications</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <!-- Location change -->
        <v-list-item two-line>
          <v-list-item-action>
            <v-checkbox
              color="success"
              v-model="settings.autoUpdateLocation"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle
              >Update my location automatically</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>Appearance</v-subheader>
        <!-- Theme change -->
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Theme</v-list-item-title>
            <v-list-item-subtitle>
              {{ settings.appTheme === "light" ? "Light" : "Dark" }} theme
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="themeChangeDialog = true">
              <v-icon>
                {{
                  settings.appTheme === "light"
                    ? "mdi-white-balance-sunny"
                    : "mdi-weather-night"
                }}
              </v-icon>
            </v-btn>
          </v-list-item-action>

          <v-dialog persistent width="auto" v-model="themeChangeDialog">
            <v-card>
              <v-card-title class="justify-center">Choose theme</v-card-title>

              <v-divider></v-divider>

              <v-card-text class="py-0">
                <v-radio-group
                  hide-details
                  class="mt-0"
                  v-model="settings.appTheme"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-radio
                            color="success"
                            label="Light theme"
                            value="light"
                          ></v-radio>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-radio
                            color="success"
                            label="Dark theme"
                            value="dark"
                          ></v-radio>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-radio-group>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="justify-center">
                <v-btn text rounded color="success" @click="changeAppTheme"
                  >Ok</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
        <!-- Language change -->
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Language</v-list-item-title>
            <v-list-item-subtitle class="text-capitalize"
              >{{ settings.appLanguage }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="languageChangeDialog = true">
              <v-icon>mdi-web</v-icon>
            </v-btn>
          </v-list-item-action>

          <!-- Language change dialog -->
          <v-dialog persistent width="auto" v-model="languageChangeDialog">
            <v-card>
              <v-card-title>Choose language</v-card-title>

              <v-divider></v-divider>

              <v-card-text class="py-0">
                <v-radio-group
                  hide-details
                  class="mt-0"
                  v-model="settings.appLanguage"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-radio
                            color="success"
                            label="English"
                            value="english"
                          ></v-radio>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-radio-group>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="justify-center">
                <v-btn text rounded color="success" @click="changeAppLanguage"
                  >Ok</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>Preferences</v-subheader>

        <!-- Meal edit/delete -->
        <v-list-item>
          <v-list-item-content class="pt-0">
            <v-container>
              <v-row justify="center">
                <v-expansion-panels accordion flat>
                  <v-expansion-panel
                    v-for="mealTime in settings.mealTimes"
                    :key="mealTime.id"
                  >
                    <v-expansion-panel-header class="py-0 pl-0 pr-2">
                      <v-list-item two-line class="px-0">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ mealTime.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ formatTime(mealTime.time) }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="text-center">
                      <v-btn
                        text
                        rounded
                        small
                        color="success"
                        class="mx-2"
                        @click="editMealTime(mealTime)"
                      >
                        Edit
                      </v-btn>
                      <v-btn
                        text
                        rounded
                        small
                        color="error"
                        class="mx-2"
                        @click="deleteMealTime(mealTime)"
                        >Delete</v-btn
                      >
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-container>
          </v-list-item-content>

          <!-- Meal time form -->
          <v-dialog width="400px" v-model="mealTimeDialog">
            <v-card>
              <v-card-title>
                <span>{{ mealTimeAction }} meal time</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="mealTimeDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>

              <v-card-text class="pb-0 pt-2">
                <v-text-field
                  outlined
                  dense
                  type="text"
                  color="success"
                  label="Name"
                  prepend-icon="mdi-pizza"
                  v-model="selectedMealTime.name"
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  type="time"
                  label="Time"
                  color="success"
                  prepend-icon="mdi-clock"
                  v-model="selectedMealTime.time"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn text rounded @click="saveMealTime" color="success"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Delete meal time prompt -->
          <question-prompt
            :question="'Are you sure you want to delete this meal time?'"
            :dialog="deleteMealTimeDialog"
            :overlay="deleteMealTimeOverlay"
            @cancel="deleteMealTimeCancel"
            @confirm="deleteMealTimeConfirm"
          ></question-prompt>
        </v-list-item>
        <!-- <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Meals</v-list-item-title>
            <v-list-item-subtitle
              >Add, edit or delete meal time</v-list-item-subtitle
            >
            <v-list-item-subtitle class="text-center">
              <v-chip
                close
                class="mt-2 mr-2 mb-0"
                :input-value="mealTimeDialog"
                @click="editMealTime(mealTime)"
                close-icon="mdi-delete"
                @click:close="deleteMealTime(mealTime)"
                v-for="mealTime in settings.mealTimes"
                :key="mealTime.id"
              >
                <v-avatar left color="success">
                  <span class="white--text text-h5">{{
                    mealTime.name[0]
                  }}</span>
                </v-avatar>
                <span>{{ formatTime(mealTime.time) }}</span>
              </v-chip>

              

              
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="addMealTime">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item> -->

        <v-divider></v-divider>

        <v-subheader>Advanced</v-subheader>
        <!-- Email change -->
        <!-- <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Change email</v-list-item-title>
            <v-list-item-subtitle>name@domain.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="emailChangeDialog = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-dialog width="350px" v-model="emailChangeDialog">
            <v-card>
              <v-card-title>
                <span>Change your email</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="emailChangeDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>

              <v-card-text class="pb-0 pt-2">
                <v-text-field
                  outlined
                  dense
                  type="text"
                  color="success"
                  label="Email address"
                  prepend-icon="mdi-email"
                  value="name@domain.com"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn text rounded color="success" @click="changeEmail"
                  >Update</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item> -->
        <!-- Delete account -->
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Delete account</v-list-item-title>
            <v-list-item-subtitle
              >All your data will be lost</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon color="error" @click="deleteAccountDialog = true">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>

          <!-- Account delete dialog -->
          <question-prompt
            :question="'Are you sure you want to delete your account?'"
            :dialog="deleteAccountDialog"
            :overlay="deleteAccountOverlay"
            @cancel="deleteAccountCancel"
            @confirm="deleteAccountConfirm"
          ></question-prompt>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Action toast -->
    <toast
      :show="showToast"
      :success="actionSuccess"
      :message="toastMessage"
      @close="showToast = false"
    ></toast>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { format } from "date-fns";
import QuestionPrompt from "../components/QuestionPrompt.vue";
import Toast from "@/components/Toast.vue";

export default {
  title: "Settings",
  name: "Settings",
  async created() {
    if (!this.settings) await this.getSettingsAction();
  },
  data() {
    return {
      // unsubscribeListener: null,
      showToast: false,
      toastMessage: "",
      actionSuccess: true,
      themeChangeDialog: false,
      languageChangeDialog: false,
      deleteAccountDialog: false,
      emailChangeDialog: false,
      deleteAccountOverlay: false,
      mealTimeAction: "Add",
      mealTimeDialog: false,
      deleteMealTimeDialog: false,
      deleteMealTimeOverlay: false,
      languages: [{ text: "English", value: "english" }],
      selectedMealTime: {
        name: "",
        time: "",
      },
      defaultMealTime: {
        name: "",
        time: "",
      },
    };
  },
  watch: {
    settings: {
      async handler(newValue) {
        try {
          await this.updateSettingsAction(newValue);
          this.toastMessage = "Settings updated successfully!";
          this.actionSuccess = true;
          this.showToast = true;
        } catch (error) {
          this.toastMessage = error.code;
          this.actionSuccess = false;
          this.showToast = true;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapActions(["getSettingsAction", "updateSettingsAction"]),
    formatTime(time) {
      return format(new Date("1970-1-1 " + time), "HH:mm a");
    },
    changeAppTheme() {
      this.$vuetify.theme.dark = this.settings.appTheme === "dark";
      this.themeChangeDialog = false;
    },
    changeAppLanguage() {
      this.languageChangeDialog = false;
    },
    changeEmail() {
      this.emailChangeDialog = false;
    },
    deleteAccountCancel() {
      this.deleteAccountDialog = false;
    },
    deleteAccountConfirm() {
      this.deleteAccountDialog = false;
    },
    addMealTime() {
      this.mealTimeAction = "Add";
      this.mealTimeDialog = true;
    },
    editMealTime(mealTime) {
      this.selectedMealTime = Object.assign({}, mealTime);
      this.mealTimeAction = "Edit";
      this.mealTimeDialog = true;
    },
    saveMealTime() {
      switch (this.mealTimeAction) {
        case "Add":
          console.log(this.selectedMealTime);
          alert("Save a new meal time!");
          break;
        case "Edit":
          alert("Save an existing meal time!");
          break;
      }
    },
    deleteMealTime(mealTime) {
      this.selectedMealTime = Object.assign({}, mealTime);
      this.deleteMealTimeDialog = true;
    },
    deleteMealTimeCancel() {
      this.selectedMealTime = JSON.parse(JSON.stringify(this.defaultMealTime));
      this.deleteMealTimeDialog = false;
    },
    deleteMealTimeConfirm() {
      this.deleteMealTimeDialog = false;
    },
  },
  components: {
    QuestionPrompt,
    Toast,
  },
};
</script>

<style scoped>
</style>