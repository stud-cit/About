<template>
  <v-container fluid class="pa-0">
    <div v-swiper:mySwiper="swiperOption" class="swiper-inactive d-none d-sm-flex" :class="isShowSwiper && 'swiper-active'"> 
      <div class="swiper-wrapper">
        <v-col
          v-for="(page, i) in pages"
          :key="i"
          :cols="$vuetify.breakpoint.mdAndDown ? 10 : 8"
          class="swiper-slide"
        >
          <v-card :href="page.to" :link="true">
            <v-img
              :src="getDynamicAssets(page.img)"
              :gradient="imagePageGradient"
              :lazy-src="page.lazyImg"
              :height="$vuetify.breakpoint.mdAndDown ? '45vh' : '55vh'"
              :aspect-ratio="16 / 9"
            >
              <v-card-title class="title white--text fill-height">
                <v-row justify="center" align="center" class="fill-height">
                  <span class="headline font-weight-bold font-italic pr-4">
                    0{{ ++i }}
                  </span>
                  <span class="font-weight-bold" :class="$vuetify.breakpoint.mdAndDown ? 'display-2' : 'display-3'">
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
    <v-row class="d-flex d-sm-none">
      <v-col
          v-for="(page, i) in pages"
          :key="i"
          cols="12"
      >
        <v-card :href="page.to" :link="true">
          <v-img
            :src="getDynamicAssets(page.img)"
            :gradient="imagePageGradient"
            :lazy-src="page.lazyImg"
            height="30vh"
            :aspect-ratio="16 / 9"
          >
            <v-card-title class="title white--text fill-height">
              <v-row justify="center" align="center" class="fill-height">
                <span class="headline font-weight-bold font-italic pr-4">
                  0{{ ++i }}
                </span>
                <span class="display-2 font-weight-bold">
                  {{ page.title }}
                </span>
              </v-row>
            </v-card-title>
            <div class="fill-height bottom-gradient"></div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  isShowSwiper: boolean = false;
  swiperOption = {
    mousewheel: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 100,
  };

  showSwiper() {
    if(document.referrer == 'http://localhost:8080/'){
      setTimeout(() => {
        this.isShowSwiper = true;
       }, 100);
    } else {
       setTimeout(() => {
        this.isShowSwiper = true;
       }, 5000);
    }
  }

  mounted(){
    this.showSwiper();
  }

  imagePageGradient: string =
    'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
}
</script>

<style lang="sass">
.swiper-wrapper
  width: 80%  

.swiper-inactive
  transform: translateX(300%)

.swiper-active
    transform: translateX(0%)
    transition: 2s
</style>
