<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- No messages message -->
      <v-card-subtitle v-if="messages.length === 0" class="text-center"
        >No messages</v-card-subtitle
      >

      <!-- Messages list -->
      <v-card-text v-if="messages.length > 0">
        <v-list two-line>
          <v-list-item-group
            multiple
            v-model="unreadMessages"
            active-class="success--text"
          >
            <template v-for="(message, index) in messages">
              <v-list-item
                link
                :to="`/messages/${message.id}`"
                :key="message.sender"
              >
                <template>
                  <v-list-item-avatar>
                    <v-img :src="message.senderAvatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="message.sender"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="message.original"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="lastReply(message).message"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="formatTime(lastReply(message).created)"
                    ></v-list-item-action-text>

                    <v-icon small color="success">
                      {{
                        lastReply(message).read ? "mdi-check-all" : "mdi-check"
                      }}
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <!-- Message divider -->
              <v-divider
                v-if="index < message.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  title: "Messages",
  name: "Messages",
  async created() {
    // Fetch the user messages
    await this.getMessagesAction();

    // Get the indexes of unread messages
    const allMessages = this.getMessagesByRead(false);
    allMessages.forEach((message) =>
      this.unreadMessages.push(this.messages.indexOf(message))
    );
  },
  data() {
    return {
      unreadMessages: [],
    };
  },
  computed: {
    ...mapState(["messages"]),
    ...mapGetters(["getMessagesByRead"]),
  },
  methods: {
    ...mapActions(["getMessagesAction"]),
    lastReply(message) {
      return message.replies[message.replies.length - 1];
    },
    formatTime(timestamp) {
      return timestamp.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    goTo(id) {
      this.$router.push({ path: `/messages/${id}` });
    },
  },
};
</script>

<style>
</style>