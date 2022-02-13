<template>
  <v-app>
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
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Dema</v-list-item-title>
            <v-list-item-subtitle>Changing lifestyles</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <!-- Navigation links -->
      <v-list rounded>
        <v-list-item-group>
          <v-subheader>Home</v-subheader>
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

      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        bottom
        left
        offset-y
        v-model="notificationsMenu"
        :close-on-content-click="false"
        transition="slide-y-transition"
        max-width="400px"
        max-height="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-badge dot bordered offset-x="15" color="green" offset-y="15">
            <v-btn disabled v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <v-tabs hide-slider grow color="green">
          <v-tab class="text-none font-weight-medium">Notifications</v-tab>
          <v-tab class="text-none font-weight-medium">Messages</v-tab>
          <v-tab-item>
            <v-list one-line class="py-0" max-width="400">
              <v-list-item link class="py-1" @click="bellMenu = false">
                <v-list-item-content>
                  <v-list-item-subtitle
                    >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nesciunt repellat temporibus nulla ipsa nemo? Optio ea natus
                    voluptate ducimus magnam. Fugit beatae minima molestias ab
                    odio dolorum. Excepturi, ipsum ut.</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>
            <v-card elevation="0" class="d-flex align-center justify-center">
              <v-card-text class="text-center py-1">
                <v-btn
                  link
                  plain
                  to="/notifications"
                  class="text-none"
                  @click="bellMenu = false"
                  >View all</v-btn
                >
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-list two-line class="py-0" max-width="400">
              <v-list-item link to="/messages/1" @click="bellMenu = false">
                <v-list-item-avatar>
                  <v-img></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>John Doe</v-list-item-title>
                  <v-list-item-subtitle
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis illo architecto obcaecati sequi eum! Dolores dicta
                    repudiandae earum, et culpa qui deserunt fugit! Pariatur
                    vel, perspiciatis iste voluptatibus accusamus
                    officiis.</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
            </v-list>
            <v-card elevation="0" class="d-flex align-center justify-center">
              <v-card-text class="text-center py-1">
                <v-btn
                  plain
                  link
                  to="/messages"
                  class="text-none"
                  @click="bellMenu = false"
                  >View all</v-btn
                >
              </v-card-text>
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
            @click="updatePageTitle"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/profile" @click="updatePageTitle">
            <v-list-item-icon>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/settings" @click="updatePageTitle">
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
          <v-btn
            rounded
            block
            @click="logout"
            class="text-none my-4"
            color="success"
          >
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
        @click="updatePageTitle"
      >
        <span class="d-none d-sm-flex">{{ link.text }}</span>
        <v-icon>{{ link.icon }}</v-icon>
      </v-btn>
      <v-btn
        link
        to="/settings"
        v-if="$vuetify.breakpoint.smAndUp"
        @click="updatePageTitle"
      >
        <span>Settings</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn
        link
        to="/profile"
        v-if="$vuetify.breakpoint.smAndUp"
        @click="updatePageTitle"
      >
        <span>Profile</span>
        <v-icon>mdi-account-details</v-icon>
      </v-btn>

      <!-- More links menu -->
      <v-menu top offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="px-0 d-flex d-sm-none" v-bind="attrs" v-on="on">
            <span class="d-none d-sm-flex">More</span>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <!-- Links -->
        <v-list class="text-center py-0">
          <v-list-item class="px-0" link to="/profile" @click="updatePageTitle">
            <v-list-item-title>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            class="px-0"
            link
            to="/settings"
            @click="updatePageTitle"
          >
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
        :size="200"
        :width="15"
        :value="pageLoadValue"
        color="success"
      >
        Loading: {{ pageLoadValue }}
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { mapState, mapActions } from "vuex";
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
    // if (localStorage.getItem("loggedIn") === "true") {
    //   // Show the overlay
    //   this.pageLoadOverlay = true;

    //   // Fetch user settings
    //   await this.getUserSettingsAction();
    //   this.pageLoadValue += 50;

    //   // Fetch user profile
    //   await this.getUserProfileAction();
    //   this.pageLoadValue += 50;

    //   // Set the app's theme
    //   this.$vuetify.theme.dark = this.userSettings.appTheme === "dark";

    //   // Set the page title
    //   this.pageTitle = document.title;

    //   setTimeout(() => {
    //     // Hide the overlay
    //     this.pageLoadOverlay = false;
    //   }, 1000);
    // }

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
      pageTitle: "",
      pageLoadOverlay: false,
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
    ...mapActions(["getUserProfileAction", "getUserSettingsAction"]),
    updatePageTitle() {
      this.pageTitle = document.title;
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
    ...mapState(["dashboardLinks", "userProfile", "userSettings"]),
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

.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #ffffff !important;
}

.blockquote::before,
.blockquote::after {
  content: '"';
  font-weight: bold;
}
</style>
