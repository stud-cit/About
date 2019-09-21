<template>
  <v-container class="wrapper">
    <PreviewPage v-bind:title="ourStaff.previewTitle" v-bind:subtitle="ourStaff.previewSubtitle" v-bind:description="ourStaff.previewDescription" />
    <ScrollBar />
    <v-row justify="space-around">
      <v-col v-for="(person, i) in ourStaff.representation" :key="i" lg="4" sm="6" xs="12">
        <v-card class="card-img mx-auto" max-width="400">
          <v-img
            class="white--text"
            height="250px"
            :src="getDynamicAssets(person.img_src)"
          >
          </v-img>
        </v-card>
        <div class="card-addition">
          <div class="employee-name">{{ person.name }}</div>
          <div class="employee-position-short">{{ person.position }}</div>
          <div class="employee-position-full">{{ person.stack }}</div>
        </div>
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
  @Mutation('changePageCover') changePageCover;
  @Mutation('changeContactBar') changeContactBar;
  created() {
    this.changePageCover('our-staff');
  }
  showContactBar() {
    this.changeContactBar(true);
  }
}
</script>

<style lang="sass">
.card-addition
  display: flex
  flex-direction: column
  color: #ffffff
  margin-top: 25px

.employee-name
  font-size: 1.5rem
  font-weight: 900
  text-align: center
  margin-bottom: 0

.employee-position-short, .employee-position-full
  font-size: .9rem
  font-weight: 400
  text-align: center

.card-img
  border-radius: 50px
  filter: brightness(35%)
  max-height: 350px
  transition: 1s

.employee-position-full
  display: none

.card-img:hover
  z-index: 10
  transform: scale(1.25)
  filter: brightness(100%)
  transition: 1s
  ~ .card-addition
    .employee-name
      opacity: 0
      transition: 0.5s
    .employee-position-full
      display: block
    .employee-position-short
      display: none
</style>
