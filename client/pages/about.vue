<template>
  <v-container class="wrapper">
    <v-window v-model="model" continuous dark>
      <v-window-item>
        <v-row align="stretch">
          <v-col md="8" class="font-weight-bold white--text">
            <v-row class="display-2 text-uppercase">
              {{ about.previewTitle }}
            </v-row>
            <div class="navigation">
              <div class="arrow">&#8592;</div>
              <div class="arrow">&#8594;</div>
              <div class="squareOne square"></div>
              <div class="squareTwo square"></div>
              <div class="squareThree square"></div>
            </div>
            <v-row class="title mt-5">
              {{ about.previewSubtitle }}
            </v-row>
            <div class="body-2">
              Scroll for more information
            </div>
          </v-col>
        </v-row>
         <v-row class="speed"><p>speed,quality , vodka</p></v-row>
      </v-window-item>
     
      <v-window-item v-for="(slide, index) in about.slides" :key="index">
        <v-col md="8">
          <v-row class="font-weight-bold ma-2 white--text titleSize">
            {{ slide.title }} 
          </v-row>
          <div class="textArea">{{slide.content}}
           <!-- / <div class="textAreaBack"></div> -->
          </div>
        </v-col>  
         <v-row class="speed"><p>speed,quality , vodka</p></v-row>
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
          auto-grow
        />
      </v-col>
      <v-row>sadasjkdhasjkdkjadskjahdsaskjdhk</v-row>
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

<style lang="sass">
  .wrapper
    margin-top: -5%

  .speed
    position: absolute
    width: 100vw
    height: 100vh
    display: flex
    justify-content: flex-end
    top: 0
    font-size: 3rem
    color: white
    align-items: center
    overflow: hidden
    margin-top: -15%
    
  .speed p
    transform: rotate(-90deg)

  .title
    font-size: 3rem

  .body-2
    opacity: .5

  .navigation
    display: flex
    flex-direction: row
    color: white
    margin: 5rem 0 

  .navigation div
    margin-right: .8rem
  
  .arrow
    font-size: 1.8rem
    text-align: center
  
  .square
    height: 2.5rem
    width: 2.5rem
    border-radius: 20%
    border: 2px solid white
  
  .squareOne
    clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)
      
  .squareThree
    clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%)

  .textArea
    border: .3rem white solid  
    border-right:  1rem white solid
    padding: 3rem 2rem
    text-align: left
    font-size: 1.5rem
    color: white
    font-weight: 200
    position: relative
    

  // .textAreaBack
  //   position: absolute
  //   background-color: grey
  //   opacity: .3
  //   height: 100%
  //   width: 100%

  .titleSize  
    font-size: 3rem
</style>
