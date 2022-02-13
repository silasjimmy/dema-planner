<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-card-text class="d-flex align-center py-0">
        <!-- Back button -->
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <!-- Receiver information -->
        <v-list-item two-line>
          <v-list-item-avatar>
            <img class="b" :src="message.senderAvatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ message.sender }}</v-list-item-title>
            <v-list-item-subtitle>{{
              message.online ? "online" : "offline"
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-spacer></v-spacer>

        <!-- Dropdown button -->
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="overflow-auto" style="height: 50vh">
        <div v-if="message.replies.length === 0">
          <v-subheader class="d-flex justify-center">
            <span>Send a message to start chatting with people</span>
          </v-subheader>
        </div>

        <div v-if="message.replies.length > 0">
          <!-- <v-subheader>
              <v-divider></v-divider>
              <span class="mx-4">Today</span>
              <v-divider></v-divider>
            </v-subheader> -->

          <div
            class="d-flex flex-column"
            v-for="reply in message.replies"
            :key="reply.message"
          >
            <!-- Reply container -->
            <div
              class="my-1 py-2 px-2 rounded-lg white--text"
              :class="
                reply.author === 'me'
                  ? 'align-self-end rounded-br-0 success'
                  : 'align-self-start rounded-bl-0 secondary'
              "
            >
              <!-- Reply message -->
              <p class="subtitle-2 mb-0">
                {{ reply.message }}
              </p>

              <!-- Reply time -->
              <div class="d-flex align-center justify-end">
                <span class="mr-1 caption">{{ reply.time }}</span>
                <v-icon small color="white" v-if="reply.author === 'me'"
                  >mdi-check</v-icon
                >
              </div>
            </div>
          </div>
        </div>
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

    <!-- Chat options dropdown -->
    <v-menu bottom left offset-x transition="slide-y-transition">
      <v-list>
        <v-list-item link>
          <v-list-item-title class="font-weight-thin"
            >Delete chat</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Chat",
  title: "Chat",
  created() {
    // Retrieve the message with the specified id
    this.message = this.getMessageById(this.id);
  },
  data() {
    return {
      message: {},
    };
  },
  computed: {
    ...mapGetters(["getMessageById"]),
  },
  methods: {
    showEmoticons() {
      console.log("Show emoticons!");
    },
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
</style>