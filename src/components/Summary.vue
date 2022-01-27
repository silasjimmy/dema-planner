<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-subheader>Registration</v-subheader>
            <v-row>
              <v-col cols="12" lg="4">
                <v-card>
                  <v-card-text class="d-flex flex-column align-center">
                    <div class="text-h3 text--primary font-weight-bold">0</div>
                    <div class="subtitle-1">registered users</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" lg="4">
                <v-card>
                  <v-card-text class="d-flex flex-column align-center">
                    <div class="text-h3 text--primary font-weight-bold">0</div>
                    <div class="subtitle-1">registered consumers</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" lg="4">
                <v-card>
                  <v-card-text class="d-flex flex-column align-center">
                    <div class="text-h3 text--primary font-weight-bold">0</div>
                    <div class="subtitle-1">registered eateries</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-subheader>Usage</v-subheader>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-sheet>
                    <v-sparkline
                      :value="usageValues"
                      :labels="usageLabels"
                      height="100px"
                      padding="16"
                      line-width="1"
                      color="green"
                      label-size="4"
                    >
                      <template v-slot:label="item">
                        {{ item.value }}
                      </template>
                    </v-sparkline>
                  </v-sheet>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  title: "Summary",
  name: "Summary",
  data() {
    return {
      usageValues: [40, 30, 50, 60, 0, 10, 20, 70, 80, 90, 50, 40],
      usageLabels: [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
};
</script>

<style scoped>
</style>