<template>
  <v-app class="app">
    <v-app-bar app flat class="pt-6 mt-sm-12 mb-3 app-bar">
      <v-row justify="center">
        <v-col cols="10">
          <v-row justify="space-between ">
            <v-col cols="auto">
              <v-toolbar-title>
                <p
                  class="text-uppercase mb-0 font-weight-black"
                  :style="getPageTitleFont"
                >
                  {{ $t('home.title') }}
                </p>
                <p class="grey--text mb-0 font-weight-bold" :style="getPageSubTitleFont">
                  {{ $t('home.preTitle') }}
                </p>
              </v-toolbar-title>
            </v-col>
            <v-col cols="auto" class="d-none d-sm-flex align-center">
              <v-speed-dial
                v-model="changeLocale"
                direction="left"
                transition="slide-x-reverse-transition"
              >
                <template v-slot:activator color="red">
                  <v-btn v-model="changeLocale" icon class="pa-0 font-weight-bold locale-button" color="#4A4A4A">
                    <v-icon v-if="changeLocale" class="font-weight-thin" size="40">mdi-close</v-icon>
                    <span v-else>{{ $i18n.locale }}</span>
                  </v-btn>
                </template>
                  <v-btn
                    v-for="(locale, i) in availableLocales()"
                    v-text="locale.code"
                    :key="i"
                    :to="switchLocalePath(locale.code)"
                    icon
                    class="font-weight-bold pa-0"
                    size="45"
                    color="#4A4A4A"

                  />
              </v-speed-dial>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content class="pt-2">
      <v-container fluid class="fill-height pa-0">
        <nuxt />
      </v-container>
    </v-content>
    <v-btn
      class="d-flex d-sm-none mobile-icon burger-icon"
      @click="toggleVisibilityLocales"
      icon
    >
      <v-icon size="30" color="black">mdi-menu</v-icon>
    </v-btn>

    <v-bottom-sheet v-model="isShowMobileLocales">
      <div class="relative">
        <v-btn
          class="mobile-icon close-icon"
          @click="toggleVisibilityLocales"
          icon
          large
        >
          <v-icon size="50" color="black">
            mdi-close
          </v-icon>
        </v-btn>
        <div class="half-round" />
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
              <span class="locale">{{ locale.code }}</span>
            </v-btn>
          </div>
        </div>
      </div>
    </v-bottom-sheet>
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

  get getPageTitleFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 20,
        sm: 20,
        md: 25,
        lg: 30,
      })}px`,
    };
  }
  get getPageSubTitleFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 16,
        sm: 20,
        md: 22,
        lg: 28,
      })}px`,
    };
  }

  toggleVisibilityLocales() {
    this.isShowMobileLocales = !this.isShowMobileLocales;
  }
}
</script>

<style lang="sass">
.app .v-application--wrap
  flex-direction: row
  flex-wrap: wrap
  align-items: flex-start

  .app-bar
    position: sticky
    height: 90px
    background: rgba(250, 250, 250, .85)
    .v-toolbar__content
      width: 100vw
      padding-bottom: 0

.mobile-icon
  background: white

.burger-icon
  position: fixed
  left: calc(50vw - 18px)
  bottom: 2vh

.locale-button
  width: 55px
  height: 55px
  border-radius: 50%
  border: 2px solid #4A4A4A

.theme--light.v-btn::before
  opacity: 0 !important
   border-radius: 50%
  border: 2px solid #4A4A4A

.theme--light.v-btn:hover::before
  opacity: 0.18 !important
   border-radius: 50%
  border: 2px solid #4A4A4A

.close-icon
  z-index: 20
  position: absolute
  left: calc(50vw - 18px)
  top: -18px
.relative
  position: relative

.half-round
  width: 100%
  height: 30px
  background: white
  clip-path: ellipse(50% 100% at 50% 100%)
  margin-bottom: -1px

.locale
  font-size: 25px

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

.lang-up
  position: absolute
  top: -15px
</style>
