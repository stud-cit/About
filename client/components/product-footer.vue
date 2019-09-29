<template>
  <v-row justify="center" align="end" class="footer-section">
    <v-col cols="10" class="d-flex d-lg-none">
      <v-row
        justify="center"
        align="center"
        class="return-section"
        @click="scollTop"
      >
        <!-- TODO: add icon -->
        <p :class="isSmAndUp ? 'text-sm' : 'text-xs'">
          {{ $t('weOffers.backToTop') }}
        </p>
      </v-row>

      <v-col cols="12">
        <p :style="getTagLineFont">{{ $t('about.tagLine') }}</p>
      </v-col>
    </v-col>
    <p class="d-none d-lg-block rotated-return-bar" @click="scollTop">
      {{ $t('weOffers.backToTop') }}
    </p>
    <contact-bar :isStatic="true" />
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

  get getTagLineFont() {
    return {
      fontSize: `${this.getCustomAdaptiveFontSize({
        xs: 25,
        sm: 50,
        md: 65,
        lg: 125,
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
    width: 100%
    height: 60vh
    background: #ffffff
    opacity: .05
    cursor: pointer

    p
        color: #2f2f2f

    .text-sm
        font-size: 30px

    .text-xs
        font-size: 25px

.rotated-return-bar
    position: absolute
    top: calc(25vh)
    right: 5vw
    writing-mode: vertical-rl
    transform: scaleX(-1) scaleY(-1)
    font-size: 35px
</style>
