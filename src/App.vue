<template>
  <v-app v-cloak>
    <!-- Home app bar -->
    <v-app-bar app elevate-on-scroll v-if="!loggedIn">
      <v-app-bar-nav-icon
        class="d-flex d-sm-none"
        @click="homeSidenav = true"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Dema</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-none d-sm-block">
        <v-btn plain rounded link class="text-none" to="/sign-up"
          >Create account</v-btn
        >
        <v-btn plain rounded link class="text-none" to="/sign-in">Log in</v-btn>
      </div>
    </v-app-bar>

    <!-- Home side navigation -->
    <v-navigation-drawer temporary app v-model="homeSidenav" v-if="!loggedIn">
      <!-- Navigation links -->
      <v-list rounded subheader>
        <v-list-item-group>
          <v-subheader>Navigation links</v-subheader>
          <v-list-item link to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/about-us">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/sign-in">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/sign-up">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Create account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/contact-us">
            <v-list-item-icon>
              <v-icon>mdi-message</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Contact us</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Dashboard app bar -->
    <v-app-bar app elevate-on-scroll v-if="loggedIn">
      <v-app-bar-nav-icon
        class="d-sm-none"
        @click="rightSidenav = true"
      ></v-app-bar-nav-icon>

      <!-- Page title -->
      <v-toolbar-title>{{ $store.state.pageTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Notifications dropdown -->
      <v-menu
        bottom
        left
        offset-y
        :close-on-content-click="false"
        v-model="notificationsMenu"
        transition="slide-y-transition"
        min-width="400px"
        max-height="50vh"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            dot
            bordered
            :value="unreadMessages.length > 0 || unreadNotifications.length > 0"
            offset-x="15"
            color="success"
            offset-y="15"
          >
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <v-tabs grow color="green">
          <v-tab class="text-none font-weight-medium">Notifications</v-tab>
          <v-tab class="text-none font-weight-medium">Messages</v-tab>

          <!-- Notifications tab -->
          <v-tab-item>
            <p
              v-if="notifications.length === 0"
              class="text--secondary subtitle-1 text-center py-4 mb-0"
            >
              No notifications
            </p>

            <v-list
              two-line
              v-if="notifications.length > 0"
              class="py-0"
              max-width="400"
            >
              <v-list-item-group
                multiple
                v-model="unreadNotifications"
                active-class="success--text"
              >
                <template v-for="(notification, index) in notifications">
                  <v-list-item
                    link
                    class="py-1"
                    @click="notificationsMenu = false"
                    :to="notification.link"
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

            <v-divider></v-divider>

            <v-card v-if="notifications.length > 0" elevation="0">
              <v-card-actions class="justify-center">
                <v-btn
                  plain
                  link
                  @click="notificationsMenu = false"
                  to="/notifications"
                  >View all</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <!-- Messages tab -->
          <v-tab-item>
            <p
              v-if="messages.length === 0"
              class="text--secondary subtitle-1 text-center py-4 mb-0"
            >
              No messages
            </p>

            <v-list
              two-line
              v-if="messages.length > 0"
              class="py-0"
              max-width="400"
            >
              <v-list-item-group
                multiple
                v-model="unreadMessages"
                active-class="success--text"
              >
                <template v-for="(message, index) in messages">
                  <v-list-item
                    link
                    @click="notificationsMenu = false"
                    :to="`/messages/${message.id}`"
                    :key="message.sender"
                  >
                    <template>
                      <v-list-item-avatar>
                        <v-img :src="message.senderAvatar"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          class="text-capitalize"
                          v-text="message.sender"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="lastReply(message).message"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="formatTime(lastReply(message).created)"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <!-- Message divider -->
                  <v-divider
                    inset
                    v-if="index < message.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>

            <v-divider></v-divider>

            <v-card v-if="messages.length > 0" elevation="0">
              <v-card-actions class="justify-center">
                <v-btn
                  plain
                  link
                  @click="notificationsMenu = false"
                  to="/messages"
                  >View all</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-menu>
    </v-app-bar>

    <!-- Dashboard left-side navigation bar -->
    <v-navigation-drawer
      fixed
      app
      v-if="loggedIn"
      :permanent="$vuetify.breakpoint.mdAndUp"
    >
      <!-- Userview -->
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="80px">
              <img :src="userProfile.imageUrl" />
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-h6 font-weight-medium jost-font-family"
                >{{ userProfile.name }}</v-list-item-title
              >
              <v-list-item-subtitle>{{
                userProfile.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <!-- Navigation links -->
      <v-list rounded>
        <v-list-item-group>
          <v-list-item
            link
            v-for="link in dashboardLinks"
            :key="link.text"
            :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/settings">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Log out button -->
      <template v-slot:append>
        <div class="px-4">
          <v-btn block @click="logout" class="my-4" color="success">
            <v-icon left>mdi-logout</v-icon>
            Log out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Dahsboard right-side navigation bar -->
    <v-navigation-drawer
      fixed
      app
      right
      v-if="loggedIn"
      :permanent="$vuetify.breakpoint.smAndUp"
      v-model="rightSidenav"
    >
      <meals-info v-if="userRole === 'consumer'"></meals-info>
    </v-navigation-drawer>

    <!-- Dashboard bottom navigation -->
    <v-bottom-navigation
      app
      :shift="$vuetify.breakpoint.smAndUp"
      v-if="loggedIn && $vuetify.breakpoint.smAndDown"
    >
      <v-btn
        link
        v-for="link in dashboardLinks"
        :key="link.text"
        :to="link.url"
      >
        <span class="d-none d-sm-flex">{{ link.text }}</span>
        <v-icon>{{ link.icon }}</v-icon>
      </v-btn>
      <v-btn link to="/settings" v-if="$vuetify.breakpoint.smAndUp">
        <span>Settings</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn link to="/profile" v-if="$vuetify.breakpoint.smAndUp">
        <span>Profile</span>
        <v-icon>mdi-account-details</v-icon>
      </v-btn>
      <v-btn link v-if="$vuetify.breakpoint.smAndUp" @click="logout">
        <span>Log out</span>
        <v-icon left>mdi-logout</v-icon>
      </v-btn>

      <!-- More links menu -->
      <v-menu top offset-y>
        <!-- More button -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="px-0 d-flex d-sm-none" v-bind="attrs" v-on="on">
            <span class="d-none d-sm-flex">More</span>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <!-- Links -->
        <v-list class="text-center py-0">
          <v-list-item class="px-0" @click="logout">
            <v-list-item-title>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="px-0" link to="/profile">
            <v-list-item-title>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="px-0" link to="/settings">
            <v-list-item-title>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-bottom-navigation>

    <!-- Main section -->
    <v-main>
      <v-banner
        single-line
        app
        outlined
        v-model="isOnline"
        v-if="loggedIn"
        class="rounded-lg"
        transition="slide-y-transition"
      >
        <v-icon slot="icon" color="warning" size="24">
          mdi-wifi-strength-alert-outline
        </v-icon>
        {{ internetConnectionMessage }}
        <template v-slot:actions="{ dismiss }">
          <v-btn rounded text color="error" @click="dismiss"> Dismiss </v-btn>
        </template>
      </v-banner>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer app absolute padless v-if="!loggedIn">
      <v-card flat tile width="100vw">
        <v-card-text class="text-center">
          <v-btn rounded link class="ma-2 text-none" elevation="0" to="/home"
            >Home</v-btn
          >
          <v-btn
            rounded
            link
            class="ma-2 text-none"
            elevation="0"
            to="/about-us"
            >About us</v-btn
          >
          <v-btn rounded link class="ma-2 text-none" elevation="0" to="/sign-up"
            >Create account</v-btn
          >
          <v-btn rounded link class="ma-2 text-none" elevation="0" to="/sign-in"
            >Log in</v-btn
          >
          <v-btn
            rounded
            link
            class="ma-2 text-none"
            elevation="0"
            to="/contact-us"
            >Contact us</v-btn
          >
        </v-card-text>

        <v-card-text>
          <v-row class="text-center">
            <v-col cols="12" md="6">
              <h3 class="subtitle-1 text--secondary">Find us in:</h3>
              <v-btn text rounded class="text-none">
                <v-icon left size="24px">mdi-map-marker</v-icon>
                P.O Box 000-00000, City, Country
              </v-btn>
              <v-btn text rounded class="text-none">
                <v-icon left size="24px">mdi-email</v-icon>
                dema@domain.com
              </v-btn>
              <v-btn text rounded class="text-none">
                <v-icon left size="24px">mdi-phone</v-icon>
                +254 000 000 000
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="subtitle-1 text--secondary">
                Stay updated on our social platforms
              </h3>
              <v-btn class="mx-2" icon>
                <v-icon size="24px">mdi-facebook</v-icon>
              </v-btn>
              <v-btn class="mx-2" icon>
                <v-icon size="24px">mdi-linkedin</v-icon>
              </v-btn>
              <v-btn class="mx-2" icon>
                <v-icon size="24px">mdi-twitter</v-icon>
              </v-btn>
              <v-btn class="mx-2" icon>
                <v-icon size="24px">mdi-instagram</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="text-center">
          <span>{{ new Date().getFullYear() }} — <strong>Dema</strong></span>
        </v-card-text>
      </v-card>
    </v-footer>

    <!-- Page load overlay -->
    <v-overlay opacity="1" z-index="10" :value="pageLoadOverlay">
      <v-progress-circular
        :rotate="360"
        :size="250"
        :width="12"
        :value="pageLoadValue"
        :color="pageLoadColor"
        class="text-center"
      >
        {{ pageLoadMessage }}
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { mapState, mapActions, mapGetters } from "vuex";
import MealsInfo from "./components/MealsInfo.vue";

export default {
  name: "App",
  async created() {
    // Sync local data with store data
    this.$store.commit(
      "setLoggedIn",
      localStorage.getItem("loggedIn") === "true"
    );
    this.$store.commit("setUserEmail", localStorage.getItem("email"));
    this.$store.commit("setUserRole", localStorage.getItem("role"));
    this.$store.commit("setDashboardLinks", localStorage.getItem("role"));

    // console.log(
    //   this.$store.state.loggedIn,
    //   this.$store.state.userEmail,
    //   this.$store.state.userRole,
    //   this.$store.state.dashboardLinks
    // );
  },
  async mounted() {
    if (localStorage.getItem("loggedIn") === "true") {
      try {
        // Start loading data
        this.pageLoadOverlay = true;
        this.pageLoadColor = "success";
        this.pageLoadMessage = `Loading data: ${this.pageLoadValue}%`;

        // 1. Fetch the user's profile
        await this.getUserProfileAction();
        this.pageLoadValue += 25;
        this.pageLoadMessage = `Loading data: ${this.pageLoadValue}%`;

        // 2. Fetch the user's settings
        await this.getUserSettingsAction();
        this.pageLoadValue += 25;
        this.pageLoadMessage = `Loading data: ${this.pageLoadValue}%`;

        // Set the app's theme
        this.$vuetify.theme.dark = this.userSettings.appTheme === "dark";

        // 3. Fetch the user's messages
        await this.getMessagesAction();
        this.pageLoadValue += 25;
        this.pageLoadMessage = `Loading data: ${this.pageLoadValue}%`;

        // 4. Fetch the user's notifications
        await this.getNotificationsAction();
        this.pageLoadValue += 25;
        this.pageLoadMessage = `Loading data: ${this.pageLoadValue}%`;

        // Set the page title
        this.$store.commit("setPageTitle", document.title);

        // Get the indexes of unread messages
        const allMessages = this.getMessagesByRead(false);
        allMessages.forEach((message) =>
          this.unreadMessages.push(this.messages.indexOf(message))
        );

        // Get the indexes of unread notifications
        const allNotifications = this.getNotificationsByRead(false);
        allNotifications.forEach((notification) =>
          this.unreadNotifications.push(
            this.notifications.indexOf(notification)
          )
        );

        switch (localStorage.getItem("role")) {
          case "consumer":
            await this.getEateriesAction();
            break;
        }

        // Hide the overlay
        setTimeout(() => (this.pageLoadOverlay = false), 1000);
      } catch (error) {
        // Display error message
        this.pageLoadColor = "error";
        this.pageLoadMessage = `${error.code}`;
      }
    }

    // Monitor the user sign in activity
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Update the local storage data
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", user.email);
      } else {
        // Delete local storage data
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        // Update the store's data
        this.$store.commit("setLoggedIn", false);
        this.$store.commit("setUserRole", "");
        this.$store.commit("setDashboardLinks", "");
      }
    });
  },
  data() {
    return {
      unreadMessages: [],
      unreadNotifications: [],
      pageLoadOverlay: false,
      pageLoadMessage: "",
      pageLoadColor: "",
      interval: {},
      pageLoadValue: 0,
      homeSidenav: false,
      rightSidenav: false,
      notificationsMenu: false,
      isOnline: !navigator.onLine,
      internetConnectionMessage:
        "You are now offline. Any edits you make won't be saved.",
    };
  },
  methods: {
    ...mapActions([
      "getUserProfileAction",
      "getUserSettingsAction",
      "getMessagesAction",
      "getNotificationsAction",
      "getEateriesAction",
    ]),
    lastReply(message) {
      return message.replies[message.replies.length - 1];
    },
    formatTime(timestamp) {
      return timestamp.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    logout() {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          this.$store.commit("setLoggedIn", false);

          // Direct to sign in
          this.$router.replace({ name: "sign-in" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  computed: {
    ...mapState([
      "dashboardLinks",
      "userProfile",
      "userSettings",
      "messages",
      "notifications",
    ]),
    ...mapGetters(["getMessagesByRead", "getNotificationsByRead"]),
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    userRole() {
      return this.$store.state.userRole;
    },
  },
  components: { MealsInfo },
};
</script>

<style>
.b {
  border: 1px solid black;
}

[v-cloak] {
  display: none;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #ffffff !important;
}

.blockquote::before,
.blockquote::after {
  content: '"';
  font-weight: bold;
}
</style>
