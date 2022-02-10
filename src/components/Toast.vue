<template>
  <v-snackbar
    :transition="show ? 'scroll-x-reverse-transition' : 'scroll-x-transition'"
    :timeout="3000"
    v-model="show"
  >
    <div class="d-flex align-center">
      <v-icon color="success">mdi-check-circle</v-icon>
      <span class="ml-2">{{ message }}</span>
    </div>

    <template v-slot:action>
      <v-btn color="success" text @click="close"> Close </v-btn>
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
  },
};
</script>

<style>
</style>