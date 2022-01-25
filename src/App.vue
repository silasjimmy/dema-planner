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

      <v-btn plain rounded link class="text-none" to="/home">Home</v-btn>
      <v-btn plain rounded link class="text-none" to="/sign-in">Log in</v-btn>
      <v-btn plain rounded link class="text-none" to="/sign-up">Sign up</v-btn>
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
      <v-list flat>
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
          <div v-if="userRole === 'eatery'">
            <v-list-item link @click="pageTitle = 'Menu'" to="/menu">
              <v-list-item-icon>
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Menu</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              link
              @click="pageTitle = 'Food request'"
              to="/food-request"
            >
              <v-list-item-icon>
                <v-icon>mdi-pizza</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Food request</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              link
              @click="pageTitle = 'Settings'"
              to="/eatery-settings"
            >
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-if="userRole === 'admin'">
            <v-list-item link @click="pageTitle = 'Summary'" to="/summary">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Summary</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="pageTitle = 'Users'" to="/users">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Users</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="pageTitle = 'Foods'" to="/foods">
              <v-list-item-icon>
                <v-icon>mdi-pizza</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Foods</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              link
              @click="pageTitle = 'Settings'"
              to="/admin-settings"
            >
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-if="userRole === 'consumer'">
            <v-list-item link to="/meal-planner">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Meal planner</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/available-foods">
              <v-list-item-icon>
                <v-icon>mdi-pizza</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Available foods</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/nearest-eateries">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Nearest eateries</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/user-profile">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/user-settings">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
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

    <!-- <v-footer app absolute padless>
      <v-row justify="center" align="center" no-gutters>
        <v-btn text rounded class="my-2 text-none"> Home </v-btn>
        <v-col class="pa-2 d-flex align-center" cols="12">
          <v-btn link plain class="text-none">Terms & Conditions</v-btn>
          <v-spacer></v-spacer>
          <span>{{ new Date().getFullYear() }} — <strong>Dema</strong></span>
          <v-spacer></v-spacer>
          <span>All rights reserved.</span>
        </v-col>
      </v-row>
    </v-footer> -->
  </v-app>
</template>

<script>
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",
  created() {
    // Sets the sign in status on app creation
    const ls = localStorage.getItem("loggedIn");
    let status = null;

    if (ls === "true") status = true;
    else status = false;

    this.$store.commit("setSignedIn", status);
    this.loggedIn = this.$store.signedIn;
    console.log(status);
  },
  mounted() {
    // // Monitor the user sign in activity
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // Store the user email locally
    //     localStorage.setItem("userEmail", user.email);
    //     // Set logged in to true
    //     localStorage.setItem("loggedIn", "true");
    //     // Update app store
    //     this.$store.commit("setSignedIn", true);
    //   } else {
    //     // Remove user email from local storage
    //     localStorage.removeItem("userEmail");
    //     // Set logged in to false
    //     localStorage.setItem("loggedIn", "false");
    //     // Update app store
    //     this.$store.commit("setSignedIn", false);
    //   }
    // });
  },
  data() {
    return {
      homeSidenav: false,
      leftSidenav: false,
      rightSidenav: false,
      notificationsMenu: false,
    };
  },
  methods: {
    logout() {
      console.log("Log out!");
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
