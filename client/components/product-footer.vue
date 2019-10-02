<template>
  <v-row justify="center" align="end" class="footer-section">

    <v-col cols="10" class="d-flex ">

      <v-row
        justify="center"
        align="center"
        class="return-section d-lg-none flex-column"
        @click="scollTop"
      >
        <!-- TODO: add icon -->
        <p class="arrowUp">&#8593;</p>
        <p :class="isSmAndUp ? 'text-sm' : 'text-xs'">
          {{ $t('weOffers.backToTop') }}
        </p>
      </v-row>

			<!-- FIXME: fix positioning this tag line -->
      <v-col cols="12" class="mt-xs-12 d-none" :class="isSmAndDown ? 'sqsMob' : 'sqs'">
        <p :style="getTagLineFont">{{ $t('about.tagLine') }}</p>
      </v-col>
    </v-col>
    <p class="d-none d-lg-block rotated-return-bar" @click="scollTop">
      {{ $t('weOffers.backToTop') }}
    </p>
    <contact-bar id="contact" :isStatic="true" />
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContactBar from './contact-bar';

@Component({
  components: {
    'contact-bar': ContactBar,
  },
})
export default class PruductFooter extends Vue {
  scollTop() {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  get isSmAndUp() {
    return this.$breakpoint ? this.$breakpoint.is.smAndUp : false;
  }

  get isSmAndDown(){
     return this.$breakpoint ? this.$breakpoint.is.sm : false;
  }

  get getTagLineFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 25,
        sm: 50,
        md: 65,
        lg: 85,
      })}px`,
    };
  }


}
</script>

<style lang="sass">
.footer-section
    position: relative
    height: 100vh
    color: white

.return-section
    width: 90%
    height: 40vh
    background: #282828
    opacity: .5
    cursor: pointer
    font-weight: normal
    font-style: normal

    p
        color: #696969


    .text-sm
        font-size: 30px

    .text-xs
        font-size: 25px

.sqs
  position: absolute
  font-weight: normal
  font-style: normal
  top: 54%

.sqsMob
  position: absolute
  font-weight: bold
  font-style: normal
  top: 69.5vh

.rotated-return-bar
    position: absolute
    top: calc(25vh)
    right: 5vw
    writing-mode: vertical-rl
    transform: scaleX(-1) scaleY(-1)
    font-size: 35px

.arrowUp
      color: #2f2f2f
      font-size: 50px
</style>
