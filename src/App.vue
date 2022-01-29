<template>
  <v-app>
    <!-- Home app bar -->
    <v-app-bar app elevate-on-scroll color="white" v-if="!signedIn">
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
    <v-navigation-drawer temporary app v-model="homeSidenav" v-if="!signedIn">
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
    <v-app-bar app elevate-on-scroll color="white" v-if="signedIn">
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="leftSidenav = true"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

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
            <v-btn v-bind="attrs" v-on="on" icon>
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
                  class="text-none my0"
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

      <v-app-bar-nav-icon
        class="d-sm-none"
        @click="rightSidenav = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Dashboard left-side navigation bar -->
    <v-navigation-drawer
      fixed
      app
      color="white"
      v-if="signedIn"
      :permanent="$vuetify.breakpoint.mdAndUp"
      v-model="leftSidenav"
      class="b"
    >
      <!-- Userview -->
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar size="80px">
              <img src="https://cdn.vuetifyjs.com/images/john.png" />
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-h6 font-weight-medium jost-font-family"
                >John Doe</v-list-item-title
              >
              <v-list-item-subtitle>johndoe@domain.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <!-- Navigation links -->
      <v-list rounded>
        <v-list-item-group>
          <v-list-item
            link
            v-for="link in adminLinks"
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
      color="white"
      v-if="signedIn"
      :permanent="$vuetify.breakpoint.smAndUp"
      v-model="rightSidenav"
    >
      <!-- Meal information -->
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold text-center"
              >Title</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div>
              <v-img
                height="150px"
                width="150px"
                class="b rounded-circle mx-auto"
              ></v-img>
            </div>
            <div>
              <v-card-text>
                <div
                  class="
                    font-weight-bold
                    green--text
                    d-flex
                    justify-space-between
                    align-center
                    py-1
                  "
                >
                  <span>Proteins</span><span>0g</span>
                </div>
                <div
                  class="
                    font-weight-bold
                    orange--text
                    d-flex
                    justify-space-between
                    align-center
                    py-1
                  "
                >
                  <span>Vitamins</span><span>0g</span>
                </div>
                <div
                  class="
                    font-weight-bold
                    blue-grey--text
                    d-flex
                    justify-space-between
                    align-center
                    py-1
                  "
                >
                  <span>Carbs</span><span>0g</span>
                </div>
                <div
                  class="
                    font-weight-bold
                    grey--text
                    text--darken-3
                    d-flex
                    justify-space-between
                    align-center
                    mt-3
                  "
                >
                  <span>Calories</span><span>0cal</span>
                </div>
              </v-card-text>
              <v-subheader>Suggested eateries</v-subheader>
              <v-card-text class="pt-0 pb-1">
                <div class="d-flex align-center justify-space-between">
                  <span class="subtitle-2 text--primary">Breakfast</span>
                  <v-btn
                    plain
                    link
                    class="text-none subtitle-2"
                    color="black"
                    to="/#"
                    >Mr Foxx</v-btn
                  >
                </div>
                <div class="d-flex align-center justify-space-between">
                  <span class="subtitle-2 text--primary">Lunch</span>
                  <v-btn
                    plain
                    link
                    class="text-none subtitle-2"
                    color="black"
                    to="/#"
                    >Mr Foxx</v-btn
                  >
                </div>
                <div class="d-flex align-center justify-space-between">
                  <span class="subtitle-2 text--primary">Dinner</span>
                  <v-btn
                    plain
                    link
                    class="text-none subtitle-2"
                    color="black"
                    to="/#"
                    >Mr Foxx</v-btn
                  >
                </div>
              </v-card-text>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app absolute padless v-if="!signedIn">
      <v-card flat tile color="grey lighten-5" width="100vw">
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
              <v-btn text rounded class="grey--text text--darken-4 text-none">
                <v-icon left size="24px">mdi-map-marker</v-icon>
                P.O Box 000-00000, Demaland, Kenya
              </v-btn>
              <v-btn text rounded class="grey--text text--darken-4 text-none">
                <v-icon left size="24px">mdi-email</v-icon>
                dema@gmail.com
              </v-btn>
              <v-btn text rounded class="grey--text text--darken-4">
                <v-icon left size="24px">mdi-phone</v-icon>
                +254 000 000 000
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="subtitle-1 text--secondary">
                Stay updated on our social platforms
              </h3>
              <v-btn class="grey--text mx-2 text--darken-4" icon>
                <v-icon size="24px">mdi-facebook</v-icon>
              </v-btn>
              <v-btn class="grey--text mx-2 text--darken-4" icon>
                <v-icon size="24px">mdi-linkedin</v-icon>
              </v-btn>
              <v-btn class="grey--text mx-2 text--darken-4" icon>
                <v-icon size="24px">mdi-twitter</v-icon>
              </v-btn>
              <v-btn class="grey--text mx-2 text--darken-4" icon>
                <v-icon size="24px">mdi-instagram</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="grey--text text--darken-4 text-center">
          <span>{{ new Date().getFullYear() }} — <strong>Dema</strong></span>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "App",
  created() {
    // Sets the sign in status, user email and user role in store on app creation
    this.$store.commit(
      "setSignedIn",
      localStorage.getItem("loggedIn") === "true"
    );
    this.$store.commit("setUserEmail", localStorage.getItem("userEmail"));
    this.$store.commit("setUserRole", localStorage.getItem("userRole"));

    console.log(
      this.$store.state.signedIn,
      this.$store.state.userEmail,
      this.$store.state.userRole
    );
  },
  mounted() {
    // Monitor the user sign in activity
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Store the user email locally
        localStorage.setItem("userEmail", user.email);

        // Set logged in to true
        localStorage.setItem("loggedIn", "true");
      } else {
        // Remove user email from local storage
        localStorage.removeItem("userEmail");

        // Remove user role from local storage
        localStorage.removeItem("userRole");

        // Set logged in to false
        localStorage.setItem("loggedIn", "false");

        // Update app store
        this.$store.commit("setSignedIn", false);
      }
    });
  },
  data() {
    return {
      homeSidenav: false,
      leftSidenav: false,
      rightSidenav: false,
      notificationsMenu: false,
      adminLinks: [
        { url: "/summary", icon: "mdi-home", text: "Summary" },
        { url: "/users", icon: "mdi-account", text: "Users" },
        { url: "/foods", icon: "mdi-pizza", text: "Foods" },
      ],
      consumerLinks: [
        { url: "/meal-planner", icon: "mdi-hamburger", text: "Meal planner" },
        { url: "/available-foods", icon: "mdi-pizza", text: "Available foods" },
        {
          url: "/nearest-eateries",
          icon: "mdi-table-chair",
          text: "Nearest eateries",
        },
      ],
      eateryLinks: [
        { url: "/menu", icon: "mdi-home", text: "Menu" },
        { url: "/food-request", icon: "mdi-pizza", text: "Food request" },
      ],
    };
  },
  methods: {
    logout() {
      // localStorage.setItem("loggedIn", "false");
      // this.$store.commit("setSignedIn", false);
      // this.$router.replace({ name: "sign-in" });

      const auth = getAuth();

      signOut(auth)
        .then(() => {
          // Direct to sign in page
          this.$router.replace({ name: "sign-in" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
    userRole() {
      return this.$store.state.userRole;
    },
  },
};
</script>

<style>
.b {
  border: 1px solid black;
}
</style>
