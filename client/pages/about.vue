<template>
  <v-container>
    <v-window v-model="curStage" continuous dark>
      <v-window-item>
        <v-row justify="center">
          <v-col cols="10" md="12">
            <v-row class="slide-container" 
              justify="space-around"
              align="end"
              align-sm="start"
            >
              <v-col cols="12" order="1" order-sm="1">
                <div class="d-none d-sm-block">
                  <p class="font-weight-bold" :style="getPreviewTitleFont">{{ about.previewTitle }}</p>
                </div>
                <div class="d-block d-sm-none">
                  <p class="font-weight-bold text-center" :style="getPreviewTitleFont">{{ about.previewTitle }}</p>
                </div>
              </v-col>
              <v-col cols="12" order="3" order-sm="2">
                <v-row justify="space-around" justify-sm="start">
                  <v-col cols="auto" order="1" order-sm="1">
                    <div class="arrow mr-3" @click="handleNavigatingPage(false)">&#8592;</div>
                  </v-col>
                  <v-col cols="auto" order="3" order-sm="2">
                    <div class="arrow mr-3" @click="handleNavigatingPage(true)">&#8594;</div>
                  </v-col>
                  <v-col cols="auto" order="2" order-sm="3" :class="{rotate: isXsOnly}">
                    <nuxt-link class="square-container" to="/">
                      <div class="square mr-3 squareOne"></div>
                      <div class="square mr-3 squareTwo"></div>
                      <div class="square squareThree"></div>
                    </nuxt-link>	
                  </v-col>					
                </v-row>
              </v-col>

              <v-col cols="12" order="2" order-sm="3">
                <v-row class="d-none d-sm-flex">
                  <span :style="getPreviewSubTitleFont">
                    {{ about.previewSubtitle }}
                  </span>
                </v-row>
                <v-row justify="center" class="d-flex d-sm-none pl-0">
                  <img class="pointer-icon" src="/pointer-mobile.svg" />
                </v-row>
                <v-row justify="center" justify-sm="start" class="mt-4">
                  <span
                    class="gray"
                    :style="getPreviewInfoFont"
                  >
                    {{$t('about.swipe')}}
                  </span>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-window-item>

      <v-window-item v-for="(slide, index) in about.slides" :key="index">
        <v-row justify="center" align="center" class="slide-container">
          <v-col cols="12" sm="10" md="8">
            <v-row class="font-weight-bold ma-2 white--text" :style="getSlideTitleFont">
              {{ slide.title }}
            </v-row>
            <div class="px-8 py-12 slide-content" :style="getSlideContentFont">
              {{slide.content}}
            </div>
          </v-col>  
        </v-row>
      </v-window-item>
      <v-window-item>
      </v-window-item>
    </v-window>
    <p class="d-none d-md-block slogan"
      :class="isLgAndUp ? 'slogan-lg' : 'slogan-md'"
    >
      {{$t('about.tagLine')}}
    </p>
    <v-footer absolute color="transparent" class="pb-0 px-0 px-sm-auto">
      
      <v-row justify="center">
        <v-col sm="10" md="12" class="pb-0">
          <v-row justify-sm="end" justify-md="space-around" align="center">
            <v-col sm="12" md="8" class="px-0 d-none d-sm-flex">
              <v-slider
                v-model="curStage"
                :max="about.slides.length + 1"
                class="slider"
                step="1"
                ticks="always"
                tick-size="10"
                hide-details
                dark
              />
            </v-col>
            <v-col xs="12" sm="auto" class="pb-0">
              <v-card class="pa-4 pt-0 use-contacts-container" @click="() => changeContactBar(true)">
                <v-card-title class="justify-center" :style="getUseContactsTitleFont">{{$t('contact.titleShort')}}</v-card-title>
                <v-card-actions class="pa-0 contacts-action justify-center" :style="getUseContactsActionFont">{{$t('contact.preTitleShort')}}</v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
@Component({
  layout: 'immediate',
  head: {
    title: 'About us',
  },
})
export default class AboutPage extends Vue {
  @Getter('getAboutStage') about;
  @Getter('getPageByRoute') getPageByRoute;
  @Getter('getPageById') getPageById;
  @Getter('getContactBarVisibility') isShowContactBar;
  @Mutation('changePageCover') changePageCover;
  @Mutation('changeContactBar') changeContactBar;
  curStage: number = 0;

  handleNavigatingPage(toRight: boolean) {
		const route = this.$route.path.replace('/', '');
		const pageIndex = this.getPageByRoute(route);
		const newPageIndex = toRight ? pageIndex + 1 : pageIndex - 1;
		const nextPage = this.getPageById(newPageIndex);
		this.$router.push(nextPage);
  }

  get isXsOnly () {
    return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
  }
  get isLgAndUp () {
    return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
  }

  get getSlideTitleFont() {
    return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 12, sm: 20, md: 20, lg: 30})}px`};
  }
  get getSlideContentFont() {
    return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 10, sm: 20, md: 20, lg: 30})}px`};
  }
  get getPreviewTitleFont() {
    return { fontSize: `${this.getCommonAdaptiveFontSize('previewTitle')}px`};
  }
  get getPreviewSubTitleFont() {
    return { fontSize: `${this.getCommonAdaptiveFontSize('previewSubtitle')}px`};
  }
  get getPreviewInfoFont() {
    return { fontSize: `${this.getCommonAdaptiveFontSize('previewInfo')}px`};
  }
  get getUseContactsTitleFont() {
    return { fontSize: `${this.getCommonAdaptiveFontSize('useContactsTitle')}px`};
  }
  get getUseContactsActionFont() {
    return { fontSize: `${this.getCommonAdaptiveFontSize('useContactsAction')}px`};
  }

  @Watch('curStage')
  onChangeCurStage(value: number) {
    if(value === this.about.slides.length + 1) {
      this.changeContactBar(true);
    }
  }

  @Watch('isShowContactBar')
  onChangeContactBar(curValue: boolean, prevValue: boolean) {
    // when we close contact bar - show prev stage
    if(prevValue === true) {
      this.curStage = this.curStage - 1;
    }
  }

  created() {
    this.changePageCover('about');
  }

  mounted() {
  }
}
</script>

<style lang="sass">
  .slider
    .v-slider__tick
      border-radius: 50%
      background: #363636
    
    .v-slider__tick--filled
      background: white

  .preview-section
    height: 100vh

  .slide-container
    height: 60vh
    color: white

  .arrow
    font-size: 1.8rem
    text-align: center
    cursor: pointer
  
  .square-container
    display: flex

  .square
    height: 40px
    width: 40px
    border-radius: 20%
    border: 2px solid white
  
  .squareOne
    clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)
    
  .squareThree
    clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%)

  .slide-content
    border: 5px solid white   
    border-right: 16px solid white
    color: white
    position: relative

  .use-contacts-container
    width: auto
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0

  .contacts-action
    text-transform: uppercase
    text-decoration: underline

  .slogan
    position: fixed
    right: 2vw
    color: white
    writing-mode: vertical-rl
    transform: scaleX(-1) scaleY(-1)

  .slogan-md
    top: calc(50vh - 163px)
    font-size: 30px

  .slogan-lg
    top: calc(50vh - 272px)
    font-size: 50px

  .rotate
    transform: rotate(90deg)
</style>