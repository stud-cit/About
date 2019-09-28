<template>
  <v-app> 
    <v-app-bar id="header" color="transparent" app dark flat>   
      <figure class="breakpoint">
        <img class="logo" src="/StudCIT_LogoText.svg" />
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
            <span
              class="capitalize"
              :class="$vuetify.breakpoint.lgAndUp ? 'nav-link-desktop' : 'nav-link'"
            >
              {{ page.title }}
            </span>
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
          <v-icon size="50">mdi-menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <p class="page-info">
      <span :style="getPageIndexFont">{{pageIndex}}</span>
      <span :style="getTotalPagesFont"> / 4</span>
    </p>

    <v-img :src="getDynamicAssets(cover)" class="imageCover" />

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
              @click="toggleVisibilityMobileMenu()"
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
  @Getter('getPageByRoute') getPageByRoute;
  @Getter('getPageStage') pages;
  @Getter('getPageCover') cover;

  get pageIndex() {
    const route = this.$route.path.replace('/', '');
    return this.getPageByRoute(route);
  }


  get getPageIndexFont() {
    return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 25, sm: 40, md: 40, lg: 45})}px`};
  }

  get getTotalPagesFont() {
    return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 13, sm: 20, md: 20, lg: 25})}px`};
  }


  isShowMobileMenu: boolean = false;

  toggleVisibilityMobileMenu() {
    this.isShowMobileMenu = !this.isShowMobileMenu;
  }
}
</script>

<style lang="sass">
  #header
    z-index: 30

  .pad-0
    padding-top: 0 !important

  .logo 
    width: 80%
    margin: 2rem 2rem 1rem 0rem

  .nav-links
    align-items: center

  .nav-link
    font-size: 15px

  .nav-link-desktop
    font-size: 25px

  .page-info
    position: fixed
    top: 8vh
    left: 5%
    z-index: 5
    color: white

  #pages-list-container
    height: 100vh
    display: flex
    align-items: center

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
        font-size: 35px
        color: black

    .page-link-active .page-link-title
      border-bottom: 2px solid black

  .imageCover
    position: fixed !important
    height: 100vh
    width: 100vw
  
  .breakpoint
    display: flex
    flex-direction: row
    align-items: center
  .capitalize
    text-transform: capitalize
</style>
