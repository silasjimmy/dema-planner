<template>
  <v-text-field
    outlined
    dense
    hide-spin-buttons
    hide-details
    color="success"
    :rules="rules"
    :prepend-icon="icon"
    :type="type"
    :label="label"
    :suffix="suffix"
    v-model="fieldVar"
  >
    <template v-slot:append>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on"> mdi-menu-down </v-icon>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(unit, i) in units"
            :key="i"
            @click="setUnits(unit.value)"
          >
            <v-list-item-title>{{ unit.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "UnitField",
  methods: {
    setUnits(value) {
      this.$emit("setUnits", value);
    },
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    units: {
      type: Array,
      default: () => {},
    },
    rules: {
      type: Array,
      value: () => {},
    },
    label: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    fieldVar: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>