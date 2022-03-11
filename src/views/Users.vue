<template>
  <v-container fluid>
    <v-card flat>
      <!-- Load users -->
      <data-loader
        :show="loadingData"
        :message="loadingDataMessage"
        :success="loadingDataSuccess"
      ></data-loader>

      <v-card-text v-if="!loadingData">
        <!-- Users data table -->
        <v-data-table
          divider
          item-key="name"
          :headers="headers"
          :items="allUsers"
          :items-per-page="5"
          :search="searchUser"
          sort-by="name"
        >
          <template v-slot:top>
            <v-toolbar flat class="rounded-lg">
              <!-- Search user field -->
              <v-text-field
                hide-details
                outlined
                dense
                single-line
                class="shrink"
                v-model="searchUser"
                append-icon="mdi-magnify"
                label="Search for user..."
                color="green"
              ></v-text-field>

              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DataLoader from "@/components/DataLoader.vue";

export default {
  name: "Users",
  title: "Users",
  async created() {
    try {
      this.loadingData = true;
      if (this.allUsers.length === 0) await this.getAllUsersAction();
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
      loadingDataMessage: "Fetching users data...",
      loadingDataSuccess: true,
      searchUser: "",
      headers: [
        {
          text: "Name",
          value: "name",
          align: "center",
        },
        { text: "Type", value: "role", align: "center" },
      ],
    };
  },
  computed: {
    ...mapState(["allUsers"]),
  },
  methods: {
    ...mapActions(["getAllUsersAction"]),
  },
  components: {
    DataLoader,
  },
};
</script>