<template>
  <v-app>
    <v-app-bar app flat class="px-10 ptop" color="transparent">
      <v-toolbar-title>
        <p class="text-uppercase mb-0 choose font-weight-bold">
          Choose What you are interested
        </p>
        <p class="grey--text mb-0 drag">
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

    <v-content>
      <v-container fluid class="fill-height pa-0  swiperBlock" :class="{moveSwiper:moveSwiper}" >
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PreliminaryLayout extends Vue {
  changeLocale: boolean = false;
  moveSwiper: boolean = false;

  availableLocales() {
    return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
  }

  goSwiper(){
    setTimeout(() => {
       this.moveSwiper = true;
    }, 5000);
  }

  mounted(){
    this.goSwiper();
  }
}
</script>

<style lang="sass">
  .ptop
    padding-top: 5rem

  .swiperBlock
    transform: translateX(300%)

  .moveSwiper
      transform: translateX(0%)
      transition: 2s

  .choose
    font-size: 1.8rem

  .drag
    font-size: 1.5rem  
    font-weight: lighter

  .ptop
    padding-top: 4rem  
</style>


