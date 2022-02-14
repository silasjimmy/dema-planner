<template>
  <v-snackbar
    right
    :value="show"
    :transition="show ? 'scroll-x-reverse-transition' : 'scroll-x-transition'"
    :timeout="3000"
  >
    <div class="d-flex align-center">
      <v-icon :color="success ? 'success' : 'error'">{{
        success ? "mdi-check-circle" : "mdi-alert-circle"
      }}</v-icon>
      <span class="ml-2">{{ message }}</span>
    </div>

    <template v-slot:action>
      <v-btn text :color="success ? 'success' : 'error'" @click="close">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Toast",
  methods: {
    close() {
      this.$emit("close");
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
</style>