<template>
  <v-container>
    <v-card outlined class="rounded-lg">
      <v-card-text>
        <v-subheader>
          <v-spacer></v-spacer>
          <span class="mx-4">Today</span>
          <v-spacer></v-spacer>
        </v-subheader>
        <v-list-item
          link
          v-for="n in notifications"
          :key="n.id"
          :to="n.link"
          class="py-1"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ n.message }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <span class="text--secondary caption">{{ n.time }}</span>
          </v-list-item-action>
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  title: "Notifications",
  name: "Notifications",
  data() {
    return {
      notifications: [
        { message: "Hey there!", time: "07:00am", id: 1, link: "" },
        {
          message: "The nitty gritty details of it",
          time: "06:12am",
          id: 2,
          link: "",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>