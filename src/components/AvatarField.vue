<template>
  <v-img
    width="80px"
    height="80px"
    class="rounded-circle mx-auto text-center align-center"
    :src="src"
    gradient="to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)"
  >
    <label for="avatar">
      <v-icon color="white">mdi-camera-plus</v-icon>
    </label>

    <input
      id="avatar"
      v-on:change="imageChange"
      name="avatar.jpg"
      type="file"
      accept="image/*"
    />
  </v-img>
</template>

<script>
export default {
  name: "AvatarField",
  methods: {
    imageChange(e) {
      this.$emit("imageChange", e);
    },
  },
  props: {
    src: {
      type: String,
      default: "",
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