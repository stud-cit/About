<template>
    <div class="scrollbar-track" v-bind:class="{ displayNone: displays}" v-scroll="handleScroll">
      <div class="scrollbar-thumb" v-bind:style="{top: top}"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

@Component
export default class ScrollBar extends Vue {
  el: 'scrollbar-track';
  targ: 'scrollbar-thumb';
  top: string = '';
  displays: boolean = false;
  
  handleScroll(evt, targ, el) : void { 
    if (document.body.scrollHeight <= window.innerHeight) {
      this.displays = true;
    } else {
      this.displays = false;
      this.top = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 + '%';
    }
  }

  mounted() {
      if (document.body.scrollHeight <= window.innerHeight) {
        this.displays = true;
      }
  }
}
</script> 

<style lang="sass">
.scrollbar-track 
    position: fixed
    top: 20%
    right: 50px
    bottom: 20%
    width: 3px
    background-color: rgba(0,0,0,1)

.scrollbar-thumb 
    cursor: pointer
    position: absolute
    top: 0
    width: 12px
    height: 12px
    border-radius: 50%
    right: -4px
    background-color: rgba(255,255,255,1)

.displayNone
    display: none
</style>
