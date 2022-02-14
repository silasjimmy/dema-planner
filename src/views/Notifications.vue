<template>
  <v-container>
    <v-card outlined class="rounded-lg">
      <!-- No notifications message -->
      <v-card-subtitle v-if="notifications.length === 0" class="text-center"
        >No notifications</v-card-subtitle
      >

      <!-- Notifications list -->
      <v-card-text v-if="notifications.length > 0">
        <v-list two-line v-if="notifications.length > 0">
          <v-list-item-group
            multiple
            v-model="unreadNotifications"
            active-class="success--text"
          >
            <template v-for="(notification, index) in notifications">
              <v-list-item
                @click="goTo(notification.link)"
                class="py-1"
                :key="notification.id"
              >
                <template>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      v-text="notification.message"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="formatTime(notification.created)"
                    ></v-list-item-action-text>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <!-- Notification divider -->
              <v-divider
                v-if="index < notifications.length - 1"
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
  title: "Notifications",
  name: "Notifications",
  async created() {
    await this.getNotificationsAction();

    // Get the indexes of unread notifications
    const allNotifications = this.getNotificationsByRead(false);
    allNotifications.forEach((notification) =>
      this.unreadNotifications.push(this.notifications.indexOf(notification))
    );
  },
  data() {
    return {
      unreadNotifications: [],
    };
  },
  computed: {
    ...mapState(["notifications"]),
    ...mapGetters(["getNotificationsByRead"]),
  },
  methods: {
    ...mapActions(["getNotificationsAction"]),
    formatTime(timestamp) {
      return timestamp.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    goTo(link) {
      this.$router.push({ path: link });
    },
  },
};
</script>

<style scoped>
</style>