<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <!-- No notifications message -->
      <v-card-subtitle v-if="messages.length === 0" class="text-center"
        >No messages</v-card-subtitle
      >

      <v-card-text v-if="messages.length > 0">
        <!-- Messages list -->
        <v-list subheader>
          <!-- <v-subheader>
            <v-divider></v-divider>
            <span class="mx-4">Today</span>
            <v-divider></v-divider>
          </v-subheader> -->

          <template v-for="(message, index) in messages">
            <!-- <v-subheader
          v-if="notification.header"
          :key="notification.header"
          v-text="notification.header"
        ></v-subheader> -->

            <v-list-item
              :key="message.message"
              @click="goTo(message.id)"
              class="py-2"
              :style="message.read ? '' : 'background-color: #4CAF50'"
            >
              <v-list-item-avatar>
                <v-img :src="message.senderAvatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  :class="message.read ? '' : 'font-weight-medium white--text'"
                  v-html="message.sender"
                ></v-list-item-title>

                <v-list-item-subtitle
                  :class="message.read ? '' : 'font-weight-medium white--text'"
                  v-html="message.text"
                >
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action
                :class="message.read ? '' : 'font-weight-medium white--text'"
                class="caption"
                v-html="formatTime(message.created)"
              ></v-list-item-action>
            </v-list-item>

            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  title: "Messages",
  name: "Messages",
  async created() {
    // Fetch the user messages
    await this.getMessagesAction();
  },
  computed: {
    ...mapState(["messages"]),
  },
  methods: {
    ...mapActions(["getMessagesAction"]),
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