<template>
  <v-app v-cloak>
    <!-- App bar -->
    <v-app-bar app elevate-on-scroll>
      <!-- Meal info drawer activator -->
      <v-app-bar-nav-icon
        class="d-sm-none"
        v-if="viewDashboard"
        @click="rightSidenav = true"
      ></v-app-bar-nav-icon>

      <!-- Landing pages nav activator -->
      <v-app-bar-nav-icon
        v-if="!viewDashboard"
        @click="homeSideNav = true"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        {{ viewDashboard ? `${$store.state.pageTitle}` : "Dema" }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Extra links menu -->
      <v-menu
        bottom
        offset-y
        min-width="200px"
        transition="slide-y-transition"
        v-if="$vuetify.breakpoint.xs && viewDashboard"
      >
        <template v-slot:activator="{ on }">
          <v-avatar size="34" class="mr-1" v-on="on">
            <img :src="profile.imageUrl" :alt="profile.name" />
          </v-avatar>
        </template>

        <v-card>
          <!-- Links -->
          <v-list class="py-0">
            <v-list-item-group color="success">
              <!-- <v-list-item link to="/messages">
              <v-list-item-avatar>
                <v-icon>mdi-message</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Messages</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/notifications">
              <v-list-item-avatar>
                <v-icon>mdi-bell</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
              <v-list-item link to="/profile">
                <v-list-item-avatar>
                  <v-icon>mdi-account-details</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t("app.links.four")
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link to="/settings">
                <v-list-item-avatar>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t("app.links.five")
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item @click="logout">
                <v-list-item-avatar>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t("app.links.six")
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>

      <!-- Notifications menu -->
      <!-- <v-menu
        bottom
        left
        offset-y
        class="d-none"
        v-if="$vuetify.breakpoint.smAndUp"
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
          <v-tabs-slider></v-tabs-slider>
          <v-tab class="text-none font-weight-medium">Notifications</v-tab>
          <v-tab class="text-none font-weight-medium">Messages</v-tab>

          <v-tab-item>
            <p
              v-if="!notifications"
              class="text--secondary subtitle-1 text-center py-4 mb-0"
            >
              No notifications
            </p>

            <v-list two-line v-if="notifications" class="py-0" max-width="400">
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

                  <v-divider
                    v-if="index < notifications.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>

            <v-divider></v-divider>

            <v-card v-if="notifications" elevation="0">
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

          <v-tab-item>
            <p
              v-if="!messages"
              class="text--secondary subtitle-1 text-center py-4 mb-0"
            >
              No messages
            </p>

            <v-list two-line v-if="messages" class="py-0" max-width="400">
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

                  <v-divider
                    inset
                    v-if="index < message.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>

            <v-divider></v-divider>

            <v-card v-if="messages" elevation="0">
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
      </v-menu> -->

      <!-- Language change button -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            outlined
            :small="$vuetify.breakpoint.smAndDown"
            v-bind="attrs"
            v-on="on"
            v-if="!viewDashboard"
            class="mx-2"
          >
            <flag :iso="selectedLanguage.flag" />
            <span class="ml-3">{{ selectedLanguage.language }}</span>
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list class="py-0">
          <v-list-item-group mandatory color="success" v-model="languageIndex">
            <v-list-item
              v-for="(lang, index) in languages"
              :key="index"
              @click="changeLanguage(lang)"
            >
              <v-list-item-title>{{ lang.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Home navigation drawer -->
    <v-navigation-drawer
      app
      temporary
      v-if="!viewDashboard"
      v-model="homeSideNav"
    >
      <v-list rounded>
        <v-list-item-group color="success">
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
              <v-list-item-title>About us</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/sign-up">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign up</v-list-item-title>
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
          <v-list-item link to="/contact-us">
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Contact us</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Dashboard left-side navigation bar -->
    <v-navigation-drawer
      fixed
      app
      v-if="viewDashboard"
      :permanent="$vuetify.breakpoint.mdAndUp"
    >
      <!-- Userview -->
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="80px">
              <img :src="profile.imageUrl" />
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6 font-weight-medium">{{
                profile.name
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <!-- Navigation links -->
      <v-list rounded>
        <v-list-item-group color="success">
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
              <v-list-item-title>{{ $t("app.links.four") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/settings">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("app.links.five") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Log out button -->
      <template v-slot:append>
        <v-list-item color="success" class="pl-6" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("app.links.six") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <!-- Dahsboard right-side navigation bar -->
    <v-navigation-drawer
      fixed
      app
      right
      v-if="viewDashboard"
      :permanent="$vuetify.breakpoint.smAndUp"
      v-model="rightSidenav"
    >
      <meals-info
        v-if="$store.state.role === 'consumer' && $store.state.meals"
      ></meals-info>

      <eatery-summary v-if="$store.state.role === 'eatery'"></eatery-summary>
    </v-navigation-drawer>

    <!-- Dashboard bottom navigation -->
    <v-bottom-navigation
      app
      shift
      grow
      color="success"
      v-if="viewDashboard && $vuetify.breakpoint.smAndDown"
    >
      <v-btn
        link
        v-for="link in dashboardLinks"
        :key="link.text"
        :to="link.url"
      >
        <span>{{ link.text }}</span>
        <v-icon>{{ link.icon }}</v-icon>
      </v-btn>
      <v-btn link to="/profile" v-if="$vuetify.breakpoint.smAndUp">
        <span>{{ $t("app.links.four") }}</span>
        <v-icon>mdi-account-details</v-icon>
      </v-btn>
      <v-btn link to="/settings" v-if="$vuetify.breakpoint.smAndUp">
        <span>{{ $t("app.links.five") }}</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn link v-if="$vuetify.breakpoint.smAndUp" @click="logout">
        <span>{{ $t("app.links.six") }}</span>
        <v-icon left>mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- Main section -->
    <v-main>
      <!-- Internet connection banner -->
      <v-banner
        app
        outlined
        v-model="showBanner"
        class="rounded-lg"
        transition="slide-y-transition"
      >
        <v-icon slot="icon" :color="isOnline ? 'success' : 'error'" size="24">
          {{ isOnline ? "mdi-wifi" : "mdi-wifi-alert" }}
        </v-icon>

        <span>
          {{
            isOnline
              ? "You are now connected!"
              : "You have no internet connection!"
          }}
        </span>

        <template v-slot:actions="{ dismiss }">
          <v-btn
            rounded
            text
            :color="isOnline ? 'success' : 'error'"
            @click="dismiss"
          >
            {{ isOnline ? "dismiss" : "connect" }}
          </v-btn>
        </template>
      </v-banner>

      <!-- Router view -->
      <router-view />

      <!-- Scroll to top button -->
      <v-fab-transition>
        <v-btn
          fab
          fixed
          bottom
          right
          v-if="!viewDashboard"
          color="success"
          v-show="showFabBtn"
          @click="$vuetify.goTo(0, scrollOptions)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>

    <!-- Footer -->
    <v-footer app absolute padless v-if="!viewDashboard">
      <v-card flat tile color="success" class="white--text" width="100vw">
        <v-card-text>
          <v-row class="text-center">
            <v-col cols="12" md="6">
              <h3 class="subtitle-1 white--text">Find us in:</h3>
              <!-- <v-btn text rounded class="text-none white--text">
                <v-icon left size="24px" color="grey lighten-3"
                  >mdi-map-marker</v-icon
                >
                P.O Box 000-00000, City, Country
              </v-btn> -->
              <v-btn text rounded class="text-none white--text">
                <v-icon left size="24px" color="grey lighten-3"
                  >mdi-email</v-icon
                >
                jimmysilas17@gmail.com
              </v-btn>
              <v-btn text rounded class="text-none white--text">
                <v-icon left size="24px" color="grey lighten-3"
                  >mdi-phone</v-icon
                >
                +254 719 773 594
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="subtitle-1 white--text">
                Stay updated on our social platforms
              </h3>
              <v-btn class="mx-2" icon>
                <v-icon size="24px" color="grey lighten-3">mdi-facebook</v-icon>
              </v-btn>
              <v-btn class="mx-2" icon>
                <v-icon size="24px" color="grey lighten-3">mdi-linkedin</v-icon>
              </v-btn>
              <v-btn class="mx-2" icon>
                <v-icon size="24px" color="grey lighten-3">mdi-twitter</v-icon>
              </v-btn>
              <v-btn class="mx-2" icon>
                <v-icon size="24px" color="grey lighten-3"
                  >mdi-instagram</v-icon
                >
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions
          class="
            px-4 px-sm-8
            text-center
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
          "
        >
          <span>All rights reserved.</span>
          <v-spacer></v-spacer>
          <span><strong>Dema</strong>, {{ new Date().getFullYear() }}</span>
        </v-card-actions>
      </v-card>
    </v-footer>

    <!-- Page load overlay -->
    <v-overlay opacity="1" z-index="10" :value="pageLoadOverlay">
      <v-progress-circular
        indeterminate
        :size="250"
        :width="5"
        color="success"
        class="text-center"
      >
        {{ $store.state.pageLoadingMessage }}
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { mapState, mapGetters } from "vuex";
import MealsInfo from "./components/MealsInfo.vue";
import EaterySummary from "./components/EaterySummary.vue";

export default {
  name: "App",
  created() {
    // Inform user of action
    this.$store.commit("setPageLoadingMessage", "Loading...");

    // Start loading page
    this.$store.commit("setPageLoading", true);

    if (!this.$store.state.loggedIn) {
      this.selectedLanguage = this.languages[this.languageIndex];

      window.addEventListener("scroll", () => {
        this.scrollYPos = window.scrollY;
      });
    }
  },
  data() {
    return {
      scrollYPos: 0,
      unreadMessages: [],
      unreadNotifications: [],
      pageLoadMessage: "",
      pageLoadColor: "",
      pageLoadValue: 0,
      rightSidenav: false,
      homeSideNav: false,
      notificationsMenu: false,
      isOnline: true,
      showBanner: false,
      languageIndex: 0,
      selectedLanguage: {},
      languages: [
        { flag: "us", language: "en", title: "English" },
        { flag: "ke", language: "sw", title: "Swahili" },
      ],
      scrollOptions: {
        duration: 400,
        easing: "easeInQuint",
      },
    };
  },
  methods: {
    changeLanguage(language) {
      this.selectedLanguage = language;
      this.$i18n.locale = this.selectedLanguage.language;
    },
    lastReply(message) {
      return message.replies[message.replies.length - 1];
    },
    formatTime(timestamp) {
      return timestamp.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    async checkOnlineStatus() {
      try {
        const online = await fetch("./assets/images/silas-jimmy.jpg");
        return online.status >= 200 && online.status < 300; // either true or false
      } catch (err) {
        return false; // definitely offline
      }
    },
    async logout() {
      const auth = getAuth();

      try {
        // Sign out
        await signOut(auth);

        // Go to log in page
        this.$router.replace({ name: "sign-in" });

        // Clear the store data
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState(["dashboardLinks", "profile", "messages", "notifications"]),
    ...mapGetters(["getMessagesByRead", "getNotificationsByRead"]),
    viewDashboard() {
      return (
        this.$store.state.loggedIn &&
        this.$store.state.role &&
        this.$store.state.profile
      );
    },
    showFabBtn() {
      if (this.scrollYPos > 200) return true;
      return false;
    },
    pageLoadOverlay() {
      return this.$store.state.pageLoading;
    },
    logoWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "35px";
        case "sm":
          return "40px";
        case "lg":
          return "60px";
        default:
          return "70px";
      }
    },
  },
  watch: {
    "$store.state.settings": function (settings) {
      this.$vuetify.theme.dark = settings.appTheme === "dark";
      this.$i18n.locale = settings.appLanguage;
    },
  },
  components: { MealsInfo, EaterySummary },
};
</script>

<style>
.b {
  border: 1px solid black;
}

[v-cloak] {
  display: none;
}

html {
  overflow: auto;
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
