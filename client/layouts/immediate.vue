<template>
  <v-app>
    <v-app-bar fixed elevate-on-scroll color="transparent">
      <v-toolbar-title>Logotype</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn
          v-for="(page, i) in pages" :key="i"
          :to="page.to" exact text
        >
          <span>{{ page.title }}</span>
        </v-btn>
        <v-btn icon to="/">
          <v-icon>mdi-fullscreen-exit</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class'

@Component
export default class ImmediatetLayout extends Vue {
  @Getter('getPageStage') pages;
}
</script>
