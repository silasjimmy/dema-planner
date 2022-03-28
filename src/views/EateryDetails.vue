<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-card-title>
        <!-- Back button -->
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Eatery details -->
      <v-card-text class="py-0">
        <v-container>
          <v-row>
            <!-- Eatery image -->
            <v-col cols="12" lg="5">
              <v-img
                :src="eatery.imageUrl"
                class="rounded-lg"
                height="200px"
              ></v-img>
            </v-col>

            <v-col cols="12" lg="7" align-self="end" class="text--primary">
              <div class="text-center text-lg-left">
                <!-- Eatery name -->
                <h1 class="font-weight-medium text-h5 text-capitalize">
                  {{ eatery.name }}
                </h1>

                <!-- Eatery ratings -->
                <div
                  class="
                    my-2
                    d-flex
                    align-center
                    justify-center justify-lg-start
                  "
                >
                  <v-rating
                    :value="eatery.ratings"
                    background-color="grey"
                    color="orange"
                    dense
                    half-increments
                    readonly
                    size="20"
                  ></v-rating>
                  <span class="subtitle-2 ml-4">({{ eatery.ratings }})</span>
                </div>

                <!-- Eatery bio -->
                <p class="blockquote pl-0 py-0">
                  {{ eatery.bio }}
                </p>
              </div>
            </v-col>

            <v-col cols="12" v-if="userMeals.length > 0">
              <p class="text-center mb-0">
                You have meals suggested in this eatery
              </p>
              <div
                v-for="(meal, index) in userMeals"
                :key="index"
                class="d-flex justify-space-between align-center mt-4"
              >
                <span class="subtitle-1 text--primary">{{
                  meal.mealName
                }}</span>
                <v-btn
                  small
                  :disabled="meal.reservedSeat"
                  :loading="bookSeatLoading[index]"
                  color="success"
                  @click="bookSeat(index)"
                >
                  {{ meal.reservedSeat ? "seat booked" : "book a seat" }}
                  <v-icon right v-if="meal.reservedSeat">mdi-check-all</v-icon>
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" lg="5" class="mx-auto mx-lg-0">
              <v-list two-line class="py-0">
                <!-- Location -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-map-marker </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Location</v-list-item-title>
                    <v-list-item-subtitle class="text-capitalize"
                      >{{ eatery.town }},
                      {{ eatery.country }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <!-- Email -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-email </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Email address</v-list-item-title>
                    <v-list-item-subtitle>{{
                      eatery.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- Phone number -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon> mdi-phone </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Phone number</v-list-item-title>
                    <v-list-item-subtitle>{{
                      eatery.phoneNumber
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- Website -->
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-web</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Website</v-list-item-title>
                    <v-list-item-subtitle>{{
                      eatery.website
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-divider class="d-none"></v-divider>

                <!-- Send message button -->
                <v-list-item class="justify-center d-none">
                  <v-btn text rounded color="success">
                    <v-icon left>mdi-message-text</v-icon>
                    Send a message
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" lg="7">
              <v-data-table
                divider
                class="elevation-1"
                :items="menu.foods"
                :items-per-page="3"
                :search="searchFood"
                sort-by="name"
                :headers="headers"
              >
                <template v-slot:top>
                  <v-toolbar flat class="rounded-lg">
                    <v-toolbar-title>Menu</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-text-field
                      hide-details
                      outlined
                      dense
                      single-line
                      class="shrink"
                      v-model="searchFood"
                      append-icon="mdi-magnify"
                      label="Search for food..."
                      color="green"
                    ></v-text-field>
                  </v-toolbar>
                </template>
              </v-data-table>

              <div class="pt-4 text-center d-none">
                <p>You have meals today in this eatery</p>
                <v-list-item class="justify-center">
                  <v-btn text rounded color="success">
                    <v-icon left>mdi-phone</v-icon>
                    Reserve a seat
                  </v-btn>
                </v-list-item>
              </div>
            </v-col>
          </v-row>
        </v-container>
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
import { mapActions, mapGetters, mapState } from "vuex";
import Toast from "@/components/Toast.vue";

export default {
  name: "EateryDetails",
  title: "Eatery details",
  async created() {
    if (this.$store.state.eateries.length === 0) await this.getEateriesAction();
    if (this.$store.state.allMenus.length === 0) await this.setAllMenusAction();
    if (this.$store.state.suggestedEateries.length === 0)
      await this.getSuggestedEateriesAction();

    this.eatery = this.getEateryById(this.id);
    this.menu = this.getMenuById(this.eatery.id);
    this.userMeals = this.suggestedEateries.filter(
      (e) => e.eateryName === this.eatery.name
    );
    this.bookSeatLoading = this.userMeals.map(() => false);
  },
  data() {
    return {
      eatery: {},
      menu: {},
      userMeals: [],
      bookSeatLoading: [],
      searchFood: "",
      showToast: false,
      toastMessage: "",
      actionSuccess: true,
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Cost", value: "cost", align: "center", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(["suggestedEateries"]),
    ...mapGetters(["getEateryById", "getMenuById"]),
  },
  methods: {
    ...mapActions([
      "getEateriesAction",
      "setAllMenusAction",
      "getSuggestedEateriesAction",
      "updateSuggestedEateryAction",
      "addEateryBookingAction",
    ]),
    async bookSeat(index) {
      try {
        this.$set(this.bookSeatLoading, index, true);
        const userMeal = this.userMeals[index];

        const booking = {
          name: this.$store.state.profile.name,
          email: this.$store.state.email,
          meals: [
            {
              time: userMeal.mealTime,
              foods: userMeal.foods.map((f) => f.name),
            },
          ],
        };

        await this.addEateryBookingAction({
          email: this.eatery.email,
          booking: booking,
        });
        await this.updateSuggestedEateryAction(userMeal);

        this.toastMessage = "Seat booked successfully!";
        this.actionSuccess = true;
      } catch (error) {
        this.toastMessage = error.code;
        this.actionSuccess = false;
      } finally {
        this.$set(this.bookSeatLoading, index, false);
        this.showToast = true;
      }
    },
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Toast,
  },
};
</script>

<style>
</style>