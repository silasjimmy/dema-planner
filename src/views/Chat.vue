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
            <img :src="message.senderAvatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize">{{
              message.sender
            }}</v-list-item-title>
            <v-list-item-subtitle>offline</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-spacer></v-spacer>

        <!-- Chat options dropdown -->
        <v-menu bottom left offset-x transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item link @click="deleteChat">
              <v-list-item-title>Delete chat</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text
        class="overflow-auto d-flex flex-column-reverse"
        style="height: 50vh"
      >
        <div v-if="!replies">
          <v-subheader class="d-flex justify-center">
            <span>Send a message to start chatting with people</span>
          </v-subheader>
        </div>

        <div v-if="replies">
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
                <span class="mr-1 caption">{{
                  formatTime(reply.created)
                }}</span>
                <v-icon small color="white" v-if="reply.author === 'me'">{{
                  reply.read ? "mdi-check-all" : "mdi-check"
                }}</v-icon>
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
        <v-btn
          fab
          small
          @click="sendMessage(message)"
          color="success"
          class="shrink ml-4"
        >
          <v-icon small>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Action toast -->
    <toast
      :show="showToast"
      :message="`Functionality not yet implemented`"
      :success="false"
      @close="showToast = false"
    ></toast>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Toast from "@/components/Toast.vue";

export default {
  name: "Chat",
  title: "Chat",
  async created() {
    if (this.messages.length === 0) {
      // Fetch the user messages if they are not yet fetched
      await this.getMessagesAction();
    }

    // Retrieve the message with the specified id
    this.message = this.getMessageById(this.id);
  },
  data() {
    return {
      message: [],
      showToast: false,
    };
  },
  computed: {
    ...mapState(["messages"]),
    ...mapGetters(["getMessageById"]),
  },
  methods: {
    ...mapActions(["getMessagesAction"]),
    replies() {
      return Object.keys(this.message.replies).length > 0;
    },
    formatTime(timestamp) {
      return timestamp.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    showEmoticons() {
      this.showToast = true;
    },
    sendMessage(message) {
      console.log(message);
      this.showToast = true;
    },
    deleteChat() {
      this.showToast = true;
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