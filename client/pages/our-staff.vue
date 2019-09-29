<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <PreviewPage :title="ourStaff.previewTitle" :subtitle="ourStaff.previewSubtitle" :description="ourStaff.previewDescription" />
        <ScrollBar />
        <v-row justify="space-around" class="d-none d-sm-flex">
          <v-col v-for="(person, i) in ourStaff.representation" :key="i" lg="4" md="6" sm="12" class="my-4">
            <v-card 
              class="mx-auto" 
              :width="isMdAndUp ? '400px' : '100%'" 
              :class="isLgAndUp ? 'card-img-hover' : 'card-img'">
              <v-img
                :height="isMdAndUp ? '250px' : '40%'"
                :src="getDynamicAssets(person.img_src)"
              >
              </v-img>
            </v-card>
            <div class="card-addition">
              <div class="employee-name my-3" :style="getStaffNameFont">{{ person.name }}</div>
              <div class="employee-position-short" 
                :style="getStaffPositionFont"
              >
                {{ person.position }}
              </div>
              <div 
                class="employee-position-full" 
                :style="getStaffPositionFont"
              >
                {{ person.stack }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="d-flex d-sm-none staff-slider" justify="center" align="center">
          <v-col cols="10">
            <v-window v-model="curStaff">
              <v-window-item
                v-for="(person, i) in ourStaff.representation"
                :key="i"
              >
                <v-card class="mx-auto staff-card" color="transparent" flat>
                  <v-img
                    :src="getDynamicAssets(person.img_src)"
                    :aspect-ratio="4/3"
                    class="staff-image"
                  />
                  <div class="card-addition">
                    <div class="employee-name my-3" :style="getStaffNameFont">{{ person.name }}</div>
                    <div class="employee-position-short" 
                      :style="getStaffPositionFont"
                    >
                      {{ person.position }}
                    </div>
                    <div 
                      class="employee-position-full" 
                      :style="getStaffPositionFont"
                    >
                      {{ person.stack }}
                    </div>
                  </div>
                </v-card>
              </v-window-item>
              <p class="text-center white--text font-italic font-italic subtitle-2">{{ sliderInfo }}</p>
            </v-window>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import ScrollBar from '@/components/scroll-bar.vue';
import PreviewPage from '@/components/preview-page.vue';

@Component({
  layout: 'immediate',
  head: {
    title: 'Our staff',
  },
  components: {
    ScrollBar,
    PreviewPage,
  },
})
export default class OurStaffPage extends Vue {
  @Getter('getStaffStage') ourStaff;
  @Mutation('changePageId') changePageId;
  curStaff: number = 0

  get sliderInfo() {
    return `${this.curStaff + 1} / ${this.ourStaff.representation.length}`;
  }

  get isLgAndUp () {
    return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
  }
  get isMdAndUp () {
      return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
  }
  get getStaffNameFont() {
    return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 25, sm: 40, md: 20, lg: 30})}px`};
  }
  get getStaffPositionFont() {
    return {fontSize: `${this.getCustomAdaptiveFontSize({xs: 12, sm: 27, md: 12, lg: 25})}px`};
  }

  created() {
    this.changePageId(3);
  }
}
</script>

<style lang="sass">
.card-addition
  display: flex
  flex-direction: column
  color: #ffffff

.employee-name
  font-weight: 900
  text-align: center
  margin-bottom: 0
  display: block

.employee-position-short, .employee-position-full
  font-weight: 400
  text-align: center

.card-img-hover
  border-radius: 50px
  filter: brightness(35%)
  transition: 1s

.card-img
  border-radius: 50px
  transition: all 1s
  margin: 15px 0
  
  ~ .card-addition
    .employee-position-full
      opacity: 1

.employee-position-full
  opacity: 0

.card-img-hover:hover
  z-index: 10
  transform: scale(1.15)
  filter: brightness(100%)
  transition: 1s
  ~ .card-addition
    .employee-name
      opacity: 0
      transition: 0.5s
      display: none
    .employee-position-full
      opacity: 1
    .employee-position-short
      opacity: 0

.staff-slider
  height: 100vh

  .staff-card
    width: 100%

    .staff-image 
      filter: brightness(35%)
      transition: all 1s
      .v-image__image
        border-radius: 50px

    &:hover
      .staff-image
        filter: brightness(100%)
      .employee-name
        display: none
      .employee-position-full
        opacity: 1
      .employee-position-short
        opacity: 0
</style>
