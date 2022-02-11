<template>
  <v-img
    width="80px"
    height="80px"
    class="rounded-circle mx-auto text-center align-center"
    :src="src"
    gradient="to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)"
  >
    <label for="avatar">
      <v-icon class="icon" color="grey lighten-2">mdi-camera-plus</v-icon>
    </label>
    <input id="avatar" v-bind="avatar" type="file" accept="image/*" />
  </v-img>
</template>

<script>
export default {
  name: "AvatarField",
  props: {
    avatar: {
      type: Object,
      default: () => {},
    },
    src: {
      type: String,
      default: "https://cdn.vuetifyjs.com/images/john.png",
    },
  },
};
</script>

<style scoped>
input {
  display: none;
}

label {
  cursor: pointer;
}
</style>