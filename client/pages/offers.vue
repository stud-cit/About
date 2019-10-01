<template>
  
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <PreviewPage
          :title="weOffers.previewTitle"
          cols="12"
          sm="9"
          :subtitle="weOffers.previewSubtitle"
          :description="weOffers.previewDescription"
        />

        <ScrollBar />
        <v-row justify="center">
          <section
            class="representation"
            v-for="(preview, index) in weOffers.representation"
            :key="index"
          >
            <v-row
              class="center d-sm-flex"
              :class="{ 'representation-tablet': isSmAndDown }"
              :justify="preview.positionCard"
            >
              <img class="preview-image" src="~/assets/images/weOffer/1.jpg" />
              <v-card
                :class="isLgAndUp ? preview.positionCard : 'preview-card'"
              >
                <v-card-title class="preview-title" :style="getCardTitleFont">{{
                  preview.title
                }}</v-card-title>
                <v-card-text :style="getCardContentFont">{{
                  preview.text
                }}</v-card-text>
              </v-card>
            </v-row>
          </section>
        </v-row>
      </v-col>
      <product-footer />
    </v-row>
    
 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import PruductFooter from '@/components/product-footer.vue';
import PreviewPage from '@/components/preview-page.vue';
import ScrollBar from '@/components/scroll-bar.vue';

@Component({
  layout: 'immediate',
  head: {
    title: 'Offers',
  },
  components: {
    'product-footer': PruductFooter,
    PreviewPage,
    ScrollBar,
  },
})
export default class OffersPage extends Vue {
  @Getter('getOffersStage') weOffers;
  @Mutation('changePageId') changePageId;

  get isLgAndUp() {
    return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
  }
  get isSmAndDown() {
    return this.$breakpoint ? this.$breakpoint.is.smAndDown : false;
  }
  get getCardTitleFont() {
    return {
      fontSize: `${this.getCustomAdaptiveFontSize({
        xs: 15,
        sm: 20,
        md: 20,
        lg: 30,
      })}px`,
    };
  }
  get getCardContentFont() {
    return {
      fontSize: `${this.getCustomAdaptiveFontSize({
        xs: 12,
        sm: 20,
        md: 12,
        lg: 25,
      })}px`,
    };
  }

  created() {
    this.changePageId(2);
  }
}
</script>

<style lang="sass">
.representation
  height: 100vh
  display: flex
  justify-content: flex-start
  flex-direction: row
  position: relative
  align-items: center
  overflow: hidden
  width: 100%

.representation-tablet
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  img
    object-fit: cover
     height: 100%
    width: 100%


.preview-card
  position: relative
  padding: 1rem
  width: 100%
  transform: translateX(0%)

.start
  right: 0
  width: 40rem
  padding: 3rem 2rem
  position: absolute
  transform: translateY(95%)

.end
    height: 100%
    left: 0
    width: 40rem
    padding: 3rem 2rem
    position: absolute
    transform: translateY(40%)

.preview-title
  margin-bottom: 2rem

.adress
  background-color: white
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center

.adress img
  height: 10rem
  width: 10rem


.line
  border: 3px solid black
  width: 50%
</style>
