<template>
  <v-container fluid>
    <v-row class="my-8 px-4" align="center">
      <v-col cols="12" md="6">
        <div class="text-center text-md-left">
          <h1 class="text-h4 font-weight-medium green--text">
            Your path to a better lifestyle
          </h1>
          <p class="mt-2">
            Whatever you do, being healthy is important to live a comfortable
            life. It is amazing how something as simple as food can tranform you
            life in ways you never imagined. A healthy meal however, is crucial
            if you want to live long. All that matters to us is that you get to
            live longer and happier everyday.
          </p>
          <v-btn rounded link to="/about-us" color="success" class="text-none"
            >Learn more</v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          class="rounded-lg mx-auto"
          src="../assets/images/home-1.jpg"
          height="400px"
          width="500px"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="my-8 px-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">What we offer</h1>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon size="80px" color="green">mdi-food-variant</v-icon>
          <h2 class="text-h5 my-3">Balanced diet meals</h2>
          <p>
            It is not just about a meal but a healthy meal. Your body needs all
            the nutrients in order to perform effectively and a balanced diet
            meal contains all the vital nutrients.
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon color="green" size="80px">mdi-noodles</v-icon>
          <h2 class="text-h5 my-3">Locally available foods</h2>
          <p>
            What is the point of a healthy meal suggestion if you can't find the
            ingredients in your local market? With Dema, All your meals will be
            composed of locally available foods.
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon size="80px" color="green">mdi-home-group</v-icon>
          <h2 class="text-h5 my-3">Nearest eateries</h2>
          <p>
            You don't have time to prepare the meal? No problem. We make it
            possible by finding eateries near you which provide the meal and at
            an affordable price.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-8 px-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">
          Eat <strong class="orange--text">healthier</strong> with
          <strong class="green--text">Dema</strong>
        </h1>
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto">
        <p class="my-0 text-justify">
          It is a well known fact that nutrition plays a crucial role in our
          lives. Whatever stage you are, whether childhood, adulthood or older
          age, nutrition will always be important. It is at the center of human
          development. Despite the massive research done on health and
          nutrition, chronic diet-related diseases continue to rise by each day.
          Levels of physical activity, which by the way, is vital to the human
          health, remains low. We realized that reversing these trends will
          require tactical strategies and technology is one of the many tools we
          can use to promote health and help in reducing the risk of chronic
          diseases. We are but just young innovators trying to provide a
          solution to a problem facing the whole world. The objective is not to
          reinvent the wheel, but to add on what is already available and make
          it easier for people to live healthy lives. We focus on prevention,
          not treatment because we believe that prevention is better than cure.
          So what are you waiting for? It is time you took your first step
          towards changing your life and those around you.
        </p>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn rounded link to="/sign-in" color="success" class="text-none"
          >Log in</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="my-8 px-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">Start now</h1>
      </v-col>
      <v-col cols="12" lg="8" class="mx-auto d-flex flex-column flex-md-row">
        <v-card outlined width="400px" class="rounded-lg mx-auto my-2">
          <v-card-title>Consumer</v-card-title>
          <v-card-subtitle>Start planning your meals</v-card-subtitle>
          <v-card-text>
            <div class="mb-2 d-flex align-center">
              <v-icon color="green lighten-1">mdi-check</v-icon>
              <span class="ml-2 font-weight-light grey--text text--darken-4"
                >Automatically create balanced diet meals</span
              >
            </div>
          </v-card-text>
        </v-card>
        <v-card outlined disabled width="400px" class="rounded-lg mx-auto my-2">
          <v-card-title>Eatery</v-card-title>
          <v-card-subtitle
            >Advertize your business to consumers</v-card-subtitle
          >
          <v-card-text>
            <div class="mb-2 d-flex align-center">
              <v-icon color="green lighten-1">mdi-check</v-icon>
              <span class="ml-2 font-weight-light grey--text text--darken-4"
                >Display your menu to attract customers</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn rounded link to="/sign-up" color="success" class="text-none"
          >Get started</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="my-8 px-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">What they say</h1>
      </v-col>
      <v-col cols="12" md="8" lg="6" class="mx-auto">
        <v-card outlined class="mx-auto rounded-lg">
          <v-window show-arrows show-arrows-on-hover>
            <template v-slot:prev="{ on, attrs }">
              <v-btn fab small depressed color="error" v-bind="attrs" v-on="on">
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
                          {{ feedback.title }},
                          <strong class="font-italic">{{
                            feedback.country
                          }}</strong>
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
    </v-row>
    <v-row class="my-8 px-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">Get in touch</h1>
      </v-col>
      <v-col cols="12" sm="8" md="6" xl="4" class="mx-auto">
        <p class="my-0 text-center">
          Have any questions for us? We are glad that you want to know more
          about Dema. You can ask or tell us anything and we will reply
          immediately.
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
          title: "CEO & Founder",
          country: "Kenya",
        },
        {
          name: "John Doe",
          avatarUrl: "https://randomuser.me/api/portraits/men/13.jpg",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, velit voluptatum iusto cumque, vero porro repellat,debitis architecto vel amet inventore aut? Ratione, ipsamnisi. Nostrum pariatur praesentium soluta quos.",
          title: "Lawyer",
          country: "US",
        },
        {
          name: "Ana Smith",
          avatarUrl: "https://randomuser.me/api/portraits/women/35.jpg",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, velit voluptatum iusto cumque, vero porro repellat,debitis architecto vel amet inventore aut? Ratione, ipsamnisi. Nostrum pariatur praesentium soluta quos.",
          title: "Designer",
          country: "China",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
