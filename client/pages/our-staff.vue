<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <PreviewPage
          :title="ourStaff.previewTitle"
          :subtitle="ourStaff.previewSubtitle"
          :description="ourStaff.previewDescription"
          :icon-down="false"
        />
        <ScrollBar />
        <v-row justify="start" class="d-none d-md-flex">
          <v-col
            v-for="(person, i) in ourStaff.representation"
            :key="i"
            lg="4"
            md="6"
            sm="12"
            class="my-4"
          >
            <v-card
              class="mx-auto"
              :width="isMdAndUp ? '400px' : '100%'"
              :class="isLgAndUp ? 'card-img-hover' : 'card-img'"
            >
              <v-img
                :height="isMdAndUp ? '250px' : '40%'"
                :src="getDynamicAssets(person.img_src)"
              >
              </v-img>
            </v-card>
            <div class="card-addition">
              <div class="employee-name my-3 font-weight-thin" :style="getStaffNameFont">
                {{ person.name }}
              </div>
              <div
                class="employee-position-short font-weight-regular"
                :style="getStaffPositionFont"
              >
                {{ person.position }}
              </div>
              <div class="employee-position-full font-weight-regular" :style="getStaffPositionFont">
                {{ person.stack }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row
          class="d-flex d-md-none staff-slider"
          justify="center"
          align="center"
        >
          <v-col>
            <v-window v-model="curStaff">
              <v-window-item
                v-for="(person, i) in ourStaff.representation"
                :key="i"
              >
                <v-card class="mx-auto" color="transparent"
                  width="100%"
                  flat>
                  <v-img
                    height="40%"
                    class="card-img"
                    :src="getDynamicAssets(person.img_src)"
										lazy-src="/cover.jpg"
                    :aspect-ratio="4 / 3"
                  />
                  <div class="card-addition">
										<v-btn
											icon
											color="white"
											class="scroll-icon-left"
										>
											<v-icon size="200" @click="() => switchSlide(false)">mdi-chevron-left</v-icon>
										</v-btn>
                    <div class="employee-name my-3 font-weight-thin" :style="getStaffNameFont">
                      {{ person.name }}
                    </div>
                    <div
                      class="employee-position-short font-weight-regular"
                      :style="getStaffPositionFont"
                    >
                      {{ person.position }}
                    </div>
                    <div
                      class="employee-position-full font-weight-regular"
                      :style="getStaffPositionFont"
                    >
                      {{ person.stack }}
                    </div>
										<v-btn
											icon
											color="white"
											class="scroll-icon-right"
										>
											<v-icon size="200" @click="() => switchSlide(true)">mdi-chevron-right</v-icon>
										</v-btn>
                  </div>
                </v-card>
              </v-window-item>
              <p
                class="text-center white--text font-italic"
								:class="isXsOnly ? 'subtitle-2': 'heading'"
              >
                {{ sliderInfo }}
              </p>
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
  curStaff: number = 0;

	switchSlide(nextSlide) {
		const {curStaff, ourStaff} = this;
		const totalStaff = ourStaff.representation.length;
		let newIndex;
		if(nextSlide) {
			newIndex = curStaff + 1 < totalStaff ? curStaff + 1 : 0;
		}
		else {
			newIndex = curStaff - 1 < 0 ? totalStaff -1 : curStaff - 1;
		}
		this.curStaff = newIndex;
	}

  get sliderInfo() {
    return `${this.curStaff + 1} / ${this.ourStaff.representation.length}`;
  }

  get isLgAndUp() {
    return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
  }
  get isMdAndUp() {
    return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
	}
	get isXsOnly() {
    return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
  }
  get getStaffNameFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 25,
        sm: 40,
        md: 20,
        lg: 30,
      })}px`,
    };
  }
  get getStaffPositionFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 12,
        sm: 27,
        md: 12,
        lg: 25,
      })}px`,
    };
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
  position: relative


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
  border-radius: 50px !important
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
  height: 70vh

.scroll-icon-left
  opacity: 0.5
  position: absolute
  top: 50%
  left: 5%
  transform: translateY(-50%)

.scroll-icon-right
  opacity: 0.5
  position: absolute
  top: 50%
  right: 5%
  transform: translateY(-50%)
</style>
