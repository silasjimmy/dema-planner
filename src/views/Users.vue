<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- Users data table -->
      <v-data-table
        divider
        :loading="allUsers.length === 0"
        loading-text="Fetching the users... Please wait"
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
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Users",
  title: "Users",
  created() {
    this.getAllUsersAction();
  },
  data() {
    return {
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
};
</script>