<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-divider></v-divider>

    <v-btn
      fab
      bottom
      right
      color="blue"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-container frid-list>
      <!-- v-for="value in object" -->
      <v-layout row>
        <v-flex xs3 sm3 v-for="category in categories">
          <v-card>
            <v-toolbar color="pink" dark>
              <v-toolbar-title>{{ category.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon> settings </v-icon>
              </v-btn>
            </v-toolbar>
            <v-list two-line>
              <template v-for="(item, index) in itemsCategory">
                <v-list-tile :key="index" avatar ripple @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                    <v-icon color="grey lighten-1">star_border</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>

    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title class="black lighten-4 py-4 title">
          <v-icon> queue </v-icon> New Category
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="name"
                prepend-icon="storage"
                placeholder="Categor Name"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="addCategory()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    name: null,
    categories: [],
    items: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/'
        },
        {
          text: 'Buget',
          disabled: true
        }
      ],
    itemsCategory: [
      { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
      { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
      { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
      { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
      { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
    ]
  }),
  watch: {
  },
  methods: {
    addCategory () {
      this.categories.push({name: this.name})
      this.dialog = false
      this.name = ''
    }
  },

}
</script>
<style lang="scss">
  .cat-mr {
    margin-right: 5px;
  }
</style>
