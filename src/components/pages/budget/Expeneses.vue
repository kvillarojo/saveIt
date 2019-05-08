<template>
  <div>
    <v-list-tile class="fms-btn">
      <v-list-tile-content @click.stop="showModal()"> Amount : </v-list-tile-content>
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
                placeholder="Set Amount"
                v-model="newAmount"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat  @click="getAmount()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['amount', "catID"],
  data: () => ({
    dialog: false,
    newAmount: ''
  }),
  watch: {
    amount: function(newVal, oldVal) { //later can be used for amount limit
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      // this.$emit('setNewAmount', newVal, this.catID)
    }
  },
  computed: {
    amountVal: function(val){
      return val.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    getAmount (event) {
      this.$emit('setNewAmount', this.newAmount, this.catID)
      this.dialog = false
    },
    showModal(){
      this.dialog = !this.dialog
      this.newAmount = this.amount
    }
  },
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
