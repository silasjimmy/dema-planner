<template>
  <v-dialog persistent scrollable :width="dialogWidth" v-model="dialog">
    <v-card>
      <v-card-title>
        <span>{{ foodAction === "new" ? "Add new food" : "Edit food" }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="text-center" style="max-height: 70vh">
        <v-form ref="foodForm" lazy-validation>
          <!-- Required details -->
          <v-sheet>
            <v-subheader>Required</v-subheader>

            <v-container>
              <v-row>
                <!-- Image upload switch button -->
                <v-col cols="12" align="center">
                  <v-btn
                    rounded
                    text
                    small
                    @click="fileUpload = !fileUpload"
                    color="success"
                  >
                    {{
                      fileUpload
                        ? "Add image url instead"
                        : "Upload image instead"
                    }}
                  </v-btn>
                </v-col>
                <!-- Food image -->
                <v-col cols="12">
                  <avatar-field
                    v-if="fileUpload"
                    :src="food.imageUrl"
                    @imageChange="uploadFoodImg"
                  ></avatar-field>
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    clearable
                    v-if="!fileUpload"
                    :rules="[rules.required]"
                    color="success"
                    label="Image link"
                    type="url"
                    v-model="food.imageUrl"
                    prepend-icon="mdi-link-plus"
                  ></v-text-field>
                </v-col>
                <!-- Food name -->
                <v-col cols="12" md="6">
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    clearable
                    :rules="[rules.required]"
                    color="success"
                    label="Name"
                    type="text"
                    prepend-icon="mdi-pizza"
                    v-model="food.name"
                  ></v-text-field>
                </v-col>
                <!-- Food group -->
                <v-col cols="12" md="6">
                  <v-select
                    dense
                    outlined
                    hide-details
                    :rules="[rules.required]"
                    color="success"
                    label="Group"
                    type="text"
                    item-color="success"
                    prepend-icon="mdi-select-group"
                    v-model="food.group"
                    :items="foodValues.groups"
                  ></v-select>
                </v-col>
                <!-- Food nutrient -->
                <v-col cols="12" md="6">
                  <v-select
                    dense
                    outlined
                    hide-details
                    :rules="[rules.required]"
                    color="success"
                    label="Nutrient"
                    type="text"
                    item-color="success"
                    prepend-icon="mdi-nutrition"
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
                    hide-details
                    :rules="[rules.required]"
                    color="success"
                    type="number"
                    prepend-icon="mdi-weight"
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
                <v-col cols="12" md="6">
                  <v-select
                    dense
                    outlined
                    hide-details
                    :rules="[rules.required]"
                    color="success"
                    label="Form"
                    type="text"
                    prepend-icon="mdi-liquid-spot"
                    item-color="success"
                    v-model="food.form"
                    :items="foodValues.forms"
                  ></v-select>
                </v-col>
                <!-- Food calories -->
                <v-col cols="12" md="6">
                  <v-text-field
                    outlined
                    dense
                    hide-spin-buttons
                    hide-details
                    :rules="[rules.required]"
                    color="success"
                    type="number"
                    label="Calories"
                    prepend-icon="mdi-scale"
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
                    hide-details
                    small-chips
                    :rules="[required]"
                    color="success"
                    label="Regions"
                    item-color="success"
                    prepend-icon="mdi-map-marker-question"
                    :items="foodValues.regions"
                    v-model="food.regions"
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <v-divider class="my-4"></v-divider>

          <!-- Show/hide the recipe section -->
          <v-btn
            text
            rounded
            small
            color="success"
            @click="showMore = !showMore"
          >
            {{ showMore ? "Show less" : "Show more" }}
            <v-icon right>{{
              showMore ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>

          <!-- Recipe details -->
          <v-sheet v-if="showMore">
            <div class="d-flex justify-space-between align-center">
              <v-subheader>Ingredients</v-subheader>
              <v-btn text small rounded color="success" @click="addIngredient">
                <v-icon left>mdi-plus</v-icon>
                Add ingredient
              </v-btn>
            </div>

            <v-container>
              <v-row
                v-for="(ingredient, i) in food.ingredients"
                :key="`ingredient${i}`"
              >
                <v-col cols="12" lg="4">
                  <v-text-field
                    outlined
                    dense
                    hide-spin-buttons
                    hide-details
                    color="success"
                    label="Name"
                    type="text"
                    prepend-icon="mdi-pizza"
                    placeholder="Example: Milk"
                    v-model="ingredient.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" lg="4">
                  <v-text-field
                    outlined
                    dense
                    hide-spin-buttons
                    hide-details
                    color="success"
                    label="Unit"
                    type="text"
                    prepend-icon="mdi-pizza"
                    placeholder="Example: cup"
                    v-model="ingredient.unit"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" lg="3">
                  <v-text-field
                    outlined
                    dense
                    hide-spin-buttons
                    hide-details
                    color="success"
                    label="Amount"
                    type="number"
                    prepend-icon="mdi-numeric"
                    placeholder="Example: 2"
                    v-model="ingredient.amount"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" lg="1" align="center"
                  ><v-btn
                    icon
                    :disabled="food.ingredients.length === 1"
                    @click="deleteIngredient(i)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <v-divider v-if="showMore" class="my-4"></v-divider>

          <v-sheet v-if="showMore">
            <div class="d-flex justify-space-between align-center">
              <v-subheader>Instructions</v-subheader>
              <v-btn text small rounded color="success" @click="addInstruction">
                <v-icon left>mdi-plus</v-icon>
                Add instruction
              </v-btn>
            </div>

            <v-container>
              <v-row
                v-for="(instruction, i) in food.instructions"
                :key="`instruction${i}`"
              >
                <v-col cols="12" lg="3">
                  <v-text-field
                    outlined
                    dense
                    hide-spin-buttons
                    hide-details
                    color="success"
                    label="Step"
                    prepend-icon="mdi-numeric"
                    type="number"
                    placeholder="Example: 1"
                    v-model="instruction.step"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" lg="8">
                  <v-text-field
                    outlined
                    dense
                    clearable
                    hide-spin-buttons
                    hide-details
                    color="success"
                    label="Description"
                    type="text"
                    prepend-icon="mdi-message-bulleted"
                    placeholder="Example: Add one cup of water"
                    v-model="instruction.description"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" lg="1" align="center">
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
          </v-sheet>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn rounded text :loading="loading" color="success" @click="save">
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
      showMore: false,
      rules: {
        required: (value) => !!value || "This field is required!",
      },
      foodValues: {
        nutrients: [
          { text: "Protein", value: "protein" },
          { text: "Carbohydrate", value: "carbohydrate" },
          { text: "Vitamin", value: "vitamin" },
        ],
        groups: [
          { text: "Starch", value: "starch" },
          { text: "Sugar", value: "sugar" },
          { text: "Animal protein", value: "animal protein" },
          { text: "Vegetable", value: "vegetable" },
          { text: "Fruit", value: "fruit" },
          { text: "Legume", value: "legume" },
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
  computed: {
    dialogWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          return "50vw";
        case "lg":
          return "60vw";
        case "md":
          return "70vw";
        case "sm":
          return "80vw";
        case "xs":
          return "100vw";
        default:
          return "100vw";
      }
    },
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
    uploadFoodImg(e) {
      this.$emit("uploadFoodImg", e);
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