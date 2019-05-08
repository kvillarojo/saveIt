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
    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="categories"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
        <template v-slot:item="props">
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <v-card>
               <v-toolbar color="blue" dark>
                <v-card-title><h4>{{ props.item.name }}</h4>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon> settings </v-icon>
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <v-list dense>
                <Expeneses :amount='props.item.amount' v-on:setNewAmount="newAmount" :catID="props.index"/>
                <v-list-tile>
                  <v-list-tile-content> Expenses : </v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.expenses }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content> Balance : </v-list-tile-content>
                  <v-list-tile-content class="align-end" >{{ props.item.ballace }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>

    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title class="blue py-4 title">
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
            <v-flex xs12>
              <v-text-field v-model="amount" type="number"
                prepend-icon="monetization_on"
                placeholder="Amount"
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
import Expeneses from './Expeneses'

export default {
  data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPexrPage: 4
    },
    dialog: false,
    name: null,
    catId: null,
    amount: null,
    categories: [],
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/'
      },
      {
        text: 'Bugets',
        disabled: true
      }
    ],
    itemsCategory: []
  }),
  watch: {
    categories: function () {
      this.dialog = false
      this.name = ''
      this.amount = ''
    }
  },
  components: {
    Expeneses
  },
  methods: {
    addCategory () {
      this.categories.push({name: this.name, amount: this.amount})
    },
    newAmount (value, ID) {
      this.categories[ID].amount = value
    }
  }
}
</script>
<style lang="scss">
  .cat-mr {
    margin-right: 5px;
  }
  .v-card__title {
      padding: 0px;
  }
  .v-card__title.blue.py-4.title {
    padding-left: 20px;
    color: white;
  }
</style>
