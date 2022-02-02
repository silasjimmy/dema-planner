<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-card-text>
        <v-subheader>
          <v-divider></v-divider>
          <span class="mx-4">Today</span>
          <v-divider></v-divider>
        </v-subheader>
        <v-list-item two-line link class="mb-1">
          <v-list-item-avatar>
            <v-img class="b"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Doe</v-list-item-title>
            <v-list-item-subtitle>
              Can i please get an update on this food? I have requested it a
              long ago.
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <span class="caption text--secondary">10:30am</span>
          </v-list-item-action>
        </v-list-item>
        <v-list-item two-line link>
          <v-list-item-avatar>
            <v-img class="b"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Doe</v-list-item-title>
            <v-list-item-subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              nesciunt, odit dignissimos eligendi sapiente animi blanditiis
              deserunt ea laudantium cumque quas voluptates ipsa accusamus dicta
              perferendis nostrum fugiat quo earum.
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <span class="caption text--secondary">09:03am</span>
          </v-list-item-action>
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  title: "Messages",
  name: "Messages",
};
</script>

<style>
</style>