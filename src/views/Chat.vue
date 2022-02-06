<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-card-text class="d-flex align-center py-0">
        <v-btn icon class="grey--text mr-4 text--darken-4">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-list two-line>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.png" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ message.sender }}</v-list-item-title>
              <v-list-item-subtitle>{{
                message.online ? "online" : "offline"
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer></v-spacer>

        <v-menu bottom left offset-x transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="grey darken-4" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item link>
              <v-list-item-title class="font-weight-thin"
                >Delete chat</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="py-0">
        <v-card elevation="0" class="overflow-auto" height="55vh">
          <div v-if="message.replies.length === 0">
            <v-subheader class="d-flex justify-center">
              <span>Send a message to start chatting with people</span>
            </v-subheader>
          </div>
          <div v-if="message.replies.length > 0">
            <v-subheader>
              <v-divider></v-divider>
              <span class="mx-4">Today</span>
              <v-divider></v-divider>
            </v-subheader>
            <div
              class="d-flex flex-column"
              v-for="reply in message.replies"
              :key="reply.message"
            >
              <div
                class="my-1 py-2 px-2 rounded-lg"
                :class="
                  reply.author === 'me'
                    ? 'align-self-end rounded-br-0 green white--text'
                    : 'align-self-start rounded-bl-0 grey lighten-3 grey--text text--darken-4'
                "
              >
                <p class="subtitle-2 mb-0">
                  {{ reply.message }}
                </p>
                <div class="d-flex align-center justify-end">
                  <span class="mr-1 caption">{{ reply.time }}</span>
                  <v-icon small color="white" v-if="reply.author === 'me'"
                    >mdi-check</v-icon
                  >
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="py-4">
        <v-textarea
          outlined
          rounded
          hide-details
          dense
          auto-grow
          prepend-icon="mdi-emoticon"
          rows="1"
          @click:prepend="showEmoticons"
          class=""
          color="success"
        ></v-textarea>
        <v-btn fab small color="success" class="shrink ml-4">
          <v-icon small>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Chat",
  title: "Chat",
  data() {
    return {
      message: {
        id: 1,
        sender: "John Doe",
        online: true,
        replies: [
          {
            author: "me",
            message: "I don't have that stuff.",
            time: "07:00am",
            read: false,
            received: true,
          },
          {
            author: "other",
            message: "I gave it to you, remember?",
            time: "07:02am",
            read: false,
            received: true,
          },
        ],
      },
    };
  },
  methods: {
    showEmoticons() {
      return;
    },
  },
};
</script>

<style scoped>
</style>