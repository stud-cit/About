<template>
  <v-container fluid class="contact-bar pa-1 pa-sm-3" v-if="isActive">
    <v-row justify="end" class="pr-2">
        <v-icon class="close-icon" size="30" color="black">
          mdi-close
        </v-icon>
    </v-row>
    <v-row justify="space-around" align="center">
      <v-row class="underline mb-4 d-flex d-sm-none" justify="space-around">
          <v-col class="subtitle-1 font-weight-bold" cols="auto">{{contacts.email}}</v-col>
          <v-col class="subtitle-1 font-weight-bold" cols="auto">{{contacts.phone}}</v-col>
      </v-row>
      <v-col cols="6" sm="9">
        <v-row class="underline mb-4 d-none d-sm-flex" justify="space-between">
            <v-col class="title font-weight-bold" cols="auto">{{contacts.email}}</v-col>
            <v-col class="title font-weight-bold" cols="auto">{{contacts.phone}}</v-col>
        </v-row>
        <v-col
          cols="12"
          :class="$vuetify.breakpoint.mdAndUp ? 'healine' : 'subtitle-1'"
          class="font-weight-bold px-0 py-0 py-sm-2"
        >
          {{contacts.street}}
        </v-col>
        <v-col
          cols="12"
          :class="$vuetify.breakpoint.mdAndUp ? 'healine' : 'subtitle-1'"
          class="font-weight-bold px-0 py-0 py-sm-2"
        >
          {{contacts.office}}
        </v-col>
      </v-col>
      <v-col cols="6" sm="2">
        <div class="map"></div>
      </v-col>
    </v-row>
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
    position: fixed
    bottom: 0
    background: white
    z-index: 15


    .close-icon
      position: static

  .underline
    border-bottom: 3px solid black

  .map
    background: gray
    height: 100px

  .relative
    position: relative
</style>