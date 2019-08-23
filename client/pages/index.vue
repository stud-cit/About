<template>
  <v-row class="carousel">
    <v-col cols="8" offset="1" v-for="(item, i) in items" :key="i">
      <v-img
        :src="item.img"
        :to="item.to"
        height="60vh"
      >
        <v-card-title class="title white--text fill-height">
          <v-row class="fill-height" justify="center">
            <div class="display-3 align-self-center">
              {{ item.title }}
            </div>
          </v-row>
        </v-card-title>
      </v-img>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageIndex extends Vue {
  items = new Array(5).fill().map((value, i) => ({
    title: 'Rock',
    to: i,
    img: `https://picsum.photos/id/${i}/720`,
  }))
}
</script>

<style media="screen">
.carousel {
  overflow: auto;
  flex-wrap: unset !important;
}
</style>
