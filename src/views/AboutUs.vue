<template>
  <v-container fluid class="py-10 px-4 px-sm-8">
    <v-row align="center">
      <v-col cols="12" class="pb-0">
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">
          {{ $t("about.title1") }}
        </h1>
      </v-col>
      <v-col cols="12" md="6">
        <p
          class="
            my-0
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
            text-center text-md-left
          "
        >
          {{ $t("about.p1") }}
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          contain
          height="300px"
          src="https://firebasestorage.googleapis.com/v0/b/demaplanner.appspot.com/o/home%2Fabout-1.jpg?alt=media&token=24c00841-53bd-4eae-8397-0f43aa7ff4cb"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <p
          class="
            my-0
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
            text-center
          "
        >
          {{ $t("about.p2") }}
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          contain
          height="300px"
          src="https://firebasestorage.googleapis.com/v0/b/demaplanner.appspot.com/o/home%2Fabout-2.jpg?alt=media&token=2286b57f-7b5f-4c81-a60c-c74a13d30e77"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <p
          class="
            my-0
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
            text-center text-md-left
          "
        >
          {{ $t("about.p2") }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">
          {{ $t("about.title2") }}
        </h1>
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="6" xl="4" class="mx-auto">
        <p
          class="
            my-0
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
            text-center
          "
        >
          {{ $t("about.p4") }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">
          {{ $t("about.title3") }}
        </h1>
      </v-col>
      <v-col cols="12">
        <v-card outlined width="250px" class="rounded-lg mx-auto my-2">
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/demaplanner.appspot.com/o/home%2Fsilas-jimmy.jpg?alt=media&token=daf2f6c0-34b7-483e-9dc9-abc8e076b97b"
            class="d-flex align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.8)"
          >
            <div class="white--text">
              <v-card-title
                class="text-h6 text-md-h5 font-weight-medium text-capitalize"
                >silas jimmy</v-card-title
              >
              <v-card-subtitle
                class="subtitle-2 text-md-subtitle-1 font-weight-regular"
                >Founder</v-card-subtitle
              >
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">
          {{ $t("about.title4") }}
        </h1>
      </v-col>
      <v-col cols="12" sm="10" md="8" lg="6" xl="4" class="mx-auto">
        <p
          class="
            my-0
            subtitle-2
            text-md-subtitle-1
            font-weight-regular
            text-center
          "
        >
          {{ $t("about.p5") }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutUs",
  title: "About us",
};
</script>