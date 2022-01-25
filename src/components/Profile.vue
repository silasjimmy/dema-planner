<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="text--secondary my-2">You can edit and save your profile.</p>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-toolbar
            flat
            prominent
            src="https://picsum.photos/1920/1080?random"
          >
            <template v-slot:extension>
              <v-fade-transition>
                <v-btn
                  fab
                  absolute
                  bottom
                  right
                  v-show="editProfile"
                  @click="editProfile = false"
                  color="success"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-fade-transition>
            </template>
          </v-toolbar>
          <v-card-text class="d-flex px-8">
            <div class="avatar-upload">
              <v-img
                width="100px"
                height="100px"
                class="rounded-circle"
                src="https://cdn.vuetifyjs.com/images/john.png"
              ></v-img>
              <label id="avatar-label" for="avatar" class="float-right">
                <v-icon v-if="!editProfile" class="icon" color="grey darken-3"
                  >mdi-camera</v-icon
                >
              </label>

              <input id="avatar" type="file" accept="image/*" />
            </div>
            <v-spacer></v-spacer>
            <div class="align-self-end d-flex">
              <div class="green--text">
                <v-icon small color="green" class="mr-1">mdi-home</v-icon>
                <span>online</span>
              </div>
            </div>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    :readonly="editProfile"
                    hide-details
                    type="text"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Name"
                    v-model="profile.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    :readonly="editProfile"
                    hide-details
                    type="email"
                    color="success"
                    prepend-icon="mdi-email"
                    label="Email"
                    v-model="profile.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    :readonly="editProfile"
                    hide-details
                    type="date"
                    color="success"
                    prepend-icon="mdi-calendar"
                    label="Date of birth"
                    v-model="profile.birthdate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    readonly
                    hide-details
                    dense
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Age"
                    v-model="age"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    outlined
                    :readonly="editProfile"
                    hide-details
                    dense
                    prepend-icon="mdi-account"
                    color="success"
                    :items="['Male', 'Female']"
                    v-model="profile.gender"
                    label="Gender"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    :readonly="editProfile"
                    hide-details
                    dense
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Weight"
                    v-model="profile.weight.amount"
                    :suffix="profile.weight.units"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    :readonly="editProfile"
                    hide-details
                    dense
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Height"
                    v-model="profile.height.amount"
                    :suffix="profile.height.units"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    outlined
                    :readonly="editProfile"
                    hide-details
                    dense
                    prepend-icon="mdi-account"
                    item-color="success"
                    color="success"
                    :items="['Not active', 'Lightly active', 'Very active']"
                    v-model="profile.activityLevel"
                    label="Activity level"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    outlined
                    :readonly="editProfile"
                    hide-details
                    dense
                    prepend-icon="mdi-account"
                    color="success"
                    item-color="success"
                    :items="['Low', 'Medium', 'High']"
                    v-model="profile.bodyFat"
                    label="Body fat"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    outlined
                    :readonly="editProfile"
                    hide-details
                    dense
                    prepend-icon="mdi-pizza"
                    item-color="success"
                    color="success"
                    :items="['Anything', 'Vegan', 'Vegeterian']"
                    v-model="profile.diet"
                    label="Diet"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    outlined
                    :readonly="editProfile"
                    hide-details
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
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    :readonly="editProfile"
                    hide-details
                    dense
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Target"
                    v-model="profile.target.amount"
                    :suffix="profile.target.units"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    outlined
                    dense
                    :readonly="editProfile"
                    hide-details
                    type="number"
                    color="success"
                    prepend-icon="mdi-account"
                    label="Daily min spending"
                    v-model="profile.minimumSpending.amount"
                    :suffix="profile.minimumSpending.currency"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    outlined
                    dense
                    :readonly="editProfile"
                    hide-details
                    prepend-icon="mdi-heart"
                    color="success"
                    item-color="success"
                    :items="['None', 'Diabetic', 'High blood pressure']"
                    v-model="profile.healthCondition"
                    label="Health condition"
                  ></v-select>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn
                    rounded
                    :disabled="editProfile"
                    color="success"
                    class="text-none"
                    @click="saveProfile"
                  >
                    <v-icon left>mdi-home</v-icon>
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  title: "Profile",
  name: "Profile",
  data() {
    return {
      editProfile: true,
      profile: {
        avatar: "",
        name: "John Doe",
        email: "johndoe@domain.com",
        birthdate: "1999-05-02",
        gender: "Male",
        weight: { amount: 50, units: "kg" },
        height: { amount: 250, units: "cm" },
        activityLevel: "Lightly active",
        healthCondition: "Diabetic",
        bodyFat: "Medium",
        diet: "Vegan",
        goal: "Reduce weight",
        target: { amount: 10, units: "kg" },
        minimumSpending: { amount: 100, currency: "ksh" },
      },
    };
  },
  computed: {
    age() {
      return 21;
    },
  },
  methods: {
    saveProfile() {
      this.editProfile = true;
    },
  },
};
</script>

<style scoped>
.avatar-upload > input {
  display: none;
}

.avatar-upload > label {
  margin-top: -25px;
  cursor: pointer;
}
</style>