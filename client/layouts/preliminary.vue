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
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PreliminaryLayout extends Vue {
  changeLocale: boolean = false;

  availableLocales() {
    return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
  }
}
</script>

<style lang="sass">
  .app-bar .v-toolbar__content
    width: 100%
</style>


