<template>
  <v-app> 
    <v-app-bar app dark flat color="transparent">     
      <figure class="breakpoint">
        <img class="logo" src="/logo.svg" />
        <figcaption>{{pathName}} </figcaption>
      </figure>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn
          v-on:click="editPath()"
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
  pathName = 'standart' ;
  @Getter('getPageStage') pages;
  @Getter('getPageCover') cover;

  editPath():void{
    setTimeout(() => {
      this.pathName = window.location.pathname
      this.pathName = this.pathName.substring(1)
    }, 500);
   
  }

  mounted(){
    this.editPath()
  }
}
</script>

<style lang="sass">
  .logo 
    width: 85px
    margin-right: 1rem
  .imageCover
    position: fixed !important
    height: 100vh
    width: 100vw
  
  .breakpoint
    display: flex
    flex-direction: row
    align-items: center
    font-size: 1.8rem

</style>
