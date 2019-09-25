<template>
  <v-app> 
    <v-app-bar id="header" color="transparent" app dark flat>   
      <figure class="breakpoint">
        <img class="logo" src="/logo.svg" />
        <figcaption>Student centr of Information Technology</figcaption>
      </figure>
      <v-spacer/>
      <v-toolbar-items>
        <div class="d-none d-md-flex nav-links">
          <v-btn
            v-for="(page, index) in pages"
            :key="index"
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
        </div>
                  
        <v-btn
          class="d-flex d-md-none"
          @click="toggleVisibilityMobileMenu"
          icon
        >
          <v-icon size="25">mdi-menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <p v-show="$vuetify.breakpoint.smAndDown">02/04</p>

    <v-img :src="this.getDynamicAssets(cover)" class="imageCover" />

    <v-content class="pt-0">
      <v-container fluid class="fill-height pa-0">
        <nuxt/>
        <contact-bar />
      </v-container>
    </v-content>

    <v-dialog
      v-model="isShowMobileMenu"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-btn 
        @click="toggleVisibilityMobileMenu"
        icon
        large
        fixed
        right
      >
        <v-icon size="30" color="black">
          mdi-close
        </v-icon>
      </v-btn>
      <v-list id="pages-list-container">
        <v-list-item-group class="pages-list">
          <v-list-item
            v-for="(page, index) in pages"
            class="px-0"
            :key="index"
          >
            <v-btn 
              class="text-center display-2 page-link"
              exact-active-class="page-link-active"
              :to="page.to" 
              exact
              nuxt
            >
              <span class="page-link-title">{{page.title}}</span>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-dialog>
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

  isShowMobileMenu: boolean = false;

  toggleVisibilityMobileMenu() {
    this.isShowMobileMenu = !this.isShowMobileMenu;
  }
}
</script>

<style lang="sass">
  #header
    z-index: 30
  .logo 
    width: 85px
    margin-right: 1rem

  .nav-links
    align-items: center
  #pages-list-container
    height: 100vh
    display: flex
    align-items: flex-end

    .pages-list
      width: 100vh
      height: 90vh
      display: flex
      flex-direction: column
      justify-content: space-between
    
    .page-link
      width: 100%
      height: 100%
      background: white
      color: white
      box-shadow: none

      .page-link-title
        color: black

    .page-link-active .page-link-title
      border-bottom: 2px solid black

    
  .number
    color: white
    position: absolute
    margin: 5vh 2vh
    z-index: 5
    font-size:2rem

  .imageCover
    position: fixed !important
    height: 100vh
    width: 100vw
  
  .breakpoint
    display: flex
    flex-direction: row
    align-items: center
    font-size: 1.8rem

    figcaption
      width: 50%
      font-size: 1rem
</style>
