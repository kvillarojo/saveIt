<template>
  <div>
    <v-list-tile class="fms-btn">
      <v-list-tile-content @click.stop="showAmoutUpdate()"> Amount : </v-list-tile-content>
      <v-list-tile-content class="align-end" > ₱ {{ amountVal }}</v-list-tile-content>
    </v-list-tile>
    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-card-title class="blue  py-4 title fms-amount">
          <v-icon> update </v-icon> Amount
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                type="number"
                prepend-icon="attach_money"
                :error-messages='errorMessage'
                v-model="newAmount"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="getAmount()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Buget from './functions.js'
export default {
  props: ['amount', 'catID'],
  data: () => ({
    dialog: false,
    newAmount: '',
    errorMessage: '',
    isValidEntry: true
  }),
  watch: {
    newAmount: function (newVal, oldVal) {
      console.log(newVal + ' ' + oldVal)
      if (val > amount)
        errorMessage = 'Amount exeed the current amout expected.'
    }
  },
  computed: {
    amountVal: function (val) {
      return Buget.setValWithCommas(val)
    }
  },
  methods: {
    getAmount (event) {
      console.log(this.isValidEntry)
      if (this.isValidEntry)
        this.$emit('setNewAmount', this.newAmount, this.catID)
        this.dialog = false
    },
    showAmoutUpdate () {
      this.dialog = !this.dialog
      this.newAmount = this.amount
    }
  }
}
</script>
<style>
  .v-card__title.blue.py-4.title.fms-amount {
    padding-left: 23px;
  }
  .fms-btn{
    cursor: pointer;
  }
</style>
