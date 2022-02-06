<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-card-text>
        <v-subheader>
          <v-spacer></v-spacer>
          <span class="mx-4">Today</span>
          <v-spacer></v-spacer>
        </v-subheader>
        <v-list-item
          two-line
          link
          :to="`/messages/${m.id}`"
          v-for="m in messages"
          :key="m.id"
        >
          <v-list-item-avatar>
            <v-img class="b"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ m.sender }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ m.text }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <span class="caption text--secondary">{{ m.time }}</span>
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
  data() {
    return {
      messages: [
        {
          text: "Can i please get an update on this food? I have requested it a long ago.",
          sender: "John Doe",
          time: "07:00am",
          id: 1,
          replies: [{ text: "Yeah, whatever.", time: "09:33am" }],
        },
      ],
    };
  },
};
</script>

<style>
</style>