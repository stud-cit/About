<template>
  <v-app>
    <v-app-bar app flat class="app-bar px-10 pt-6 d-none d-sm-flex" color="transparent">
      <v-toolbar-title>
        <p 
          class="text-uppercase mb-0 font-weight-bold"
          :class="$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1'"
        >
          Choose What you are interested
        </p>
        <p 
          class="grey--text mb-0"
          :class="$vuetify.breakpoint.smAndDown ? 'title' : 'headline'"
        >
          Drag or scroll to move block
        </p>
      </v-toolbar-title>
      <v-spacer />
      <v-speed-dial
        v-model="changeLocale"
        direction="left"
        transition="slide-x-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="changeLocale" outlined icon>
            <v-icon v-if="changeLocale">mdi-close</v-icon>
            <span v-else>{{ $i18n.locale }}</span>
          </v-btn>
        </template>
        <v-btn
          v-for="(locale, i) in availableLocales()"
          v-text="locale.code"
          :key="i"
          :to="switchLocalePath(locale.code)"
          icon
        />
        <v-divider vertical />
      </v-speed-dial>
    </v-app-bar>

    <v-content class="pt-2 pt-sm-12">
      <v-container fluid class="fill-height pa-0">
        <nuxt />
      </v-container>
    </v-content>
    <v-btn
      class="d-flex d-sm-none mobile-icon burger-icon"
      @click="toggleVisibilityLocales"
      icon
    >
      <v-icon size="25" color="black">mdi-menu</v-icon>
    </v-btn>
    <v-row class="ma-0 mobile-locales-bar"
      v-if="isShowMobileLocales"
    >
      <v-btn 
        class="mobile-icon close-icon"
        @click="toggleVisibilityLocales"
        icon
        large
      >
        <v-icon size="30" color="black">
          mdi-close
        </v-icon>
      </v-btn>
      <div class="half-round"/>
      <div class="locales-container">
        <div class="locales-list">
          <v-btn
            v-for="(locale, i) in $i18n.locales"
            :key="i"
            :to="switchLocalePath(locale.code)"
            class="locale-btn"
            active-class="active-locale"
            x-large
            icon
          >
            <span class="display-1">{{locale.code}}</span>
          </v-btn>
        </div>
      </div>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PreliminaryLayout extends Vue {
  changeLocale: boolean = false;
  isShowMobileLocales: boolean = false;

  availableLocales() {
    return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
  }

  toggleVisibilityLocales() {
    this.isShowMobileLocales = !this.isShowMobileLocales;
  }
}
</script>

<style lang="sass">
  .app-bar .v-toolbar__content
    width: 100%

  .mobile-icon
    background: white

  .burger-icon
    position: fixed
    left: calc(50vw - 18px)
    bottom: 2vh

  .close-icon
    z-index: 20
    position: absolute
    left: calc(50vw - 18px)
    top: -18px
    
  .mobile-locales-bar
    position: fixed
    width: 100%
    bottom: 0

    .half-round
      width: 100%
      height: 30px
      background: white
      clip-path: ellipse(50% 100% at 50% 100%)

    .locales-container
      width: 100%
      height: 10vh
      display: flex
      justify-content: center
      align-items: center
      background: white

    .locales-list
      width: 60%
      display: flex
      justify-content: space-between
      color: white

      .locale-btn
        color: white

      span
        color: black
        font-weight: normal

      .active-locale span
        font-weight: bold
</style>


