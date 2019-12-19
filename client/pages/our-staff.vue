<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="page.name"
					:description="page.description"
					:icon-down="false"
				/>
				<ScrollBar />
				<v-row justify="start" class="d-none d-md-flex">
					<v-col
						v-for="(employee, i) in getPageContent"
						:key="i"
						lg="4"
						md="4"
						sm="12"
						class="my-4"
						ref="staff"
					>
						<Staff
							:pose="
								staffToAnimate.includes(i) && !getIsHideAnimationContent
									? 'visible'
									: 'hidden'
							"
						>
							<v-card
								class="mx-auto card-img-hover"
								:width="isLgAndUp ? '425px' : 'auto'"
							>
								<v-img
									:height="isLgAndUp ? '300px' : '200px'"
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
									:style="getStackPositionFont"
								>
									{{ employee.stack }}
								</div>
							</div>
						</Staff>
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
								v-for="(employee, i) in getPageContent"
								:key="i"
							>
								<v-card
									class="mx-auto"
									color="transparent"
									:width="isXsOnly ? '90%' : '100%'"
									flat
								>
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
												class="employee-name mt-3 mb-2 font-weight-bold line-height-1-2"
												:style="getStaffNameFont"
											>
												{{ employee.name }}
											</div>
											<div
												class="employee-position-short"
												:style="getStaffPositionFont"
											>
												{{ employee.stack }}
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
		<product-footer class="max-width" />
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import { Action, Getter, Mutation } from 'vuex-class';
	import posed from 'vue-pose';

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
			Staff: posed.div({
				visible: {
					opacity: 1,
					y: 0,
				},
				hidden: {
					opacity: 0,
					y: 40,
				},
			}),
		},
	})
	export default class OurStaffPage extends Vue {
		@Action('fetchContentByPageId') fetchContentByPageId;
		@Getter('getPage') page;
		@Getter('getPageContent') pageContent;
		@Getter('getIsHideAnimationContent') getIsHideAnimationContent;

		curStaff: number = 0;
		observers: IntersectionObserver[] = [];
		staffToAnimate: number[] = [];

		get getPageContent() {
			return this.pageContent(this.$i18n.locale);
		}

		switchSlide(nextSlide) {
			const { curStaff, pageContent } = this;
			const totalStaff = pageContent[this.$i18n.locale].length;
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
				this.getPageContent.length ? this.getPageContent.length : 0
			}`;
		}

		setAnimation(entry, representationIndex, observer) {
			if (
				entry.intersectionRatio > 0 &&
				!this.staffToAnimate.includes(representationIndex)
			) {
				this.staffToAnimate.push(representationIndex);
				observer.disconnect();
			}
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
			return { fontSize: `${this.getAdaptiveSize('staffNameFont')}px` };
		}
		get getStaffPositionFont() {
			return { fontSize: `${this.getAdaptiveSize('staffPositionFont')}px` };
		}
		get getStackPositionFont() {
			return { fontSize: `${this.getAdaptiveSize('stackPositionFont')}px` };
		}


		// On change page content add observers to each rendered section
		@Watch('getPageContent')
		onChangePageContent() {
			const staff: any = this.$refs.staff;

			this.observers = staff.map((currStaff, index) => {
				const options = { threshold: 0.7 };
				const observer = new IntersectionObserver(
					([entry], observer) => this.setAnimation(entry, index, observer),
					options,
				);
				observer.observe(currStaff);
				return observer;
			});
		}

		created() {
			this.fetchContentByPageId();
		}

		beforeDestroy() {
			this.observers.forEach(observer => {
				observer.disconnect();
			});
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
		border-radius: 50px !important
		filter: brightness(35%)
		transition: 1s

	.card-img
		transition: all 1s
		margin: 15px 0

	.employee-position-full
		opacity: 0

	.card-img-hover:hover
		z-index: 10
		transform: scale(1.15)
		filter: brightness(100%)
		border-radius: 0 !important
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

	.line-height-1-2
		line-height: 1.2

	.max-width
		max-width: 100vw

	.v-card:not(.v-sheet--tile)
		border-radius: 0
</style>
