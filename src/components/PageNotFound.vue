<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert elevation="2">
          <h1 class="text-h4 text-center mb-4 font-weight-bold red--text">
            404 error
          </h1>
          <v-img
            class="b mx-auto rounded-circle"
            width="120px"
            height="120px"
          ></v-img>
          <h2 class="text-h5 mt-4 text-center font-weight-medium">
            Page not found!
          </h2>

          <v-divider class="my-4"></v-divider>

          <v-row align="center" no-gutters>
            <v-col class="grow">
              The page you are trying to access cannot be found. Go back to
              continue.
            </v-col>
            <v-col class="shrink">
              <v-btn rounded color="success" class="text-none">
                <v-icon left>mdi-arrow-left</v-icon>
                Go back
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
  title: "Page not found",
};
</script>

<style>
</style>