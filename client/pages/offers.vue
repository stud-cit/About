<template>
<<<<<<< HEAD
  <v-container class="wrapper" >  
    <v-column v-for="offer in $store.state.weOffers"
        :key="offer">
        <section class="question">
     
            <h1>{{offer.h1}}</h1>
            <h2>{{offer.h2}}</h2>
            <div class="navigation">
              <div class="arrow">&#8592;</div>
              <div class="arrow">&#8594;</div>
              <div class="squareOne square"></div>
              <div class="squareTwo square"></div>
              <div class="squareThree square"></div>
            </div>
            <p class="description">{{offer.description}}</p>
            <p class="scroll_text">Scroll for more information</p>
         
          <v-card class="bottom_card">
            <v-card-title class="bottom_card_title">{{offer.bottom_title}}</v-card-title>
            <v-card-action class="bottom_card_action">{{offer.bottom_action}}</v-card-action>
          </v-card>
        </section>
        <section class="representation" v-for="preview in offer.representation" :key="preview">
          <v-row  align="center" :justify="preview.positionCard">
            <img  class="preview_image" src="~/assets/image/weOffer/1.jpg"> 
            <v-card class="preview_card" :class="preview.positionCard">
              <v-card-title class="preview_title">{{preview.title}} </v-card-title>
              <v-card-text >{{preview.text}}</v-card-text>
            </v-card>
          </v-row>
      </section>
      <footer  v-for="info in offer.footer" :key="info">
        
      </footer>
    </v-column>
  </v-container>
=======
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-end fill-height">
        {{ $route.name }}
      </v-card-title>
    </v-img>

    <v-card-text>
      <span>Number 10</span>
      <span class="text--primary">
        <span>{{ $t('welcome') }}</span>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="orange">Share</v-btn>
      <v-btn text color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
>>>>>>> 0b82bf0b18b537c9e021ad7aa331a98ff865deec
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

@Component({
  layout: 'immediate',
  head: {
    title: 'Offers',
  },
})

export default class OffersPage extends Vue {
  @Mutation('changePageCover') changePageCover;

  created() {
    this.changePageCover('offers');
  }
}
</script>

<style  >

    section{
       color:white;
     
    }

    .wrapper{
      width: 80%;
    }

    .question{
      position: relative;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
    }
    h1,h2{
   
      font-size: 4rem;
    }
    .navigation{
      display: flex;
      flex-direction: row;
      color: white;
      margin: 5rem 0 ;
    }

    .navigation div{
      margin-right: 1.5rem;
    }

    .arrow{
      font-size: 1.8rem;
      text-align: center;
    }

    .square{
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 20%;
      border: 2px solid white;
    }
    .squareOne{
      border-left: none;
    }
    
    .squareThree{
      border-right: none;
    }

    .description{
      font-size: 2rem;
    }

    .scroll_text{
      opacity: 0.5;
      font-size: 1.3rem;
    }

    .bottom_card{
      color: black;
      font-size: 2rem;
      font-weight: 100;
      text-align: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 25rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      justify-self: flex-end;
      align-self: flex-end;
      margin-bottom: 1rem;
    }

    .bottom_card_title{
      text-align: center;
      justify-content: center;
      font-size: 1.3rem;
    }

    .bottom_card_action{
      text-decoration: underline;
      font-weight: 100;
    }

    .representation{
      height: 100vh;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      position: relative;
      align-items: center;
      overflow: hidden;
    } 

    .preview_card{
      width: 35rem;
      padding: 3rem 2rem;
      position: absolute;
      transform: translateY(50%);
    }

    .start{
      right: 0;
    }

    .end{
       height: 100%;
       left: 0;
    }

    .preview_title{
      margin-bottom: 2rem;
    }

    footer{
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      color: black;
      justify-content: flex-end;
    }

    .adress{
      background-color: white;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .adress img{
      height: 10rem;
      width: 10rem
    }

    .line{
      border: 3px solid black;
      width: 50%;
    }
</style>
