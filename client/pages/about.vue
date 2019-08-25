<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-end fill-height">
        {{ $route.name }}
      </v-card-title>
    </v-img>

    <v-card-text>
      <span>Number 10</span><br>
      <span class="text--primary">
        <span>{{ $t('welcome') }}</span>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="orange">Share</v-btn>
      <v-btn text color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'immediate',
  head: {
    title: 'About us'
  }
})
export default class AboutPage extends Vue {}
</script>
