<template>
  <v-list-tile>
    <v-list-tile-content @click="showModal()"> Amount : </v-list-tile-content>
    <v-list-tile-content class="align-end" > ₱ {{ amount }}</v-list-tile-content>
  </v-list-tile>


</template>
<script>
export default {
  props: ['amount'],
  methods : {
    showModal () {
      alert('wew')
    }
  }
}
</script>
