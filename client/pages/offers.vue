<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <PreviewPage :title="weOffers.previewTitle" :subtitle="weOffers.previewSubtitle" :description="weOffers.previewDescription" />
        <ScrollBar/>  
        <v-row justify="center">
            <section class="representation" v-for="(preview,index) in weOffers.representation" :key="index">
              <v-row align="center" :justify="preview.positionCard">
                <img class="preview-image" src="~/assets/images/weOffer/1.jpg"> 
                <v-card class="preview-card" :class="preview.positionCard">
                  <v-card-title class="preview-title">{{preview.title}}</v-card-title>
                  <v-card-text>{{preview.text}}</v-card-text>
                </v-card>
              </v-row>
          </section>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import ScrollBar from '@/components/scroll-bar.vue';
import PreviewPage from '@/components/preview-page.vue';

@Component({
  layout: 'immediate',
  head: {
    title: 'Offers',
  
  },
  components: {
    ScrollBar,
    PreviewPage,
  },
  
})

export default class OffersPage extends Vue {
  @Getter('getOffersStage') weOffers;
  @Mutation('changePageCover') changePageCover;

  created() {
    this.changePageCover('offers');
  }
}
</script>

<style lang="sass"> 
  .representation
    height: 100vh
    display: flex
    justify-content: flex-start
    flex-direction: row
    position: relative
    align-items: center
    overflow: hidden
    
  .preview-card
    width: 35rem
    padding: 3rem 2rem
    position: absolute
    transform: translateY(50%)
  
  .start
    right: 0
  
  .end
      height: 100%
      left: 0

  .preview-title
    margin-bottom: 2rem

  .adress
    background-color: white
    width: 100%
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center

  .adress img
    height: 10rem
    width: 10rem
  

  .line
    border: 3px solid black
    width: 50%
    
</style>
