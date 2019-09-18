<template>
  <v-container>
    <v-window v-model="model" continuous dark>
      <v-window-item>
        <v-row align="stretch">
          <v-col md="8" class="font-weight-bold white--text">
            <v-row class="display-2 text-uppercase">
              {{ about.previewTitle }}
            </v-row>
            <v-row class="title mt-5">
              {{ about.previewSubtitle }}
            </v-row>
            <v-row class="body-2">
              Scroll for more information
            </v-row>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item v-for="(slide, index) in about.slides" :key="index">
        <v-col md="8">
          <v-row class="font-weight-bold ma-2 white--text">
            {{ slide.title }}
          </v-row>
          <v-textarea
            outlined
            disabled
            auto-grow
            :value="slide.content"
          />
        </v-col>  
      </v-window-item>
    </v-window>

    <v-footer absolute color="transparent">
      <v-col md="8">
        <v-slider
          v-model="model"
          :max="about.slides.length + 1"
          step="1"
          ticks="always"
          tick-size="4"
          dark
        />
      </v-col>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

@Component({
  layout: 'immediate',
  head: {
    title: 'About us',
  },
})
export default class AboutPage extends Vue {
  @Getter('getAboutStage') about;
  @Mutation('changePageCover') changePageCover;
  model: number = 0;

  created() {
    this.changePageCover('about');
  }
}
</script>
