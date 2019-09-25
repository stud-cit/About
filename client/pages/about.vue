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
            >20
              <v-col cols="12" order="1" order-sm="1">
                <div class="d-none d-sm-block">
                  <p class="font-weight-bold" :class="$vuetify.breakpoint.mdAndUp ? 'display-2' : 'display-1'">{{ about.previewTitle }}</p>
                </div>
                <div class="d-block d-sm-none">
                  <p class="headline font-weight-bold text-center">{{ about.previewTitle }}</p>
                </div>
              </v-col>
              <v-col cols="12" order="3" order-sm="2">
                <v-row justify="space-around" justify-sm="start">
                  <v-col cols="auto" order="1" order-sm="1">
                    <div class="arrow mr-3" @click="handleChangeStage(false)">&#8592;</div>
                  </v-col>
                  <v-col cols="auto" order="3" order-sm="2">
                    <div class="arrow mr-3" @click="handleChangeStage(true)">&#8594;</div>
                  </v-col>
                  <v-col cols="auto" order="2" order-sm="3" :class="{rotate: $vuetify.breakpoint.xsOnly}">
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
                  <span :class="$vuetify.breakpoint.smAndUp ? 'headline' : 'title'">
                    {{ about.previewSubtitle }}
                  </span>
                </v-row>
                <v-row justify="center" class="d-flex d-sm-none pl-0">
                  <img class="pointer-icon" src="/pointer-mobile.svg" />
                </v-row>
                <v-row justify="center" justify-sm="start" class="mt-4">
                  <span
                    :class="$vuetify.breakpoint.smAndUp ? 'title' : 'subtitle-1'"
                    class="gray"
                  >
                    Swipe for more information
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
            <v-row class="font-weight-bold ma-2 white--text">
              {{ slide.title }}
            </v-row>
            <div class="px-8 py-12 headline slide-content">
              {{slide.content}}
            </div>
          </v-col>  
        </v-row>
      </v-window-item>
      <v-window-item>
      </v-window-item>
    </v-window>
    <div class="d-none d-md-block display-1 slogan">Speed, quality, simplicity</div>
    <v-footer absolute color="transparent" class="pb-0" :class="$vuetify.breakpoint.xsOnly && 'px-0'">
      
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
                <v-card-title class="subtitle-1 justify-center">Do you have some questions?</v-card-title>
                <v-card-actions class="subtitle-1 contacts-action justify-center pa-0">Use our contacts</v-card-actions>
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
  @Getter('getContactBarVisibility') isShowContactBar;
  @Mutation('changePageCover') changePageCover;
  @Mutation('changeContactBar') changeContactBar;
  curStage: number = 0;

  handleChangeStage(isNextStage) {
    if(isNextStage) {
      this.curStage = 2
    }
    else {
      this.curStage = this.about.slides.length + 1; 
    }
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
    top: calc(50vh - 188px)
    right: 2vw
    color: white
    writing-mode: vertical-rl
    transform: scaleX(-1) scaleY(-1)

  .rotate
    transform: rotate(90deg)
</style>