<template>
  <div
    class="d-none d-md-flex scrollbar-track"
    v-if="visibility"
    v-scroll="handleScroll"
  >
    <div class="scrollbar-thumb" :style="{ top: `${currScroll}%` }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
@Component
export default class ScrollBar extends Vue {
  el: 'scrollbar-track';
  targ: 'scrollbar-thumb';
  currScroll: number = 0;
  visibility: boolean = true;

  handleScroll(): void {
		const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;
		const scrollToFooter = scrollHeight - windowHeight * 2;
    if (currentScroll > scrollToFooter) {
      this.visibility = false;
    } else {
      this.visibility = true;
      this.currScroll = (currentScroll / (scrollHeight - windowHeight)) * 100;
    }
  }

  mounted() {
    if (document.body.scrollHeight <= window.innerHeight) {
      this.visibility = false;
    }
    this.handleScroll();
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
</style>
