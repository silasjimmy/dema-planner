<template>
  <v-container fluid class="py-10 px-4 px-sm-8">
    <v-row align="center" class="py-sm-4">
      <v-col cols="12" sm="6">
        <div class="text-center text-sm-left">
          <h1 class="text-h5 text-md-h4 font-weight-bold success--text">
            Your journey to a healthy lifestyle
          </h1>
          <p class="my-2 subtitle-2 text-md-subtitle-1 font-weight-regular">
            Live longer and happier by planning healthy meals everyday. Explore
            the vast variety of foods and meals which you never knew about in
            your region.
          </p>
          <v-btn rounded link to="/sign-up" color="success" class="text-none"
            >Get started</v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <v-img
          class="rounded-lg mx-auto"
          src="../assets/images/home-1.jpg"
          :height="imgHeight"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="py-sm-4">
      <v-col cols="12" class="pb-0">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          Eat <strong class="orange--text">healthier</strong> with
          <strong class="success--text">Dema</strong>
        </h1>
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto">
        <p
          class="
            ma-0
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
            text-center
          "
        >
          Nutrition plays a major role in our lives, despite the stage of life
          you are in. It is the center of human development, that is why we have
          put our interest in this field. Diet-related diseases continue to
          occur every day while the level of physical activity drops. As
          motivated students, we realized we could change the situation with the
          use of technology. We decided that prevention measures are much better
          and it was about time to start educating people on the importance of
          healthy diets. If you are here that means you want to do something
          about your health. Before you do, maybe get to know us better.
        </p>
      </v-col>
      <v-col cols="12" class="text-center pt-0">
        <v-btn rounded link to="/about-us" color="success" class="text-none"
          >Learn more</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="py-sm-4">
      <v-col cols="12" class="pb-0">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          Why <strong class="success--text">Dema</strong>?
        </h1>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon :size="iconSize" color="success">mdi-food-variant</v-icon>
          <h2 class="text-h6 text-md-h5 font-weight-medium my-1">
            Balanced diets
          </h2>
          <p class="ma-0 subtitle-2 text-md-subtitle-1 font-weight-regular">
            Your body needs different types of nutrients in order to function
            optimally. With a balanced diet, you get all the nutrients necessary
            for good health.
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon :size="iconSize" color="success">mdi-noodles</v-icon>
          <h2 class="text-h6 text-md-h5 font-weight-medium my-1">
            Local foods
          </h2>
          <p class="ma-0 subtitle-2 text-md-subtitle-1 font-weight-regular">
            Get a chance to taste and enjoy all the foods in your region. We
            make sure that all meals generated are easily available in your
            area.
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon :size="iconSize" color="success">mdi-home-group</v-icon>
          <h2 class="text-h6 text-md-h5 font-weight-medium my-1">
            Nearest eateries
          </h2>
          <p class="ma-0 subtitle-2 text-md-subtitle-1 font-weight-regular">
            You don't have time to prepare the meal? Don't worry, we got you.
            With our eatery suggestions, you can book a seat for any meal in any
            eatery near you with ease.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="py-sm-4">
      <v-col cols="12" class="pb-0">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          What we offer
        </h1>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card outlined width="400px" class="rounded-lg mx-auto">
          <v-card-title
            class="
              justify-center justify-sm-start
              text-h6 text-md-h5
              font-weight-medium
            "
            >For consumers</v-card-title
          >
          <v-card-text
            class="
              text--primary
              subtitle-2
              text-md-subtitle-1
              font-weight-regular
            "
          >
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2">Plan your daily meals</span>
            </div>
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2">Track your nutrient and caloric intake</span>
            </div>
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2"
                >Book a seat for a meal in an eatery near you</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card outlined width="400px" class="rounded-lg mx-auto">
          <v-card-title
            class="
              justify-center justify-sm-start
              text-h6 text-md-h5
              font-weight-medium
            "
            >For eateries</v-card-title
          >
          <v-card-text
            class="
              text--primary
              subtitle-2
              text-md-subtitle-1
              font-weight-regular
            "
          >
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2">Share your menu with consumers</span>
            </div>
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2">Receive and arrange bookings</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row class="b py-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">What they say</h1>
      </v-col>
      <v-col cols="12" md="8" lg="6" class="mx-auto">
        <v-card outlined class="mx-auto rounded-lg">
          <v-window show-arrows show-arrows-on-hover>
            <template v-slot:prev="{ on, attrs }">
              <v-btn
                fab
                small
                depressed
                color="success"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn
                fab
                small
                depressed
                color="success"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>

            <v-window-item
              v-for="feedback in userFeedback"
              :key="feedback.name"
            >
              <v-container class="pa-0">
                <v-row no-gutters>
                  <v-col cols="12" sm="4">
                    <v-img
                      :src="feedback.avatarUrl"
                      width="100%"
                      height="200px"
                      class="d-flex align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.8)"
                    >
                      <div class="white--text pl-4 pb-2">
                        <h1 class="text-h6">{{ feedback.name }}</h1>
                        <h2 class="subtitle-1">
                          <i>{{ feedback.title }}, </i>
                          <strong>{{ feedback.country }}</strong>
                        </h2>
                      </div>
                    </v-img>
                  </v-col>
                  <v-col cols="12" sm="8" align-self="center">
                    <p class="blockquote mb-0">
                      {{ feedback.message }}
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row> -->
    <v-row class="py-sm-4">
      <v-col cols="12">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          Any questions?
        </h1>
      </v-col>
      <v-col cols="12" sm="8" md="6" xl="4" class="mx-auto">
        <p
          class="
            ma-0
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
            text-center
          "
        >
          If you have any questions or just want to know more, don't hesitate to
          get in touch.
        </p>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn rounded link to="/contact-us" color="success" class="text-none"
          >Contact us</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  title: "Home",
  data() {
    return {
      userFeedback: [
        {
          name: "Jane Doe",
          avatarUrl: "https://randomuser.me/api/portraits/women/92.jpg",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, velit voluptatum iusto cumque, vero porro repellat,debitis architecto vel amet inventore aut? Ratione, ipsamnisi. Nostrum pariatur praesentium soluta quos.",
          title: "Position",
          country: "Country",
        },
        {
          name: "John Doe",
          avatarUrl: "https://randomuser.me/api/portraits/men/13.jpg",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, velit voluptatum iusto cumque, vero porro repellat,debitis architecto vel amet inventore aut? Ratione, ipsamnisi. Nostrum pariatur praesentium soluta quos.",
          title: "Position",
          country: "Country",
        },
        {
          name: "Ana Smith",
          avatarUrl: "https://randomuser.me/api/portraits/women/35.jpg",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, velit voluptatum iusto cumque, vero porro repellat,debitis architecto vel amet inventore aut? Ratione, ipsamnisi. Nostrum pariatur praesentium soluta quos.",
          title: "Position",
          country: "Country",
        },
      ],
    };
  },
  computed: {
    imgHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          return "500px";
        case "lg":
          return "450px";
        case "md":
          return "400px";
        default:
          return "100%";
      }
    },
    iconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          return "100px";
        case "lg":
          return "80px";
        case "md":
          return "60px";
        default:
          return "50px";
      }
    },
  },
};
</script>

