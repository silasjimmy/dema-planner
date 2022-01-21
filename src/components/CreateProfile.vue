<template>
  <v-row class="full-height" align="center">
    <v-col cols="12">
      <h1 class="text-center">Create your profile</h1>
    </v-col>
    <v-col cols="6" class="mx-auto">
      <v-tabs fixed-tabs>
        <v-tab>Consumer</v-tab>
        <v-tab>Eatery</v-tab>
        <v-tab-item>
          <v-text-field
            outlined
            dense
            v-model="fullname"
            label="Full name"
          ></v-text-field>
          <v-btn @click="createProfile" class="text-none" color="success"
            >Submit</v-btn
          >
        </v-tab-item>
        <v-tab-item></v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
import { getFirestore, setDoc, doc } from "firebase/firestore";

export default {
  name: "CreateProfile",
  title: "Create profile",
  data() {
    return {
      fullname: "",
    };
  },
  methods: {
    createProfile() {
      const db = getFirestore();

      setDoc(doc(db, "users", "jimmysilas19@gmail.com"), {
        fullname: this.fullname,
      })
        .then((res) => {
          console.log("Doc written:", res);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>

<style>
</style>