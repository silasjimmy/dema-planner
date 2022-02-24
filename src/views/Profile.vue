<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- Consumer profile view -->
      <v-list subheader two-line v-if="$store.state.role === 'consumer'">
        <v-list-item three-line>
          <v-list-item-avatar tile size="80" class="rounded-circle">
            <v-img :src="profile.imageUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h5">{{
              profile.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ age() }} years old</v-list-item-subtitle>
            <v-list-item-subtitle>{{ profile.gender }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="editProfile = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <!-- Location -->
        <v-list-item>
          <v-list-item-avatar>
            <v-icon> mdi-map-marker </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle
              >{{ profile.town }}, {{ profile.country }}</v-list-item-subtitle
            >
          </v-list-item-content>
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
            <v-list-item-subtitle>{{ profile.diet }}</v-list-item-subtitle>
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
                    v-model="profile.diet"
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
                    v-model="profile.height.amount"
                    :suffix="profile.height.units"
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
                    v-model="profile.weight.amount"
                    :suffix="profile.weight.units"
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
              >{{ profile.height.amount }}
              {{ profile.height.units }}</v-list-item-subtitle
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
              >{{ profile.weight.amount }}
              {{ profile.weight.units }}</v-list-item-subtitle
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
              profile.bodyFat
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
                    v-model="profile.bodyFat"
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
                    v-model="profile.activityLevel"
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
                    v-model="profile.healthCondition"
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
              profile.activityLevel
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
              profile.healthCondition
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
              >{{ profile.goal }} - {{ profile.target.amount }}
              {{ profile.target.units }}</v-list-item-subtitle
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
                    v-model="profile.goal"
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
                    v-model="profile.target.amount"
                    :suffix="profile.target.units"
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
                    v-model="profile.minimumSpending.amount"
                    :suffix="profile.minimumSpending.currency"
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
              >{{ profile.minimumSpending.currency }}
              {{ profile.minimumSpending.amount }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item> -->
      </v-list>

      <!-- Eatery profile view -->
      <v-img
        v-if="$store.state.role === 'eatery'"
        class="white--text align-end"
        height="200px"
        :src="profile.imageUrl"
        gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 text-capitalize white--text">{{
              profile.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="grey--text text--lighten-2"
              >Eatery ratings</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="editProfile = true">
              <v-icon color="white">mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-img>

      <v-list subheader two-line v-if="$store.state.role === 'eatery'">
        <!-- Location -->
        <v-list-item>
          <v-list-item-avatar>
            <v-icon> mdi-map-marker </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle
              >{{ profile.town }}, {{ profile.country }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Consumer edit profile form -->
    <v-dialog
      persistent
      scrollable
      v-if="$store.state.role === 'consumer'"
      v-model="editProfile"
      :width="dialogWidth"
    >
      <v-card>
        <v-card-title>
          <span>Edit profile</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="editProfile = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

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
                    :src="profile.imageUrl"
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
                    v-model="profile.name"
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
                    v-model="profile.dateOfBirth"
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
                    v-model="profile.gender"
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

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            text
            color="success"
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
      v-if="$store.state.role === 'eatery'"
      v-model="editProfile"
      width="500"
    >
      <v-card>
        <v-card-title>
          <span>Edit profile</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="editProfile = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

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
                    :src="profile.imageUrl"
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
                    v-model="profile.name"
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
            text
            color="success"
            :loading="loadingProfile"
            @click="saveProfile()"
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
import { mapState, mapActions } from "vuex";
import { differenceInYears, format, parseISO } from "date-fns";
import { defaultImageUrl, uploadImage } from "../utils";
import AvatarField from "@/components/AvatarField.vue";
import Toast from "@/components/Toast.vue";
// import UnitField from "@/components/UnitField.vue";

export default {
  title: "Profile",
  name: "Profile",
  async created() {
    // Fetch user's profile'
    await this.getProfileAction();
  },
  data() {
    return {
      editProfile: false,
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
    ...mapState(["profile"]),
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
    ...mapActions(["getProfileAction", "uploadProfileAction"]),
    age() {
      return differenceInYears(new Date(), new Date(this.profile.dateOfBirth));
    },
    formatDate() {
      return format(parseISO(this.profile.dateOfBirth), "yyyy-MM-dd");
    },
    updateImageUrl(e) {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.profile.imageUrl = reader.result;
      };

      let images = e.target.files || e.dataTransfer.files;

      if (!images.length) this.profile.imageUrl = defaultImageUrl;
      else {
        this.newAvatarImage = images[0];
        this.profile.imageUrl = reader.readAsDataURL(images[0]);
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
            this.profile.imageUrl = await uploadImage(this.newAvatarImage);
          } catch (error) {
            this.loadingProfile = false;
            this.editProfile = false;

            // Display error toast
            this.toastMessage = error.code;
            this.toastSuccess = false;
            this.showToast = true;
            return;
          }
        }

        try {
          // Upload the user profile to the database
          await this.uploadProfileAction(this.profile);

          this.loadingProfile = false;
          this.editProfile = false;

          // Display success toast
          this.toastMessage = "Profile updated successfully!";
          this.toastSuccess = true;
          this.showToast = true;
        } catch (error) {
          this.loadingProfile = false;
          this.editProfile = false;

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