<template>
  <v-container class="wrapper">
    <ScrollBar />  
    <v-column>
        <section class="question">
            <h1>{{weOffers.h1}}</h1>
            <h2>{{weOffers.h2}}</h2>
            <div class="navigation">
              <div class="arrow">&#8592;</div>
              <div class="arrow">&#8594;</div>
              <div class="squareOne square"></div>
              <div class="squareTwo square"></div>
              <div class="squareThree square"></div>
            </div>
            <p class="description">{{weOffers.description}}</p>
            <p class="scroll_text">Scroll for more information</p>
          <v-card class="bottom_card">
            <v-card-title class="bottom_card_title">{{weOffers.bottom_title}}</v-card-title>
            <v-card-actions class="bottom_card_action">{{weOffers.bottom_action}}</v-card-actions>
          </v-card>
        </section>
        <section class="representation" v-for="(preview,index) in weOffers.representation" :key="index">
          <v-row align="center" :justify="preview.positionCard">
            <img class="preview_image" src="~/assets/image/weOffer/1.jpg"> 
            <v-card class="preview_card" :class="preview.positionCard">
              <v-card-title class="preview_title">{{preview.title}}</v-card-title>
              <v-card-text>{{preview.text}}</v-card-text>
            </v-card>
          </v-row>
      </section>
    </v-column>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import ScrollBar from '@/components/ScrollBar.vue';

@Component({
  layout: 'immediate',
  head: {
    title: 'Offers',
  },
  components: {
    ScrollBar,
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
    .wrapper
      width: 80%
      color: white

    .question
      position: relative
      height: 100vh
      display: flex
      flex-direction: column
      align-items: flex-start
      justify-content: flex-end
      color: #ffffff
    
    h1,h2
      font-size: 4rem
      color: white
    
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
    
    .description
      font-size: 2rem

    .scroll_text
      opacity: 0.5
      font-size: 1.3rem  

    .bottom_card
      color: black
      font-size: 2rem
      font-weight: 100
      text-align: center
      display: flex
      justify-content: center
      flex-direction: column
      width: 25rem
      padding-top: 1rem
      padding-bottom: 1rem
      justify-self: flex-end
      align-self: flex-end
      margin-bottom: 1rem   

    .bottom_card_title
      text-align: center
      justify-content: center
      font-size: 1.3rem  

    .bottom_card_action
      text-decoration: underline
      font-weight: 100
    
    .representation
      height: 100vh
      display: flex
      justify-content: flex-start
      flex-direction: row
      position: relative
      align-items: center
      overflow: hidden
     
    .preview_card
      width: 35rem
      padding: 3rem 2rem
      position: absolute
      transform: translateY(50%)
    
    .start
      right: 0
    
    .end
       height: 100%
       left: 0

    .preview_title
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
