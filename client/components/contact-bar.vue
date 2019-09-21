<template>
  <v-container fluid class="contact-bar flex row align-center justify-space-around" :class="{active: isActive}">
      <div class="address">
        <section class="flex row pl-10 ">
          <v-row >{{contacts.email}}</v-row>
          <v-row>{{contacts.phone}}</v-row>
        </section>
        <div class="line"></div>
        <v-row class="pl-10">{{contacts.street}}</v-row>
        <v-row class="pl-10">{{contacts.office}}</v-row>
      </div>
      <div class="map"></div>

      <!-- <span @click="onCloseContactBar">X</span> -->
  </v-container>
</template>


<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import { Getter, Mutation } from 'vuex-class';

  @Component({})
  export default class ContactBar extends Vue {
    @Getter('getContactBarVisibility') isActive;
    @Getter('getContactStage') contacts;
    @Mutation('changeContactBar') changeContactBar;

    onCloseContactBar() {
      this.changeContactBar(false);
    }
  }
</script>


<style lang="sass"> 
  .contact-bar
    width: 100%
    
    position: fixed
    bottom: -8rem
    background: white
    opacity: 0
    transition: opacity, bottom .5s ease
    z-index: 10

  .active
    opacity: 1
    bottom: 0

  .address
    width: 50%
    display: flex
    flex-direction: column
    color: black
    margin: 0 3rem
    padding: 1rem
    font-size: 1.4rem

  .line
     width: 100%
     background: black
     height: .2rem 

  .map
    height: 10rem
    width: 10rem
    background: grey   
</style>