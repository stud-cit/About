<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10">
      <PreviewPage :title="portfolio.previewTitle" :subtitle="portfolio.previewSubtitle" :description="portfolio.previewDescription" />
      </v-col>
    </v-row>
    <v-col class="pa-0">
      <v-row v-for="(project, i) in projects" :key="i" align="center">
        <v-parallax :src="project.cover" class="fullscreen pa-0">
          <v-row justify="center" align="center" class="section">
            <v-col md="5">
              <v-card dark flat color="transparent">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="project.title"
                      class="display-3 mb-5"
                    />
                    <v-divider />
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col md="5" class="d-flex justify-end">
              <v-btn :to="project.link" large dark text>
                <span class="headline">View project</span> 
                <v-icon class="ml-6 pa-3 arrow-right" color="white" large>
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
  @Mutation('changePageCover') changePageCover;

  created() {
    this.changePageCover('portfolio');
  }
}
</script>

<style lang="sass">
.fullscreen
  height: 100vh !important
  width: 101vw !important
  .section
    background: rgba(0,0,0,0.7)
.arrow-right
  // width: 50px
  // height: 50px
  border-radius: 50%
  color: white
  border: 1px solid white
</style>
