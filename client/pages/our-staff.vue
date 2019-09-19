<template>
  <v-container class="wrapper">
    <section class="question">
            <h1>{{ourStaff.previewTitle}}</h1>
            <div class="navigation">
              <div class="arrow">&#8592;</div>
              <div class="arrow">&#8594;</div>
              <div class="squareOne square"></div>
              <div class="squareTwo square"></div>
              <div class="squareThree square"></div>
            </div>
            <p class="description">{{ourStaff.previewDescription}}</p>
            <p class="scroll-text">Scroll for more information</p>
          <v-card class="bottom-card" @click="showContactBar">
            <v-card-title class="bottom-card-title">Do you have some questions?</v-card-title>
            <v-card-actions class="bottom-card-action">USE OUR CONTACTS</v-card-actions>
          </v-card>
        </section>
    <ScrollBar />
    <v-row justify="space-around">
      <v-col v-for="(person, i) in ourStaff.representation" :key="i" lg="4" sm="6" xs="12">
        <v-card class="card-img mx-auto" max-width="400">
          <v-img
            class="white--text"
            height="250px"
            :src="person.img_src"
          >
          </v-img>
        </v-card>
        <div class="card-addition">
          <div class="employee-name">{{ person.name }}</div>
          <div class="employee-position-short">{{ person.position }}</div>
          <div class="employee-position-full">{{ person.stack }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import ScrollBar from '@/components/scroll-bar.vue';

@Component({
  layout: 'immediate',
  head: {
    title: 'Our staff',
  },
  components: {
    ScrollBar,
  },
})
export default class OurStaffPage extends Vue {
  @Getter('getStaffStage') ourStaff;
  @Mutation('changePageCover') changePageCover;
  @Mutation('changeContactBar') changeContactBar;
  created() {
    this.changePageCover('our-staff');
  }
  showContactBar() {
    this.changeContactBar(true);
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
  
  h1
    font-size: 5rem
    color: white
    width: 85%
  
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

  .scroll-text
    opacity: 0.5
    font-size: 1.3rem  

  .bottom-card
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

  .bottom-card-title
    text-align: center
    justify-content: center
    font-size: 1.3rem  

  .bottom-card-action
    justify-content: center
    text-decoration: underline
    font-weight: 100



.card-addition
  display: flex
  flex-direction: column
  color: #ffffff
  margin-top: 25px

.employee-name
  font-size: 1.5rem
  font-weight: 900
  text-align: center
  margin-bottom: 0

.employee-position-short, .employee-position-full
  font-size: .9rem
  font-weight: 400
  text-align: center

.card-img
  border-radius: 50px
  filter: brightness(35%)
  max-height: 350px
  transition: 1s

.employee-position-full
  display: none

.card-img:hover
  z-index: 10
  transform: scale(1.25)
  filter: brightness(100%)
  transition: 1s
  ~ .card-addition
    .employee-name
      opacity: 0
      transition: 0.5s
    .employee-position-full
      display: block
    .employee-position-short
      display: none
</style>
