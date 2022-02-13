<template>
  <v-container>
    <v-card outlined class="rounded-lg">
      <!-- No notifications message -->
      <v-card-subtitle v-if="notifications.length === 0" class="text-center"
        >No notifications</v-card-subtitle
      >

      <v-card-text v-if="notifications.length > 0">
        <!-- Notifications list -->
        <v-list subheader>
          <!-- <v-subheader>
            <v-divider></v-divider>
            <span class="mx-4">Today</span>
            <v-divider></v-divider>
          </v-subheader> -->

          <template v-for="(notification, index) in notifications">
            <!-- <v-subheader
          v-if="notification.header"
          :key="notification.header"
          v-text="notification.header"
        ></v-subheader> -->

            <v-list-item
              :key="notification.message"
              @click="goTo(notification.link)"
              class="py-1"
              :style="notification.read ? '' : 'background-color: #C8E6C9'"
            >
              <v-list-item-content>
                <v-list-item-title
                  :class="
                    notification.read
                      ? 'font-weight-thin'
                      : 'font-weight-medium'
                  "
                  v-html="notification.message"
                ></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action
                :class="
                  notification.read ? 'font-weight-thin' : 'font-weight-medium'
                "
                class="text--secondary caption"
                v-html="notification.time"
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
  title: "Notifications",
  name: "Notifications",
  created() {
    this.getNotificationsAction();
  },
  computed: {
    ...mapState(["notifications"]),
  },
  methods: {
    ...mapActions(["getNotificationsAction"]),
    goTo(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
</style>