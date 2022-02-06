<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-list subheader two-line>
        <v-subheader>Bio</v-subheader>
        <v-list-item three-line>
          <v-list-item-avatar
            tile
            size="80"
            class="rounded-circle"
            color="grey"
          >
            <v-img :src="userProfile.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h5">{{
              userProfile.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ age }} years old</v-list-item-subtitle>
            <v-list-item-subtitle>{{
              userProfile.gender
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-dialog persistent v-model="bioDialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                  <span>Edit bio</span>
                  <v-btn icon @click="bioDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card-text class="text-center">
                  <div class="avatar-upload mb-4">
                    <v-img
                      width="80px"
                      height="80px"
                      class="rounded-circle mx-auto d-flex align-center"
                      src="https://cdn.vuetifyjs.com/images/john.png"
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
                  <v-text-field
                    outlined
                    dense
                    clearable
                    type="date"
                    color="success"
                    prepend-icon="mdi-calendar"
                    label="Date of birth"
                    v-model="userProfile.birthdate"
                  ></v-text-field>
                  <v-select
                    outlined
                    clearable
                    dense
                    hide-details
                    prepend-icon="mdi-account"
                    color="success"
                    :items="['Male', 'Female']"
                    v-model="userProfile.gender"
                    label="Gender"
                  ></v-select>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    color="success"
                    class="text-none"
                    @click="saveProfile('bio')"
                  >
                    Save
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-action>
        </v-list-item>

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
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  title: "Profile",
  name: "Profile",
  created() {
    this.$store.commit("setDashboardLinks", localStorage.getItem("userRole"));
    this.loadProfile();
  },
  data() {
    return {
      editProfile: true,
      bioDialog: false,
      primaryInfoDialog: false,
      secondaryInfoDialog: false,
      goalsDialog: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    age() {
      return 21;
    },
  },
  methods: {
    ...mapActions(["getUserProfileAction"]),
    loadProfile() {
      this.getUserProfileAction();
    },
    saveProfile(section) {
      switch (section) {
        case "bio":
          this.bioDialog = false;
          break;
        case "primaryInfo":
          this.primaryInfoDialog = false;
          break;
        case "secondaryInfo":
          this.secondaryInfoDialog = false;
          break;
        case "goals":
          this.goalsDialog = false;
          break;
        default:
          break;
      }
      console.log(this.userProfile);
    },
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