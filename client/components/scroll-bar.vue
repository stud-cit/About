<template>
    <div 
      class="d-none d-md-flex scrollbar-track"
      :class="{ displayNone: displays}" v-scroll="handleScroll"
    >
      <div class="scrollbar-thumb" :style="{top: `${currScroll}%`}"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
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
  @Mutation('changeContactBar') changeContactBar;
  el: 'scrollbar-track';
  targ: 'scrollbar-thumb';
  currScroll: number = 0;
  displays: boolean = false;
  
  handleScroll(evt, targ, el) : void { 
    if (document.body.scrollHeight <= window.innerHeight) {
      this.displays = true;
    } else {
      this.displays = false;
      this.currScroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    }
  }
  mounted() {
      if (document.body.scrollHeight <= window.innerHeight) {
        this.displays = true;
      }
  }
  @Watch('currScroll')
  onChangeScroll(value: number) {
    if(value === 100) {
      this.changeContactBar(true);
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