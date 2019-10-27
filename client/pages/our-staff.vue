<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="$t('ourStaff.previewTitle')"
					:description="$t('ourStaff.previewDescription')"
					:icon-down="false"
				/>
				<ScrollBar />
				<v-row justify="start" class="d-none d-md-flex">
					<v-col
						v-for="(employee, i) in ourStaff[$i18n.locale].staff"
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
								:src="getDynamicAssets(employee.img)"
							></v-img>
						</v-card>
						<div class="card-addition">
							<div
								class="employee-name mt-6 mb-4 font-weight-bold line-height-1"
								:style="getStaffNameFont"
							>
								{{ employee.name }}
							</div>
							<div
								class="employee-position-short font-weight-regular line-height-1"
								:style="getStaffPositionFont"
							>
								{{ employee.position }}
							</div>
							<div
								class="employee-position-full font-weight-bold mt-7"
								:style="getStaffPositionFont"
							>
								{{ employee.stack }}
							</div>
						</div>
					</v-col>
				</v-row>
				<v-row
					class="d-flex d-md-none staff-slider"
					justify="center"
					align="center"
				>
					<v-col class="staff-slide">
						<v-window v-model="curStaff">
							<v-window-item
								v-for="(employee, i) in ourStaff[$i18n.locale].staff"
								:key="i"
							>
								<v-card class="mx-auto" color="transparent" width="100%" flat>
									<v-img
										height="40%"
										class="card-img"
										:src="getDynamicAssets(employee.img)"
										lazy-src="/cover.jpg"
										:aspect-ratio="4 / 3"
									/>
									<v-row justify="space-around" align="center">
										<v-btn
											color="white"
											icon
											width="15vw"
											height="15vw"
											@click="() => switchSlide(false)"
										>
											<v-icon size="20vw">mdi-chevron-left</v-icon>
										</v-btn>
										<v-col cols="6" class="pa-0">
											<div
												class="employee-name my-3 font-weight-bold"
												:style="getStaffNameFont"
											>
												{{ employee.name }}
											</div>
											<div
												class="employee-position-short"
												:style="getStaffPositionFont"
											>
												{{ employee.position }}
											</div>
											<p
												class="text-center white--text font-italic"
												:class="isXsOnly ? 'subtitle-2' : 'heading'"
											>
												{{ sliderInfo }}
											</p>
										</v-col>
										<v-btn
											color="white"
											icon
											width="15vw"
											height="15vw"
											@click="() => switchSlide(true)"
										>
											<v-icon size="20vw">mdi-chevron-right</v-icon>
										</v-btn>
									</v-row>
								</v-card>
							</v-window-item>
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
	transition: 'page',
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
	@Getter('OurStaffModule/getStage') ourStaff;
	@Mutation('changePageId') changePageId;
	curStaff: number = 0;

	switchSlide(nextSlide) {
		const { curStaff, ourStaff } = this;
		const totalStaff = ourStaff[this.$i18n.locale].staff.length;
		let newIndex;
		if (nextSlide) {
			newIndex = curStaff + 1 < totalStaff ? curStaff + 1 : 0;
		} else {
			newIndex = curStaff - 1 < 0 ? totalStaff - 1 : curStaff - 1;
		}
		this.curStaff = newIndex;
	}

	get sliderInfo() {
		return `${this.curStaff + 1} / ${
			this.ourStaff[this.$i18n.locale].staff.length
		}`;
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

.employee-name
  color: white
  text-align: center
  margin-bottom: 0
  display: block

.employee-position-short, .employee-position-full
  font-weight: 400
  color: #ffffff
  text-align: center

.card-img-hover
  border-radius: 50px
  filter: brightness(35%)
  transition: 1s

.card-img
  border-radius: 50px !important
  transition: all 1s
  margin: 15px 0

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

.staff-slide
  height: 65vh

.line-height-1
  line-height: 1
</style>
