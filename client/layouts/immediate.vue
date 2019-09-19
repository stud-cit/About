<template>
  <v-app> 
    <v-app-bar app dark flat color="transparent">
      <img class="logo" src="/logo.svg" />
      <v-spacer/>
      <v-toolbar-items>
        <v-btn
          v-for="page in pages"
          :key="page.id"
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

    <v-content class="pt-0">
      <v-container fluid class="fill-height pa-0">
        <nuxt/>
        <contact-bar />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import ContactBar from '@/components/contact-bar.vue';

@Component({
  components: {
    'contact-bar': ContactBar,
  }
})
export default class ImmediatetLayout extends Vue {
  @Getter('getPageStage') pages;
  @Getter('getPageCover') cover;
}
</script>

<style lang="sass">
  .logo 
    width: 85px
  .imageCover
    position: fixed !important
    height: 100vh
    width: 100vw

</style>
