<template>
  <v-container fluid class="contact-bar" :class="{active: isActive}">
      <p>Contact bar</p>
  </v-container>
</template>


<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import { Getter } from 'vuex-class';

  @Component({})
  export default class ContactBar extends Vue {
    @Getter('getContactBarVisibility') isActive;
  }
</script>


<style lang="sass"> 
  .contact-bar
    width: 100%
    height: 80px
    position: fixed
    bottom: -80px
    background: red
    opacity: 0
    transition: opacity, bottom .5s ease
    z-index: 10

  .active
    opacity: 1
    bottom: 0

</style>