<template>
  <v-row class="carousel">
    <v-col cols="8" offset="1" v-for="(page, i) in pages" :key="i">
      <v-card :href="page.to" :link="true">
        <v-img
          :src="page.img"
          :gradient="imagePageGradient"
          :lazy-src="page.lazyImg"
          height="60vh"
        >
          <v-card-title class="title white--text fill-height">
            <v-row justify="center" align="center" class="fill-height" >
              <span class="headline font-weight-bold font-italic px-4">
                0{{ ++i }}
              </span>
              <span class="display-3 font-weight-bold">
                {{ page.title }}
              </span>
            </v-row>
          </v-card-title>
          <div class="fill-height bottom-gradient"></div>
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

  imagePageGradient: string =
    "to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)";
}
</script>

<style media="screen">
.carousel {
  overflow: auto;
  flex-wrap: unset !important;
}
</style>
