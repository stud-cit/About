<template>
<<<<<<< HEAD
  <v-app > 
    <v-app-bar app dark flat color="transparent">
      <v-toolbar-title>Logotype</v-toolbar-title>
      <v-spacer/>
=======
  <v-app>
    <v-app-bar app flat color="transparent">
      <v-toolbar-title class="white px-2">Logotype</v-toolbar-title>
      <v-spacer />
>>>>>>> 0b82bf0b18b537c9e021ad7aa331a98ff865deec
      <v-toolbar-items>
        <v-btn
          v-for="(page, i) in pages"
          :key="i"
          :to="page.to"
          exact
          dark
          text
        >
          <span>{{ page.title }}</span>
        </v-btn>
        <v-btn icon dark to="/">
          <v-icon>mdi-fullscreen-exit</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-img :src="this.getDynamicAssets(cover)" class="imageCover" />

<<<<<<< HEAD
    <v-content class="pt-0 ">
      <v-container  fluid class="fill-height pa-0">
        <nuxt/>
=======
    <v-content>
      <v-container fluid class="fill-height pa-0">
        <nuxt />
>>>>>>> 0b82bf0b18b537c9e021ad7aa331a98ff865deec
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class ImmediatetLayout extends Vue {
  @Getter('getPageStage') pages;
  @Getter('getPageCover') cover;
}
</script>

<style lang="sass">
<<<<<<< HEAD
  .imageCover
    position: fixed !important
    height: 100vh
    width: 100vw

=======
.imageCover
  position: fixed !important
  height: 100vh
  width: 100vw
>>>>>>> 0b82bf0b18b537c9e021ad7aa331a98ff865deec
</style>
