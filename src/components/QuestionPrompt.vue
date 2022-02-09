<template>
  <v-dialog persistent width="auto" v-model="dialog">
    <v-card>
      <v-card-text class="py-0 text-center">
        <p class="pt-4 subtitle-1">
          {{ question }}
        </p>
      </v-card-text>

      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn text rounded @click="cancel" class="text-none mx-2" color="error"
          >No</v-btn
        >
        <v-btn
          text
          rounded
          class="text-none mx-2"
          color="success"
          @click="confirm"
          >Yes</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>

      <!-- Card overlay -->
      <v-overlay absolute v-model="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "QuestionPrompt",
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    question: {
      type: String,
      default: "",
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>