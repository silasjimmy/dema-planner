<template>
  <v-card flat v-if="show">
    <v-card-subtitle class="text--primary text-center">{{
      message
    }}</v-card-subtitle>
    <v-card-text>
      <v-progress-linear
        rounded
        :color="success ? 'success' : 'error'"
        :indeterminate="show"
        height="4"
      ></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DataLoader",
  props: {
    message: {
      type: String,
      default: "Loading...",
    },
    show: {
      type: Boolean,
      default: true,
    },
    success: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
