<template>
  <v-container fluid>
    <v-row class="my-2" align="center">
      <v-col cols="6">
        <div>
          <h1 class="text-h4 font-weight-medium">Some large heading</h1>
          <p class="my-2 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            in magnam doloremque dignissimos vel. Tenetur accusamus nisi eaque.
            Ratione ipsum animi placeat voluptatibus voluptas voluptatum dicta
            aliquam minima labore ex?
          </p>
          <v-btn rounded color="success" class="text-none">Learn more</v-btn>
        </div>
      </v-col>
      <v-col cols="6">
        <v-img class="b" height="400px"></v-img>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="my-2">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">Section heading</h1>
      </v-col>
      <v-col cols="4">
        <div class="d-flex flex-column align-center">
          <v-img class="b" height="100px" width="100px"></v-img>
          <p class="my-2 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            similique ea dignissimos doloremque dicta voluptatem nobis sapiente
            quisquam ipsum autem aut odit asperiores, blanditiis modi eos
            reprehenderit consequuntur nulla omnis.
          </p>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="d-flex flex-column align-center">
          <v-img class="b" height="100px" width="100px"></v-img>
          <p class="my-2 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            similique ea dignissimos doloremque dicta voluptatem nobis sapiente
            quisquam ipsum autem aut odit asperiores, blanditiis modi eos
            reprehenderit consequuntur nulla omnis.
          </p>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="d-flex flex-column align-center">
          <v-img class="b" height="100px" width="100px"></v-img>
          <p class="my-2 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            similique ea dignissimos doloremque dicta voluptatem nobis sapiente
            quisquam ipsum autem aut odit asperiores, blanditiis modi eos
            reprehenderit consequuntur nulla omnis.
          </p>
        </div>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn rounded color="success" class="text-none">Get started</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="my-2">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">Section heading</h1>
      </v-col>
      <v-col cols="8" class="mx-auto">
        <p class="my-0 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
          recusandae? Perspiciatis, officia iste rerum ducimus quibusdam
          laudantium, quisquam assumenda hic beatae blanditiis sit pariatur vel
          doloribus cupiditate magnam dolore repellat? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Veniam, recusandae? Perspiciatis,
          officia iste rerum ducimus quibusdam laudantium, quisquam assumenda
          hic beatae blanditiis sit pariatur vel doloribus cupiditate magnam
          dolore repellat? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Veniam, recusandae? Perspiciatis, officia iste rerum ducimus
          quibusdam laudantium, quisquam assumenda hic beatae blanditiis sit
          pariatur vel doloribus cupiditate magnam dolore repellat?
        </p>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn rounded color="success" class="text-none"
          >Log in to continue</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="my-2">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">Section heading</h1>
      </v-col>
      <v-col cols="12">
        <v-sheet elevation="4" width="60vw" class="mx-auto">
          <v-window show-arrows show-arrows-on-hover>
            <v-window-item>
              <v-card height="300px">
                <v-row
                  class="fill-height px-16"
                  align="center"
                  justify="center"
                >
                  <v-col cols="4">
                    <v-list class="transparent">
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img class="b"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Name</v-list-item-title>
                          <v-list-item-subtitle>Position</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="8">
                    <p class="blockquote">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsam, velit voluptatum iusto cumque, vero porro repellat,
                      debitis architecto vel amet inventore aut? Ratione, ipsam
                      nisi. Nostrum pariatur praesentium soluta quos.
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </v-window-item>
          </v-window>
        </v-sheet>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="my-2">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-medium text-center">Section heading</h1>
      </v-col>
      <v-col cols="6" class="mx-auto">
        <p class="my-0 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          reprehenderit sequi corrupti numquam distinctio quidem placeat
          doloremque suscipit saepe libero! Reprehenderit itaque soluta nobis
          saepe? Obcaecati fuga repellat ducimus asperiores.
        </p>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn rounded color="success" class="text-none">Contact us</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  title: "Home",
};
</script>
