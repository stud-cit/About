<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10">
      <PreviewPage :title="portfolio.previewTitle" :subtitle="portfolio.previewSubtitle" :description="portfolio.previewDescription" />
      </v-col>
    </v-row>
    <v-col class="pa-0">
      <v-row v-for="(project, i) in projects" :key="i" align="center">
        <v-parallax :src="getDynamicAssets(project.cover)" class="fullscreen pa-0">
          <v-row justify="center" align="center" class="section">
            <v-col lg="7" md="7" sm="12">
              <v-card dark flat color="transparent">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="project.title"
                      class="ma-5 display-3 text-underline text-wrap"
                      :class="!isMdAndUp && 'text-center'"
                    />
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col lg="3" md="4" sm="12" class="ma-3 d-flex" :class="isMdAndUp ? 'justify-end' : 'justify-center'">
              <v-btn :to="project.link" large dark text>
                <span class="headline d-none d-md-block">{{$t('portfolio.link')}}</span> 
                <v-icon class="arrow-right" color="white" :class="isMdAndUp ? 'display-3' : 'display-4'">
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-parallax>
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import PreviewPage from '@/components/preview-page.vue';

@Component({
  layout: 'immediate',
  head: {
    title: 'Portfolio',
  },
   components: {
    PreviewPage,
  },
})
export default class PortfolioPage extends Vue {
  @Getter('getProjectsStage') projects;
  @Getter('getPortfolioStage') portfolio;
  @Mutation('changePageId') changePageId;


  get isMdAndUp () {
    return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
  }
  created() {
    this.changePageId(4);
  }
}
</script>

<style lang="sass">
.fullscreen
  height: 90vh !important
  width: 101vw !important
  .section
    background: rgba(0,0,0,0.7)

.arrow-right
  border-radius: 50%
  color: white
  border: 1px solid white
  margin: 10px

.text-underline
  text-decoration: underline
</style>
