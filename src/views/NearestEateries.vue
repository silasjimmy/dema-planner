<template>
  <v-card flat>
    <!-- Loading foods -->
    <data-loader
      :show="loadingData"
      :message="loadingDataMessage"
      :success="loadingDataSuccess"
    ></data-loader>

    <v-card-text v-if="!loadingData">
      <!-- No eateries message -->
      <v-subheader
        class="justify-center subtitle-2 text-md-subtitle-1 font-weight-regular"
        v-if="eateries.length === 0"
        >{{ $t("eateries.p.no") }}</v-subheader
      >

      <!-- Eateries list -->
      <v-subheader
        class="justify-center subtitle-2 text-md-subtitle-1 font-weight-regular"
        v-if="eateries.length > 0"
        >{{ $t("eateries.p.yes") }}</v-subheader
      >
      <v-container v-if="eateries.length > 0">
        <v-row>
          <v-col v-for="eatery in eateries" :key="eatery.name" cols="12" lg="6">
            <v-card outlined class="rounded-lg">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="
                      text-capitalize
                      subtitle-1
                      text-md-h6
                      font-weight-medium
                    "
                    >{{ eatery.name }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    class="
                      text-capitalize
                      subtitle-2
                      text-md-subtitle-1
                      font-weight-regular
                    "
                    >{{ eatery.town }},
                    {{ eatery.country }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="d-flex align-center">
                    <v-rating
                      :value="eatery.ratings"
                      background-color="grey"
                      color="orange"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>
                    <span class="caption ml-4">{{ eatery.ratings }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  class="rounded-lg"
                  color="grey"
                  width="80px"
                  height="70px"
                >
                  <v-img :src="eatery.imageUrl"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  link
                  plain
                  rounded
                  class="subtitle-2 text-md-subtitle-1 font-weight-regular"
                  :to="{ name: 'eatery-details', params: { id: eatery.id } }"
                  >{{ $t("eateries.btn") }}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DataLoader from "@/components/DataLoader.vue";

export default {
  title: "Nearest eateries",
  name: "NearestEateries",
  async created() {
    try {
      this.loadingData = true;

      if (this.eateries.length === 0) await this.getEateriesAction();
      if (this.$store.state.allMenus.length === 0)
        await this.setAllMenusAction();
    } catch (error) {
      this.loadingDataMessage = error.code;
      this.loadingDataSuccess = false;
    } finally {
      this.loadingData = false;
    }
  },
  data() {
    return {
      loadingData: false,
      loadingDataMessage: "Checking eateries...",
      loadingDataSuccess: true,
    };
  },
  computed: {
    ...mapState(["eateries"]),
  },
  methods: {
    ...mapActions(["getEateriesAction", "setAllMenusAction"]),
  },
  components: {
    DataLoader,
  },
};
</script>

<style scoped>
</style>