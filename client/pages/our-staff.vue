<template>
  <v-container fluid>
    <v-row>
      <v-card class="mx-auto" max-width="400" v-for="person in $store.state.ourStaff" :key="person.id">
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >>
        </v-img>

        <v-card-actions>
          <v-btn text color="orange">Share</v-btn>
          <v-btn text color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'immediate',
  head: {
    title: 'Our staff'
  },
})

  
export default class OurStaffPage extends Vue {}
</script>
