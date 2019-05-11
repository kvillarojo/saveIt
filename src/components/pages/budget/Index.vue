<template>
  <div>
    <v-breadcrumbs :items="pageTrail">
      <template v-slot:divider>
        <v-icon>forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-divider></v-divider>
    <h3> Amount: {{ amounToSpend }}  </h3>
    <v-btn
      fab
      bottom
      right
      color="blue"
      dark
      fixed
      @click.stop="showAddNewCategory()">
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
                <Amount :amount='props.item.amount' v-on:setNewAmount="newAmount" :catID="props.index"/>
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
        <v-form v-model="valid" ref="form">
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model="categoryEntries.name"
                  prepend-icon="storage"
                  placeholder="Categor Name"
                  :rules="rules.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="categoryEntries.amount" type="number"
                  prepend-icon="monetization_on"
                  placeholder="Amount"
                  :error-messages='errorMessage'
                  :rules="rules.amount"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="clear()">Cancel</v-btn>
            <v-btn flat @click="submit()"> Save </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Amount from './Amount'
import Buget from './functions.js'

export default {
  data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPexrPage: 4
    },
    amounToSpend: Buget.getbuget(),
    dialog: false,
    categoryEntries: {
      name: '',
      amount: ''
    },
    rules: {
      name: [v => !!v || 'The input is required'],
      amount: [v => !!v || 'The input is required']
    },
    categories: [],
    pageTrail: Buget.getTrail(),
    itemsCategory: [],
    isAmount: false,
    errorMessage: '',
    isValidEntry: false,
    valid: false
  }),


  watch: {
    categories: function (amount) {
      this.clear()
    },
    'categoryEntries.amount': function (val) {
      if (val > this.amounToSpend) {
        this.errorMessage = 'Entered amount exceed the current set amount'
        this.isValidEntry = false
      } else {
        this.errorMessage = ''
        this.isValidEntry = true
      }
    }
  },
  components: {
    Amount
  },
  methods: {
    submit () {
      const validate = this.$refs.form.validate()
      if (validate)
       if(this.isValidEntry)
        this.categories.push({name: this.categoryEntries.name, amount: this.categoryEntries.amount})
        this.amounToSpend -= this.categoryEntries.amount
    },
    clear () {
      this.$refs.form.reset()
      this.dialog = false
    },
    newAmount (value, ID) {
      this.categories[ID].amount = value
      this.amounToSpend -= value
    },
    showAddNewCategory () {
      this.$refs.form.reset()
      this.dialog = !this.dialog
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
