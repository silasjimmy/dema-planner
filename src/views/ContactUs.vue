<template>
  <v-container class="px-4 py-10 px-sm-8" fluid>
    <v-row align="center" class="my-2 px-4">
      <v-col cols="12">
        <h1 class="text-h5 text-md-h4 font-weight-bold text-center">
          Contact us
        </h1>
      </v-col>
      <v-col cols="12" md="6">
        <v-img height="300px" src="../assets/images/contact-us.jpg"></v-img>
      </v-col>
      <v-col cols="12" md="6" class="text-center">
        <v-form lazy-validation ref="contactForm">
          <v-text-field
            dense
            outlined
            color="success"
            prepend-icon="mdi-account"
            label="Name"
            v-model="name"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            v-model="email"
            :rules="[rules.required]"
            color="success"
            prepend-icon="mdi-email"
            label="Email address"
          ></v-text-field>
          <v-textarea
            dense
            outlined
            v-model="message"
            :rules="[rules.required]"
            color="success"
            prepend-icon="mdi-message"
            label="Message"
          ></v-textarea>
        </v-form>
        <v-btn rounded @click="send" class="text-none" color="success">
          Send
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContactUs",
  title: "Contact us",
  data() {
    return {
      name: "",
      email: "",
      message: "",
      rules: {
        required: (value) => !!value || "This field is required!",
      },
    };
  },
  methods: {
    send() {
      if (this.$refs.contactForm.validate()) {
        console.log("Send!");
      }
    },
  },
};
</script>