<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <v-col
        v-for="(page, i) in pages"
        :key="i"
        cols="8"
        :offset="!i ? 0 : 1"
        class="swiper-slide"
      >
        <v-card :href="page.to" :link="true">
          <v-img
            :src="getDynamicAssets(page.img)"
            :gradient="imagePageGradient"
            :lazy-src="page.lazyImg"
            height="55vh"
            :aspect-ratio="16 / 9"
      
          >
            <v-card-title class="title white--text fill-height">
              <v-row justify="center" align="center" class="fill-height">
                <span class="headline font-weight-bold font-italic px-4">
                  0{{ ++i }}
                </span>
                <span class="display-3 font-weight-bold">
                  {{ page.title }}
                </span>
              </v-row>
            </v-card-title>
            <div class="fill-height bottom-gradient"></div>
          </v-img>
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
  layout: 'preliminary',
  head: {
    title: 'Home',
  },
})
export default class HomePage extends Vue {
  @Getter('getPageStage') pages;

  swiperOption = {
    mousewheel: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 100 ,
  };

  imagePageGradient: string =
    'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
}
</script>

<style lang="sass">
.swiper-container
  width: 100%

.swiper-wrapper
  width: 80%  
</style>
