<template>
  <v-container fluid>
    <v-card flat>
      <v-card-subtitle class="text-center subtitle-1">
        Send a request for foods not in the database.
      </v-card-subtitle>

      <v-card-text class="text-center">
        <v-form lazy-validation ref="requestForm">
          <v-text-field
            label="Food name"
            outlined
            dense
            :rules="[rules.required]"
            v-model="food.name"
            color="green"
            prepend-icon="mdi-pizza"
            placeholder="An english name is preferred..."
          ></v-text-field>
          <v-textarea
            outlined
            dense
            :rules="[rules.required]"
            rows="4"
            v-model="food.description"
            label="Description"
            color="green"
            prepend-icon="mdi-message"
            placeholder="Give a detailed description of the food to aid us in searching..."
          ></v-textarea>
        </v-form>
        <v-btn
          rounded
          :loading="submitLoad"
          @click="submitRequest"
          color="success"
          class="text-none"
        >
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
    <!-- Action toast -->
    <toast
      :show="showToast"
      :message="toastMessage"
      :success="actionSuccess"
      @close="showToast = false"
    ></toast>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getCounter, updateCounter } from "../utils";
import Toast from "@/components/Toast.vue";

export default {
  title: "Food request",
  name: "FoodRequest",
  data() {
    return {
      submitLoad: false,
      showToast: false,
      toastMessage: "",
      actionSuccess: true,
      food: {
        id: "",
        sender: this.$store.state.email,
        name: "",
        description: "",
      },
      defaultFood: {
        id: "",
        sender: this.$store.state.email,
        name: "",
        description: "",
      },
      rules: {
        required: (value) => !!value || "This field is required!",
      },
    };
  },
  methods: {
    ...mapActions(["sendFoodRequestAction"]),
    async submitRequest() {
      if (this.$refs.requestForm.validate()) {
        try {
          this.submitLoad = true;

          // Set the food id
          const foodId = await getCounter("requests");
          this.food.id = foodId;

          const db = getFirestore();
          const docRef = doc(db, "requests", `food${this.food.id}`);
          await setDoc(docRef, this.food);

          // Update counter
          await updateCounter("requests", { last: foodId + 1 });

          this.food = Object.assign(this.food, this.defaultFood);

          this.toastMessage = "Request sent successfully!";
          this.actionSuccess = true;
        } catch (error) {
          this.toastMessage = error.code;
          this.actionSuccess = false;
        } finally {
          this.submitLoad = false;
          this.showToast = true;
        }
      }
    },
  },
  components: {
    Toast,
  },
};
</script>