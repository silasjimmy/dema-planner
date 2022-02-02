<template>
  <v-container fluid>
    <v-card outlined class="rounded-lg">
      <v-data-table
        :items-per-page="itemsPerPage"
        item-key="name"
        :headers="headers"
        :items="users"
        sort-by="calories"
      >
        <template v-slot:top>
          <v-toolbar flat class="rounded-lg">
            <v-toolbar-title>All users</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Edit user dialog -->
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  rounded
                  elevation="0"
                  class="text-none"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-plus</v-icon>
                  Add user
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text color="error" class="text-none" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn text color="success" class="text-none" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Delete user dialog -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="error"
                    class="text-none"
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="success"
                    class="text-none"
                    @click="deleteItemConfirm"
                  >
                    Ok
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.online="{ item }">
          <v-avatar size="20" color="success" v-if="item.online">
            <v-icon small class="white--text">mdi-plus</v-icon>
          </v-avatar>
          <v-avatar size="20" color="grey" v-if="!item.online">
            <v-icon small class="white--text">mdi-minus</v-icon>
          </v-avatar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Users",
  title: "Users",
  created() {
    this.$store.commit("setDashboardLinks", localStorage.getItem("userRole"));
    this.initialize();
  },
  data() {
    return {
      itemsPerPage: 5,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Name",
          value: "name",
          align: "center",
        },
        { text: "Type", value: "type", align: "center" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        email: "",
      },
      defaultItem: {
        name: "",
        email: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New user" : "Edit user";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    initialize() {
      this.users = [
        {
          name: "Silas jimmy",
          type: "consumer",
          online: false,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
</style>