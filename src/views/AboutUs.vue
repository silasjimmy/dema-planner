<template>
  <v-container fluid class="py-10 px-4 px-sm-8">
    <v-row align="center">
      <v-col cols="12" class="pb-0">
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">
          About us
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
          We are a group of individuals trying to change the world through the
          use of technology. Our interest in human health started when we
          observed that not everyone is aware of how a simple thing as food
          could change their lives. People spend a lot in treatment of
          diet-related diseases which could be avoided by eating healthy foods.
          In addition, there is more that could be done in the field of
          nutrition and we felt that it is time we did something about that.
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          contain
          height="300px"
          src="../assets/images/about-1.jpg"
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
          Food is more than just something to put to your stomach. To us, we see
          food as medicine where an individual like you for instance needs to
          know what to take, how much and how. The human body requires all sorts
          of nutrients and with careful planning, you can afford a healthy diet
          everyday and stop worrying about getting sick.
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          contain
          height="300px"
          src="../assets/images/about-2.jpg"
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
          Using a smart algorithm, we can create for you a meal that contains
          all the nutrients required by the body within a matter of seconds. At
          whatever time you choose your meal, you can have it in a nearest
          eatery or simply decide to prepare at the comfort of your home. You
          can edit the servings, select the eatery of your choice and reserve a
          seat for that time. We have simplified the process of planning meals
          to a fast and more robust activity.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">
          Our mission
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
          Our mission is to enable each and everyone have the opportunity to
          live a healthy lifestyle with ease. We have dedicated our time and
          resources into this work to ensure that we provide our clients the
          best of all.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">
          Meet the team
        </h1>
      </v-col>
      <v-col cols="12">
        <v-card outlined width="250px" class="rounded-lg mx-auto my-2">
          <v-img
            src="../assets/images/silas-jimmy.jpg"
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
        <h1 class="text-center text-h5 text-md-h4 font-weight-bold">Support</h1>
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
          Currently we are looking for support from volunteers to contribute in
          creating the food database. We will also appreciate any contribution
          in terms of money in order to fund this revolution. In whatever
          capacity you can, just give. We appreciate the sacrifice already.
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