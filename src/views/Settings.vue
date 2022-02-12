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
              v-model="userSettings.receiveNews"
              @change="detectSettingChange('dema')"
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
              v-model="userSettings.notificationsAlert"
              @change="detectSettingChange('sound')"
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
              v-model="userSettings.autoUpdateLocation"
              @change="detectSettingChange('location')"
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
              {{ userSettings.appTheme === "light" ? "Light" : "Dark" }} theme
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="themeChangeDialog = true">
              <v-icon>
                {{
                  userSettings.appTheme === "light"
                    ? "mdi-white-balance-sunny"
                    : "mdi-weather-night"
                }}
              </v-icon>
            </v-btn>
          </v-list-item-action>

          <v-dialog persistent width="auto" v-model="themeChangeDialog">
            <v-card>
              <v-card-title>Choose theme</v-card-title>

              <v-divider></v-divider>

              <v-card-text class="py-0">
                <v-radio-group
                  hide-details
                  class="mt-0"
                  v-model="userSettings.appTheme"
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
              >{{ userSettings.appLanguage }}
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
                  v-model="userSettings.appLanguage"
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

        <!-- <v-divider></v-divider>

        <v-subheader>Preferences</v-subheader> -->

        <!-- Meal add/delete -->
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
                v-for="mealTime in userSettings.mealTimes"
                :key="mealTime.id"
              >
                <v-avatar left color="success">
                  <span class="white--text text-h5">{{
                    mealTime.name[0]
                  }}</span>
                </v-avatar>
                <span>{{ formatTime(mealTime.time) }}</span>
              </v-chip>

              <question-prompt
                :question="'Are you sure you want to delete this meal time?'"
                :dialog="deleteMealTimeDialog"
                :overlay="deleteMealTimeOverlay"
                @cancel="deleteMealTimeCancel"
                @confirm="deleteMealTimeConfirm"
              ></question-prompt>

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
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import QuestionPrompt from "../components/QuestionPrompt.vue";
import Toast from "@/components/Toast.vue";

export default {
  title: "Settings",
  name: "Settings",
  async created() {
    // await this.getUserSettingsAction();
  },
  // mounted() {
  //   // Listen to settings changes
  //   const db = getFirestore();
  //   const docRef = doc(db, "settings", this.$store.state.userEmail);

  //   this.unsubscribeListener = onSnapshot(docRef, (snapshot) => {
  //     console.log("Snapshot data: ", snapshot.data());
  //     // snapshot.forEach((change) => {
  //     //   console.log(change);
  //     // });
  //   });
  // },
  // beforeDestroy() {
  //   // Unsubsribe to the realtime firestore listener
  //   this.unsubscribeListener();
  // },
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
  computed: {
    ...mapState(["userSettings"]),
  },
  methods: {
    ...mapActions(["getUserSettingsAction"]),
    detectSettingChange(name) {
      switch (name) {
        case "dema":
          this.updateSetting({ receiveNews: this.userSettings.receiveNews });
          break;
        case "sound":
          this.updateSetting({
            notificationsAlert: this.userSettings.notificationsAlert,
          });
          break;
        case "location":
          this.updateSetting({
            autoUpdateLocation: this.userSettings.autoUpdateLocation,
          });
          break;
        default:
          break;
      }
    },
    async updateSetting(setting) {
      const db = getFirestore();
      const ref = doc(db, "settings", this.$store.state.userEmail);

      try {
        // Update the setting in database
        await updateDoc(ref, setting);

        // Update the settings in store
        this.$store.commit("setUserSettings", this.userSettings);

        // Show toast message on success
        this.showToast = true;
        this.toastMessage = "Setting updated successfully!";
        this.actionSuccess = true;
      } catch (error) {
        // Show toast message on failure
        this.showToast = true;
        this.toastMessage = error.code;
        this.actionSuccess = false;
      }
    },
    changeAppTheme() {
      this.$vuetify.theme.dark = this.userSettings.appTheme === "dark";
      this.updateSetting({ appTheme: this.userSettings.appTheme });
      this.themeChangeDialog = false;
    },
    changeAppLanguage() {
      // this.updateSetting({ appLanguage: this.userSettings.appTheme });
      this.languageChangeDialog = false;
    },
    changeEmail() {
      this.emailChangeDialog = false;
    },
    formatTime(time) {
      return format(new Date("1970-1-1 " + time), "HH:mm a");
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