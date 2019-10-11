<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="ourStaff[$i18n.locale].previewTitle"
					:subtitle="ourStaff[$i18n.locale].previewSubtitle"
					:description="ourStaff[$i18n.locale].previewDescription"
					:icon-down="false"
				/>
				<ScrollBar />
				<v-row justify="start" class="d-none d-md-flex">
					<v-col
						v-for="(person, i) in ourStaff[$i18n.locale].representation"
						:key="i"
						lg="4"
						md="6"
						sm="12"
						class="my-4"
					>
						<v-card
							class="mx-auto"
							:width="isMdAndUp ? '450px' : '100%'"
							:class="isLgAndUp ? 'card-img-hover' : 'card-img'"
						>
							<v-img
								:height="isMdAndUp ? '300px' : '45%'"
								:src="getDynamicAssets(person.img_src)"
							>
							</v-img>
						</v-card>
						<div class="card-addition">
							<div
								class="employee-name mt-6 mb-4 font-weight-bold line-height-1"
								:style="getStaffNameFont"
							>
								{{ person.name }}
							</div>
							<div
								class="employee-position-short font-weight-regular line-height-1"
								:style="getStaffPositionFont"
							>
								{{ person.position }}
							</div>
							<div
								class="employee-position-full font-weight-bold mt-7"
								:style="getStaffPositionFont"
							>
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
								v-for="(person, i) in ourStaff[$i18n.locale].representation"
								:key="i"
							>
								<v-card class="mx-auto" color="transparent" width="100%" flat>
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
                      <v-img src="/arrow-point-to-left.svg" class="arrow-style" @click="() => switchSlide(false)"/>
										</v-btn>
										<div class="infoNameSkill">
											<div
											class="employee-name my-3 font-weight-bold"
											:style="getStaffNameFont"
											>
												{{ person.name }}
											</div>
											<div
												class="employee-position-short font-weight-regular d-none"
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
										</div>

										<v-btn
											icon
											color="white"
											class="scroll-icon-right"
										>
                      <v-img src="/arrow-point-to-right.svg" class="arrow-style" @click="() => switchSlide(false)"/>
										</v-btn>
									</div>
								</v-card>
							</v-window-item>
							<p
								class="text-center white--text font-italic"
								:class="isXsOnly ? 'subtitle-2' : 'heading'"
							>
								{{ sliderInfo }}
							</p>
						</v-window>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<product-footer />
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import ScrollBar from '@/components/scroll-bar.vue';
import PreviewPage from '@/components/preview-page.vue';
import PruductFooter from '@/components/product-footer.vue';

@Component({
	layout: 'immediate',
	head: {
		title: 'Our staff',
	},
	components: {
		ScrollBar,
		PreviewPage,
		'product-footer': PruductFooter,
	},
})
export default class OurStaffPage extends Vue {
	@Getter('getStaffStage') ourStaff;
	@Mutation('changePageId') changePageId;
	curStaff: number = 0;

	switchSlide(nextSlide) {
		const { curStaff, ourStaff } = this;
		const totalStaff = ourStaff[this.$i18n.locale].representation.length;
		let newIndex;
		if (nextSlide) {
			newIndex = curStaff + 1 < totalStaff ? curStaff + 1 : 0;
		} else {
			newIndex = curStaff - 1 < 0 ? totalStaff - 1 : curStaff - 1;
		}
		this.curStaff = newIndex;
	}

	get sliderInfo() {
		return `${this.curStaff + 1} / ${this.ourStaff[this.$i18n.locale].representation.length}`;
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
				xs: 35,
				sm: 40,
				md: 45,
				lg: 55,
			})}px`,
		};
	}
	get getStaffPositionFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 22,
				sm: 30,
				md: 25,
				lg: 30,
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
  justify-content: center

.infoNameSkill
  width: 70%
  margin: 0 auto

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
  opacity: 1
  position: absolute
  left: 5%
  fill: red
.scroll-icon-right
  opacity: 1
  position: absolute
  right: 5%
  
.line-height-1
  line-height: 1

.arrow-style
  width: 18vw
</style>
