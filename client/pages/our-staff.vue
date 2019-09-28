<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <PreviewPage :title="ourStaff.previewTitle" :subtitle="ourStaff.previewSubtitle" :description="ourStaff.previewDescription" />
        <ScrollBar />
        <v-row justify="space-around">
          <v-col v-for="(person, i) in ourStaff.representation" :key="i" lg="4" md="6" sm="12" class="my-4">
            <v-card class="mx-auto" :width="$vuetify.breakpoint.mdAndUp ? '400px' : '100%'" :class="$vuetify.breakpoint.lgAndUp ? 'card-img-hover' : 'card-img'">
              <v-img
                class="white--text"
                :height="$vuetify.breakpoint.mdAndUp ? '250px' : '40%'"
                :src="getDynamicAssets(person.img_src)"
              >
              </v-img>
            </v-card>
            <div class="card-addition">
              <div class="employee-name my-3">{{ person.name }}</div>
              <div class="employee-position-short">{{ person.position }}</div>
              <div class="employee-position-full">{{ person.stack }}</div>
            </div>
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
  @Mutation('changePageCover') changePageCover;

  created() {
    this.changePageCover('our-staff');
  }
}
</script>

<style lang="sass">
.card-addition
  display: flex
  flex-direction: column
  color: #ffffff

.employee-name
  font-size: 1.5rem
  font-weight: 900
  text-align: center
  margin-bottom: 0
  display: block

.employee-position-short, .employee-position-full
  font-size: .9rem
  font-weight: 400
  text-align: center

.card-img-hover
  border-radius: 50px
  filter: brightness(35%)
  transition: 1s

.card-img
  border-radius: 50px
  transition: 1s
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
</style>
