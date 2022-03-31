<template>
  <v-container fluid class="py-10 px-4 px-sm-8">
    <v-row align="center" class="py-sm-4">
      <v-col cols="12" sm="6">
        <div class="text-center text-sm-left">
          <h1 class="text-h5 text-md-h4 font-weight-bold success--text">
            {{ $t("home.row1.title") }}
          </h1>
          <p class="my-2 subtitle-2 text-md-subtitle-1 font-weight-regular">
            {{ $t("home.row1.subtitle") }}
          </p>
          <v-btn rounded link to="/sign-up" color="success" class="text-none">{{
            $t("home.row1.btn")
          }}</v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <v-img
          class="rounded-lg mx-auto"
          src="https://firebasestorage.googleapis.com/v0/b/demaplanner.appspot.com/o/home%2Fhome-1.jpg?alt=media&token=ea6e5c3d-8d95-4c1f-99a6-eecad52d40d1"
          :height="imgHeight"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="py-sm-4">
      <v-col cols="12" class="pb-0">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          {{ $t("home.row2.title.one") }}
          <strong class="orange--text">{{ $t("home.row2.title.two") }}</strong>
          {{ $t("home.row2.title.three") }}
          <strong class="success--text">
            {{ $t("home.row2.title.four") }}
          </strong>
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
          {{ $t("home.row2.subtitle") }}
        </p>
      </v-col>
      <v-col cols="12" class="text-center pt-0">
        <v-btn rounded link to="/about-us" color="success" class="text-none">{{
          $t("home.row2.btn")
        }}</v-btn>
      </v-col>
    </v-row>
    <v-row class="py-sm-4">
      <v-col cols="12" class="pb-0">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          {{ $t("home.row3.title.one") }}
          <strong class="success--text"
            >{{ $t("home.row3.title.two") }}
          </strong>
          {{ $t("home.row3.title.three") }}
        </h1>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon :size="iconSize" color="success">mdi-food-variant</v-icon>
          <h2 class="text-h6 text-md-h5 font-weight-medium my-1">
            {{ $t("home.row3.subtitle.one.title") }}
          </h2>
          <p class="ma-0 subtitle-2 text-md-subtitle-1 font-weight-regular">
            {{ $t("home.row3.subtitle.one.subtitle") }}
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon :size="iconSize" color="success">mdi-noodles</v-icon>
          <h2 class="text-h6 text-md-h5 font-weight-medium my-1">
            {{ $t("home.row3.subtitle.two.title") }}
          </h2>
          <p class="ma-0 subtitle-2 text-md-subtitle-1 font-weight-regular">
            {{ $t("home.row3.subtitle.two.subtitle") }}
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="d-flex flex-column align-center text-center">
          <v-icon :size="iconSize" color="success">mdi-home-group</v-icon>
          <h2 class="text-h6 text-md-h5 font-weight-medium my-1">
            {{ $t("home.row3.subtitle.three.title") }}
          </h2>
          <p class="ma-0 subtitle-2 text-md-subtitle-1 font-weight-regular">
            {{ $t("home.row3.subtitle.three.subtitle") }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="py-sm-4">
      <v-col cols="12" class="pb-0">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          {{ $t("home.row4.title") }}
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
            >{{ $t("home.row4.subtitle.one.title") }}</v-card-title
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
              <span class="ml-2">{{
                $t("home.row4.subtitle.one.subtitle.one")
              }}</span>
            </div>
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2">{{
                $t("home.row4.subtitle.one.subtitle.two")
              }}</span>
            </div>
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2">
                {{ $t("home.row4.subtitle.one.subtitle.three") }}</span
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
            >{{ $t("home.row4.subtitle.two.title") }}</v-card-title
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
              <span class="ml-2">
                {{ $t("home.row4.subtitle.one.subtitle.one") }}</span
              >
            </div>
            <div class="d-flex align-center">
              <v-icon size="18px" color="success">mdi-check</v-icon>
              <span class="ml-2">{{
                $t("home.row4.subtitle.one.subtitle.one")
              }}</span>
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
          {{ $t("home.row5.title") }}
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
          {{ $t("home.row5.subtitle") }}
        </p>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn
          rounded
          link
          to="/contact-us"
          color="success"
          class="text-none"
          >{{ $t("home.row5.btn") }}</v-btn
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

