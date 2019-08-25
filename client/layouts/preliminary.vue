<template>
  <v-app>
    <v-app-bar app flat>
      <v-toolbar-title>Page title</v-toolbar-title>
      <v-spacer/>
      <v-speed-dial
        v-model="changeLocale"
        direction="left"
        transition="slide-x-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="changeLocale" icon>
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
        <v-divider vertical/>
      </v-speed-dial>
    </v-app-bar>

    <v-content>
      <v-container fluid class="fill-height">
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PreliminaryLayout extends Vue {
  changeLocale: boolean = false;

  availableLocales () {
    return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
  }
}
</script>
