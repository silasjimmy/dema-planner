<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- Consumer profile view -->
      <v-list subheader two-line v-if="$store.state.userRole === 'consumer'">
        <v-list-item three-line>
          <v-list-item-avatar tile size="80" class="rounded-circle">
            <v-img :src="userProfile.imageUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h5">{{
              userProfile.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ age() }} years old</v-list-item-subtitle>
            <v-list-item-subtitle>{{
              userProfile.gender
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="editUserProfile = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <!-- 
        <v-divider inset class="my-3"></v-divider>

        <v-subheader>Primary information</v-subheader>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-noodles </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Diet</v-list-item-title>
            <v-list-item-subtitle>{{ userProfile.diet }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-dialog persistent v-model="primaryInfoDialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  <span>Edit info</span>
                  <v-btn icon @click="primaryInfoDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-select
                    outlined
                    clearable
                    dense
                    prepend-icon="mdi-pizza"
                    item-color="success"
                    color="success"
                    :items="['Anything', 'Vegan', 'Vegeterian']"
                    v-model="userProfile.diet"
                    label="Diet"
                  ></v-select>
                  <v-text-field
                    outlined
                    hide-spin-buttons
                    clearable
                    dense
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Height"
                    v-model="userProfile.height.amount"
                    :suffix="userProfile.height.units"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    hide-spin-buttons
                    clearable
                    hide-details
                    dense
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Weight"
                    v-model="userProfile.weight.amount"
                    :suffix="userProfile.weight.units"
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    color="success"
                    class="text-none"
                    @click="saveProfile('primaryInfo')"
                  >
                    Save
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark>
              mdi-human-male-height-variant
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Height</v-list-item-title>
            <v-list-item-subtitle
              >{{ userProfile.height.amount }}
              {{ userProfile.height.units }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-weight </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Weight</v-list-item-title>
            <v-list-item-subtitle
              >{{ userProfile.weight.amount }}
              {{ userProfile.weight.units }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider inset class="my-3"></v-divider>

        <v-subheader>Secondary information</v-subheader>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-human-male </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Body fat</v-list-item-title>
            <v-list-item-subtitle>{{
              userProfile.bodyFat
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-dialog persistent v-model="secondaryInfoDialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  <span>Edit info</span>
                  <v-btn icon @click="secondaryInfoDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-select
                    outlined
                    clearable
                    dense
                    prepend-icon="mdi-account"
                    color="success"
                    item-color="success"
                    :items="['Low', 'Medium', 'High']"
                    v-model="userProfile.bodyFat"
                    label="Body fat"
                  ></v-select>
                  <v-select
                    outlined
                    clearable
                    dense
                    prepend-icon="mdi-account"
                    item-color="success"
                    color="success"
                    :items="['Not active', 'Lightly active', 'Very active']"
                    v-model="userProfile.activityLevel"
                    label="Activity level"
                  ></v-select>
                  <v-select
                    outlined
                    dense
                    clearable
                    hide-details
                    prepend-icon="mdi-heart"
                    color="success"
                    item-color="success"
                    :items="['None', 'Diabetic', 'High blood pressure']"
                    v-model="userProfile.healthCondition"
                    label="Health condition"
                  ></v-select>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    color="success"
                    class="text-none"
                    @click="saveProfile('secondaryInfo')"
                  >
                    Save
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-run </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Activity level</v-list-item-title>
            <v-list-item-subtitle>{{
              userProfile.activityLevel
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-heart </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Health condition</v-list-item-title>
            <v-list-item-subtitle>{{
              userProfile.healthCondition
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset class="my-3"></v-divider>

        <v-subheader>Goals</v-subheader>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-weight-lifter </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Target</v-list-item-title>
            <v-list-item-subtitle
              >{{ userProfile.goal }} - {{ userProfile.target.amount }}
              {{ userProfile.target.units }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-dialog persistent v-model="goalsDialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  <span>Edit info</span>
                  <v-btn icon @click="goalsDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-select
                    outlined
                    clearable
                    dense
                    prepend-icon="mdi-account"
                    item-color="success"
                    color="success"
                    :items="[
                      'Reduce weight',
                      'Maintain weight',
                      'Build muscle',
                    ]"
                    v-model="userProfile.goal"
                    label="Goal"
                  ></v-select>
                  <v-text-field
                    outlined
                    clearable
                    hide-spin-buttons
                    dense
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Target"
                    v-model="userProfile.target.amount"
                    :suffix="userProfile.target.units"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    dense
                    hide-spin-buttons
                    clearable
                    hide-details
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Daily min spending"
                    v-model="userProfile.minimumSpending.amount"
                    :suffix="userProfile.minimumSpending.currency"
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    color="success"
                    class="text-none"
                    @click="saveProfile('goals')"
                  >
                    Save
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-cash </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Daily minimum spending</v-list-item-title>
            <v-list-item-subtitle class="text-capitalize"
              >{{ userProfile.minimumSpending.currency }}
              {{ userProfile.minimumSpending.amount }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item> -->
      </v-list>

      <!-- Eatery profile view -->
      <v-img
        v-if="$store.state.userRole === 'eatery'"
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 white--text">{{
              userProfile.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="grey--text text--lighten-2"
              >Eatery ratings</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="editUserProfile = true">
              <v-icon color="white">mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-img>
    </v-card>

    <!-- Consumer edit profile form -->
    <v-dialog
      persistent
      scrollable
      v-if="$store.state.userRole === 'consumer'"
      v-model="editUserProfile"
      :width="dialogWidth"
    >
      <v-card>
        <v-card-title>
          <span>Edit profile</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="editUserProfile = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text
          class="text-center"
          style="max-height: 70vh"
          :class="$vuetify.breakpoint.xs ? 'px-0' : ''"
        >
          <v-form ref="profileForm">
            <v-container>
              <v-row>
                <!-- Avatar field -->
                <v-col cols="12">
                  <avatar-field
                    :src="userProfile.imageUrl"
                    @imageChange="updateImageUrl"
                  ></avatar-field>
                </v-col>
                <!-- Name field -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    clearable
                    hide-details
                    :rules="[rules.required]"
                    type="text"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Name"
                    v-model="userProfile.name"
                  ></v-text-field>
                </v-col>
                <!-- Date of birth field -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    clearable
                    hide-details
                    :rules="[rules.required]"
                    type="date"
                    color="success"
                    prepend-icon="mdi-calendar"
                    label="Date of birth"
                    :value="formatDate"
                    v-model="userProfile.dateOfBirth"
                  ></v-text-field>
                </v-col>
                <!-- Gender field -->
                <v-col cols="12" sm="6">
                  <v-select
                    outlined
                    clearable
                    dense
                    hide-details
                    :rules="[rules.required]"
                    prepend-icon="mdi-gender-male-female"
                    color="success"
                    :items="['Male', 'Female']"
                    v-model="userProfile.gender"
                    label="Gender"
                  ></v-select>
                </v-col>
                <!-- Diet field -->
                <!-- <v-col cols="12" lg="6">
                  <v-select
                    outlined
                    clearable
                    dense
                    hide-details
                    prepend-icon="mdi-home"
                    color="success"
                    :items="profileValues.diets"
                    v-model="diet"
                    label="Diet"
                  ></v-select>
                </v-col> -->
                <!-- Weight field -->
                <!-- <v-col cols="12" lg="6">
                  <unit-field
                    :icon="`mdi-home`"
                    :label="`Weight`"
                    :fieldVar="weight.amount"
                    :suffix="weight.unit"
                    :units="units.weight"
                    @setUnits="setWeightUnits"
                  ></unit-field>
                </v-col> -->
                <!-- Height field -->
                <!-- <v-col cols="12" lg="6">
                  <unit-field
                    :icon="`mdi-home`"
                    :label="`Height`"
                    :fieldVar="height.amount"
                    :suffix="height.unit"
                    :units="units.height"
                    @setUnits="setHeightUnits"
                  ></unit-field>
                </v-col> -->
                <!-- Activity level field -->
                <!-- <v-col cols="12" lg="6">
                  <v-select
                    outlined
                    clearable
                    dense
                    hide-details
                    prepend-icon="mdi-account"
                    color="success"
                    :items="profileValues.activityLevels"
                    v-model="activityLevel"
                    label="Activity level"
                  ></v-select>
                </v-col> -->
                <!-- Health condition field -->
                <!-- <v-col cols="12" lg="6">
                  <v-select
                    outlined
                    clearable
                    dense
                    hide-details
                    prepend-icon="mdi-heart"
                    color="success"
                    :items="profileValues.healthConditions"
                    v-model="healthCondition"
                    label="Health condition"
                  ></v-select>
                </v-col> -->
                <!-- Body fat field -->
                <!-- <v-col cols="12" lg="6">
                  <v-select
                    outlined
                    clearable
                    dense
                    hide-details
                    prepend-icon="mdi-home"
                    color="success"
                    :items="profileValues.bodyFats"
                    v-model="bodyFat"
                    label="Body fat"
                  ></v-select>
                </v-col> -->
                <!-- Allergies field -->
                <!-- <v-col cols="12" lg="6">
                  <v-combobox
                    outlined
                    clearable
                    dense
                    hide-details
                    multiple
                    small-chips
                    hide-selected
                    prepend-icon="mdi-account"
                    color="success"
                    :items="profileValues.allergies"
                    v-model="allergies"
                    label="Allergies"
                  ></v-combobox>
                </v-col> -->
                <!-- Objective field -->
                <!-- <v-col cols="12" lg="6">
                  <v-select
                    outlined
                    clearable
                    dense
                    hide-details
                    prepend-icon="mdi-home"
                    color="success"
                    :items="profileValues.objectives"
                    v-model="objective"
                    label="Objective"
                  ></v-select>
                </v-col> -->
                <!-- Weight goal field -->
                <!-- <v-col cols="12" lg="6">
                  <v-text-field
                    outlined
                    dense
                    clearable
                    hide-details
                    hide-spin-buttons
                    :suffix="weight.unit"
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Weight goal"
                    v-model="weightGoal"
                  ></v-text-field>
                </v-col> -->
                <!-- Spending field -->
                <!-- <v-col cols="12" lg="6">
                  <unit-field
                    :icon="`mdi-cash`"
                    :label="`Daily min spending`"
                    :fieldVar="dailySpending.amount"
                    :suffix="dailySpending.currency"
                    :units="units.currencies"
                    @setUnits="setCurrency"
                  ></unit-field>
                </v-col> -->
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            color="success"
            class="text-none"
            :loading="loadingProfile"
            @click="saveProfile()"
          >
            Save
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Eatery edit profile form -->
    <v-dialog
      persistent
      v-if="$store.state.userRole === 'eatery'"
      v-model="editUserProfile"
      width="500"
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Edit profile</span>
          <v-btn icon @click="editUserProfile = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="text-center">
          <div class="avatar-upload mb-4">
            <v-img
              width="100px"
              height="100px"
              class="rounded-circle mx-auto d-flex align-center"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              gradient="to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)"
            >
              <label id="avatar-label" for="avatar">
                <v-icon class="icon" color="white">mdi-camera</v-icon>
              </label>
            </v-img>

            <input id="avatar" type="file" accept="image/*" />
          </div>
          <v-text-field
            outlined
            dense
            clearable
            type="text"
            color="success"
            prepend-icon="mdi-account"
            label="Name"
            v-model="userProfile.name"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            color="success"
            class="text-none"
            @click="editUserProfile = false"
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
      :success="toastSuccess"
      @close="showToast = false"
    ></toast>
  </v-container>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { mapState, mapActions } from "vuex";
import { differenceInYears, format, parseISO } from "date-fns";
import { defaultImageUrl } from "../utils";
import AvatarField from "@/components/AvatarField.vue";
import Toast from "@/components/Toast.vue";
// import UnitField from "@/components/UnitField.vue";

export default {
  title: "Profile",
  name: "Profile",
  async created() {
    if (Object.keys(this.userProfile).length === 0)
      await this.getUserProfileAction();
  },
  data() {
    return {
      editUserProfile: false,
      loadingProfile: false,
      newAvatarImage: undefined,
      showToast: false,
      toastMessage: "",
      toastSuccess: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      // units: {
      //   weight: [
      //     { title: "Grams", value: "g" },
      //     { title: "Kilograms", value: "kg" },
      //   ],
      //   height: [
      //     { title: "Centimeters", value: "cm" },
      //     { title: "Meters", value: "m" },
      //     { title: "Inches", value: "inch" },
      //     { title: "Foot", value: "ft" },
      //   ],
      //   currencies: [{ title: "Kenya shilling", value: "ksh" }],
      // },
      // profileValues: {
      //   activityLevels: [
      //     { text: "Low", value: "low" },
      //     { text: "Medium", value: "medium" },
      //     { text: "High", value: "high" },
      //   ],
      //   healthConditions: [{ text: "Diabetic", value: "diabetic" }],
      //   bodyFats: [
      //     { text: "Low", value: "low" },
      //     { text: "Medium", value: "medium" },
      //     { text: "High", value: "high" },
      //   ],
      //   allergies: [
      //     { text: "Nuts", value: "nuts" },
      //     { text: "Meat", value: "meat" },
      //   ],
      //   diets: [{ text: "Vegan", value: "vegan" }],
      //   objectives: [
      //     { text: "None", value: "none" },
      //     { text: "Loose weight", value: "loose weight" },
      //     { text: "Maintain weight", value: "maintain weight" },
      //     { text: "Build muscle", value: "build muscle" },
      //   ],
      // },
      // eateryBioDialog: false,
      // consumerBioDialog: false,
      // primaryInfoDialog: false,
      // secondaryInfoDialog: false,
      // goalsDialog: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    dialogWidth() {
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
          return "100vw";
        default:
          return "100vw";
      }
    },
  },
  methods: {
    ...mapActions(["getUserProfileAction"]),
    age() {
      return differenceInYears(
        new Date(),
        new Date(this.userProfile.dateOfBirth)
      );
    },
    formatDate() {
      return format(parseISO(this.userProfile.dateOfBirth), "yyyy-MM-dd");
    },
    updateImageUrl(e) {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.userProfile.imageUrl = reader.result;
      };

      let images = e.target.files || e.dataTransfer.files;

      if (!images.length) this.userProfile.imageUrl = defaultImageUrl;
      else {
        this.newAvatarImage = images[0];
        this.userProfile.imageUrl = reader.readAsDataURL(images[0]);
      }
    },
    // setWeightUnits(value) {
    //   this.weight.unit = value;
    // },
    // setHeightUnits(value) {
    //   this.height.unit = value;
    // },
    // setCurrency(value) {
    //   this.dailySpending.currency = value;
    // },
    async saveProfile() {
      this.loadingProfile = true;

      if (this.$refs.profileForm.validate()) {
        // Upload user avatar if uploaded
        if (typeof this.newAvatarImage === "object") {
          try {
            const storage = getStorage();

            // Upload the image to storage
            const snapshot = await uploadBytes(
              ref(
                storage,
                `profileAvatars/${this.userProfile.email}/avatar.jpg`
              ),
              this.newAvatarImage
            );

            // Get the image url
            this.userProfile.imageUrl = await getDownloadURL(snapshot.ref);
          } catch (error) {
            this.loadingProfile = false;
            this.editUserProfile = false;

            // Display error toast
            this.toastMessage = error.code;
            this.toastSuccess = false;
            this.showToast = true;
            return;
          }
        }

        // Upload the user profile to the database
        try {
          const db = getFirestore();
          await setDoc(
            doc(db, "profiles", this.userProfile.email),
            this.userProfile,
            {
              merge: true,
            }
          );

          this.loadingProfile = false;
          this.editUserProfile = false;

          // Display success toast
          this.toastMessage = "Profile updated successfully!";
          this.toastSuccess = true;
          this.showToast = true;
        } catch (error) {
          this.loadingProfile = false;
          this.editUserProfile = false;

          // Display success toast
          this.toastMessage = error.code;
          this.toastSuccess = false;
          this.showToast = true;
        }
      }
    },
  },
  components: {
    AvatarField,
    Toast,
    // UnitField,
  },
};
</script>

<style scoped>
.avatar-upload > input {
  display: none;
}

.avatar-upload #avatar-label {
  cursor: pointer;
}
</style>