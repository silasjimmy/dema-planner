<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-list flat subheader>
        <v-subheader>{{ $t("settings.row1.subheader") }}</v-subheader>

        <v-list-item two-line>
          <v-list-item-action>
            <v-checkbox
              color="success"
              v-model="settings.receiveNews"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{
              $t("settings.row1.sect1.title")
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              $t("settings.row1.sect1.subtitle")
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-action>
            <v-checkbox
              color="success"
              v-model="settings.notificationsAlert"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{
              $t("settings.row1.sect2.title")
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              $t("settings.row1.sect2.subtitle")
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-action>
            <v-checkbox
              color="success"
              v-model="settings.autoUpdateLocation"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{
              $t("settings.row1.sect3.title")
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              $t("settings.row1.sect3.subtitle")
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>{{ $t("settings.row2.subheader") }}</v-subheader>

        <!-- Theme change -->
        <v-dialog persistent width="auto" v-model="themeChangeDialog">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item two-line v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("settings.row2.sect1.title")
                }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ settings.appTheme === "light" ? "Light" : "Dark" }} theme
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>
                  {{
                    settings.appTheme === "light"
                      ? "mdi-white-balance-sunny"
                      : "mdi-weather-night"
                  }}
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card>
            <v-card-title class="justify-center">{{
              $t("settings.row2.sect1.dtitle")
            }}</v-card-title>

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

        <!-- Language change -->
        <v-dialog persistent width="auto" v-model="languageChangeDialog">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item two-line v-bind="attrs" v-on="on">
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("settings.row2.sect2.title")
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-capitalize">
                  {{ language(settings.appLanguage) }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-web</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <v-card>
            <v-card-title>{{ $t("settings.row2.sect2.dtitle") }}</v-card-title>

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
                          value="en"
                        ></v-radio>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-radio
                          color="success"
                          label="Swahili"
                          value="sw"
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

        <v-divider v-if="$store.state.role === 'consumer'"></v-divider>

        <v-subheader v-if="$store.state.role === 'consumer'"
          >{{ $t("settings.row3.subheader") }}
        </v-subheader>

        <!-- Meal time edit -->
        <v-list-item v-if="$store.state.role === 'consumer'">
          <v-list-item-content class="pt-0">
            <v-container>
              <v-row justify="center">
                <v-expansion-panels accordion flat>
                  <v-expansion-panel
                    v-for="(mealTime, index) in settings.mealTimes"
                    :key="mealTime.id"
                  >
                    <v-expansion-panel-header class="py-0 pl-0 pr-0">
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
                      <v-dialog width="400px" v-model="mealTimesDialog[index]">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            rounded
                            color="success"
                            v-on="on"
                            v-bind="attrs"
                          >
                            Edit
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title> Edit meal time </v-card-title>

                          <v-card-text class="pb-0 pt-2">
                            <v-text-field
                              outlined
                              dense
                              type="text"
                              color="success"
                              label="Name"
                              prepend-icon="mdi-pizza"
                              v-model="mealTime.name"
                            ></v-text-field>
                            <v-text-field
                              outlined
                              dense
                              type="time"
                              label="Time"
                              color="success"
                              prepend-icon="mdi-clock"
                              v-model="mealTime.time"
                            ></v-text-field>
                          </v-card-text>

                          <v-card-actions class="justify-center">
                            <v-btn
                              text
                              rounded
                              @click="$set(mealTimesDialog, index, false)"
                              color="success"
                              >close</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-container>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-divider></v-divider> -->

        <!-- <v-subheader>Advanced</v-subheader> -->
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
        <!-- <v-list-item two-line>
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

          <question-prompt
            :question="'Are you sure you want to delete your account?'"
            :dialog="deleteAccountDialog"
            :overlay="deleteAccountOverlay"
            @cancel="deleteAccountDialog = false"
            @confirm="deleteAccountConfirm"
          ></question-prompt>

          <v-dialog persistent v-model="reauthenticateDialog" width="auto">
            <v-card>
              <v-card-subtitle class="py-4"
                >Log out and log in again to continue.</v-card-subtitle
              >
              <v-card-actions class="justify-center pt-0">
                <v-btn text rounded color="success" @click="reauthenticate"
                  >ok</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item> -->
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
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { mapState, mapActions } from "vuex";
import { format } from "date-fns";
// import QuestionPrompt from "../components/QuestionPrompt.vue";
import Toast from "@/components/Toast.vue";

export default {
  title: "Settings",
  name: "Settings",
  async created() {
    if (!this.settings) await this.getSettingsAction();
  },
  data() {
    return {
      showToast: false,
      toastMessage: "",
      actionSuccess: true,
      themeChangeDialog: false,
      languageChangeDialog: false,
      deleteAccountDialog: false,
      reauthenticateDialog: false,
      emailChangeDialog: false,
      deleteAccountOverlay: false,
      mealTimesDialog: [],
      languages: [{ text: "English", value: "english" }],
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
    "$store.state.settings": function (settings) {
      this.mealTimesDialog = settings.mealTimes.map(() => false);
    },
  },
  computed: {
    ...mapState(["settings"]),
  },
  methods: {
    ...mapActions([
      "getSettingsAction",
      "updateSettingsAction",
      "deleteUserDataAction",
    ]),
    formatTime(time) {
      return format(new Date("1970-1-1 " + time), "HH:mm a");
    },
    language(lang) {
      switch (lang) {
        case "en":
          return "English";
        case "sw":
          return "Swahili";
        default:
          return "English";
      }
    },
    changeAppTheme() {
      this.$vuetify.theme.dark = this.settings.appTheme === "dark";
      this.themeChangeDialog = false;
    },
    changeAppLanguage() {
      this.$i18n.locale = this.settings.appLanguage;
      this.$store.commit("setDashboardLinks", this.$store.state.profile.role);
      this.languageChangeDialog = false;
    },
    changeEmail() {
      this.emailChangeDialog = false;
    },
    async deleteAccountConfirm() {
      this.deleteAccountOverlay = true;

      // Delete the user avatar
      const storage = getStorage();
      const imageRef = ref(
        storage,
        `profileAvatars/${this.$store.state.email}/avatar.jpg`
      );
      deleteObject(imageRef).catch((error) => console.log(error.code));

      try {
        // Delete user data from database
        await this.deleteUserDataAction();

        // Delete user account
        const auth = getAuth();
        const user = auth.currentUser;
        await deleteUser(user);

        this.deleteAccountOverlay = false;

        // Redirect to log in page
        this.$router.replace({ name: "sign-in" });
      } catch (error) {
        console.log(error);
        this.deleteAccountOverlay = false;
        this.deleteAccountDialog = false;
        this.reauthenticateDialog = true;
      }
    },
    async reauthenticate() {
      this.reauthenticateDialog = false;

      try {
        const auth = getAuth();
        await signOut(auth);

        this.$router.replace({ name: "sign-in" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    // QuestionPrompt,
    Toast,
  },
};
</script>

<style scoped>
</style>