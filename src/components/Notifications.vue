<template>
  <v-container>
    <v-card outlined class="rounded-lg">
      <v-card-text>
        <v-subheader>
          <v-divider></v-divider>
          <span class="mx-4">Today</span>
          <v-divider></v-divider>
        </v-subheader>
        <v-list-item link class="mb-1">
          <v-list-item-content>
            <v-list-item-title>
              Hey there! Are you still interested in trying out this meal?
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <span class="text--secondary caption">10:40am</span>
          </v-list-item-action>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              Something happed in an eatery. Check out the details
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <span class="text--secondary caption">08:32am</span>
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
};
</script>

<style scoped>
</style>