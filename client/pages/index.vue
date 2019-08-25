<template>
  <v-row class="carousel">
    <v-col cols="8" offset="1" v-for="(page, i) in pages" :key="i">
      <v-card :href="page.to" :link="true">
        <v-img :src="page.img" :lazy-src="page.lazyImg" height="60vh">
          <v-card-title class="title white--text fill-height">
            <v-row class="fill-height" justify="center">
              <span class="display-3 align-self-center" v-text="page.title"/>
            </v-row>
          </v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  layout: 'preliminary',
  head: {
    title: 'Home'
  }
})
export default class HomePage extends Vue {
  @Getter('getPageStage') pages;
}
</script>

<style media="screen">
.carousel {
  overflow: auto;
  flex-wrap: unset !important;
}
</style>
