<template>
  <v-dialog persistent scrollable :width="width" v-model="dialog">
    <v-card>
      <v-card-title>
        <span>{{ foodAction === "new" ? "Add new food" : "Edit food" }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text style="max-height: 70vh">
        <v-form ref="foodForm" lazy-validation>
          <v-container>
            <v-row no-gutters>
              <!-- Image upload switch button -->
              <v-col cols="12" align="center">
                <v-btn
                  rounded
                  small
                  disabled
                  @click="fileUpload = !fileUpload"
                  class="text-none mb-2"
                  color="success"
                  >{{ fileUpload ? "Add image url" : "Upload image" }}</v-btn
                >
              </v-col>
              <!-- Food image -->
              <v-col cols="12">
                <avatar-field v-if="fileUpload"></avatar-field>
                <v-text-field
                  outlined
                  dense
                  v-if="!fileUpload"
                  :rules="[rules.required]"
                  color="success"
                  label="Image link"
                  type="url"
                  v-model="food.imageUrl"
                ></v-text-field>
              </v-col>
              <!-- Food name -->
              <v-col cols="12" md="6" lg="4">
                <v-text-field
                  outlined
                  dense
                  :rules="[rules.required]"
                  color="success"
                  label="Name"
                  type="text"
                  v-model="food.name"
                ></v-text-field>
              </v-col>
              <!-- Food group -->
              <v-col cols="12" md="6" lg="4">
                <v-select
                  dense
                  outlined
                  :rules="[rules.required]"
                  color="success"
                  label="Group"
                  type="text"
                  item-color="success"
                  v-model="food.group"
                  :items="foodValues.groups"
                ></v-select>
              </v-col>
              <!-- Food nutrient -->
              <v-col cols="12" md="6">
                <v-select
                  dense
                  outlined
                  :rules="[rules.required]"
                  color="success"
                  label="Nutrient"
                  type="text"
                  item-color="success"
                  v-model="food.nutrient.name"
                  :items="foodValues.nutrients"
                ></v-select>
              </v-col>
              <!-- Nutrient amount -->
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="[rules.required]"
                  color="success"
                  type="number"
                  label="Nutrient amount"
                  :suffix="food.nutrient.units"
                  v-model="food.nutrient.amount"
                >
                  <template v-slot:append>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on"> mdi-menu-down </v-icon>
                      </template>
                      <v-list dense>
                        <v-list-item
                          v-for="(unit, i) in units.nutrients"
                          :key="i"
                          @click="setUnits('nutrients', unit.value)"
                        >
                          <v-list-item-title>{{
                            unit.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
              <!-- Food form -->
              <v-col cols="12" md="6" lg="4">
                <v-select
                  dense
                  outlined
                  :rules="[rules.required]"
                  color="success"
                  label="Form"
                  type="text"
                  item-color="success"
                  v-model="food.form"
                  :items="foodValues.forms"
                ></v-select>
              </v-col>
              <!-- Food calories -->
              <v-col cols="12" md="6" lg="4">
                <v-text-field
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="[rules.required]"
                  color="success"
                  type="number"
                  label="Calories"
                  :suffix="food.calories.units"
                  v-model="food.calories.amount"
                >
                  <template v-slot:append>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on"> mdi-menu-down </v-icon>
                      </template>
                      <v-list dense>
                        <v-list-item
                          v-for="(unit, i) in units.calories"
                          :key="i"
                          @click="setUnits('calories', unit.value)"
                        >
                          <v-list-item-title>{{
                            unit.title
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
              <!-- Food regions -->
              <v-col cols="12">
                <v-combobox
                  outlined
                  dense
                  multiple
                  clearable
                  hide-selected
                  small-chips
                  :rules="[required]"
                  color="success"
                  label="Regions"
                  item-color="success"
                  :items="foodValues.regions"
                  v-model="food.regions"
                ></v-combobox>
              </v-col>
              <!-- Food ingredients -->
              <v-col
                cols="12"
                class="d-flex justify-space-between align-center mb-2"
              >
                <v-subheader>Ingredients</v-subheader>
                <v-btn icon @click="addIngredient">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col
                v-for="(ingredient, i) in food.ingredients"
                :key="`ingredient${i}`"
                cols="12"
                class="d-flex"
              >
                <v-text-field
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="[rules.required]"
                  color="success"
                  label="Amount"
                  type="number"
                  placeholder="Example: 2"
                  v-model="ingredient.amount"
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="[rules.required]"
                  color="success"
                  label="Unit"
                  type="text"
                  placeholder="Example: cup"
                  v-model="ingredient.unit"
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="[rules.required]"
                  color="success"
                  label="Name"
                  type="text"
                  placeholder="Example: milk"
                  v-model="ingredient.name"
                ></v-text-field>
                <v-btn
                  icon
                  :disabled="food.ingredients.length === 1"
                  @click="deleteIngredient(i)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
              <!-- Food instructions -->
              <v-col
                cols="12"
                class="d-flex justify-space-between align-center mb-2"
              >
                <v-subheader>Instructions</v-subheader>
                <v-btn icon @click="addInstruction">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col
                v-for="(instruction, i) in food.instructions"
                :key="`instruction${i}`"
                cols="12"
                class="d-flex"
              >
                <v-text-field
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="[rules.required]"
                  color="success"
                  label="Step"
                  class="shrink"
                  type="number"
                  placeholder="Example: 1"
                  v-model="instruction.step"
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="[rules.required]"
                  color="success"
                  label="Description"
                  type="text"
                  class="grow"
                  placeholder="Example: Add one cup of water"
                  v-model="instruction.description"
                ></v-text-field>
                <v-btn
                  icon
                  :disabled="food.instructions.length === 1"
                  @click="deleteInstruction(i)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn
          rounded
          :loading="loading"
          color="success"
          class="text-none"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AvatarField from "./AvatarField.vue";

export default {
  name: "FoodForm",
  data() {
    return {
      fileUpload: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      foodValues: {
        nutrients: [
          { text: "Proteins", value: "proteins" },
          { text: "Carbohydrates", value: "carbohydrates" },
          { text: "Vitamins", value: "vitamins" },
        ],
        groups: [
          { text: "Starch", value: "starch" },
          { text: "Animal proteins", value: "animal proteins" },
          { text: "Vegetables", value: "vegetables" },
        ],
        forms: [
          { text: "Solid", value: "solid" },
          { text: "Liquid", value: "liquid" },
          { text: "Plasma", value: "plasma" },
        ],
        regions: ["Kenya"],
      },
      units: {
        nutrients: [
          { title: "Grams", value: "g" },
          { title: "Kilograms", value: "kg" },
        ],
        calories: [
          { title: "Calories", value: "cal" },
          { title: "Kilo calories", value: "kcal" },
        ],
      },
    };
  },
  methods: {
    required(value) {
      if (value instanceof Array && value.length == 0) {
        return "Required.";
      }
      return !!value || "This field is required!.";
    },
    setUnits(unit, value) {
      this.$emit("setUnits", unit, value);
    },
    addIngredient() {
      this.$emit("addIngredient");
    },
    addInstruction() {
      this.$emit("addInstruction");
    },
    deleteIngredient(index) {
      this.$emit("deleteIngredient", index);
    },
    deleteInstruction(index) {
      this.$emit("deleteInstruction", index);
    },
    save() {
      this.$emit("save", this.$refs.foodForm.validate());
    },
    close() {
      this.$emit("close");
    },
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    food: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: "60vw",
    },
    foodAction: {
      type: String,
      default: "",
    },
  },
  components: {
    AvatarField,
  },
};
</script>