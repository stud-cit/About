<template>
	<v-container fluid cdclass="py-0 ma-0">
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<v-window
					v-model="stageAbout"
					continuous
					dark
					:touch="{
						left: swipeLeft,
						right: swipeRight,
					}"
				>
					<v-window-item>
						<v-col
							cols="12"
							class="pa-0"
							:class="isXsOnly ? 'slide-container-mobile' : 'slide-container'"
						>
							<PreviewPage
								:title="$t('common.companyName')"
								:description="about[$i18n.locale].previewDescription"
								:icon-down="false"
							/>
						</v-col>
					</v-window-item>
					<v-window-item>
						<v-row
							:justify="isSmAndDown ? 'center' : 'start'"
							align="center"
							:class="isXsOnly ? 'slide-container-mobile' : 'slide-container'"
						>
							<v-col cols="11" md="10" lg="10">
								<v-row>
									<v-col col="12">
										<div
											class="font-weight-bold ma-2 white--text text-uppercase"
											:style="getSlideTitleFont"
										>
											{{ $t('common.companyName') }}
										</div>
										<div
											class="px-xl-12 px-lg-8 px-md-8 px-sm-8 px-xs-8 py-xl-12 py-lg-2 py-md-8 py-sm-8 px-3 py-4 slide-content font-weight-light"
											:style="getSlideContentFont"
											:class="isXsOnly ? '' : 'border-right'"
										>
											<TextSlider
												:pose="
													isTextSliderAnimation && !getIsHideAnimationContent
														? 'visible'
														: 'hidden'
												"
												class="py-md-10 py-lg-7"
											>
												{{ about[$i18n.locale].slides[stageText] }}
											</TextSlider>
										</div>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-window-item>
					<v-window-item>
						<v-row justify="center" align="center" class="footer-section-about">
							<v-col cols="12" sm="10" class="d-flex">
								<v-row
									justify="center"
									align="center"
									class="return-section d-md-none flex-column"
									@click="backToStart"
								>
									<p class="arrowLeft">&#8592;</p>
									<p :class="!isXsOnly ? 'text-sm' : 'text-xs'">
										{{ $t('common.backToTop') }}
									</p>
								</v-row>
							</v-col>
						</v-row>
					</v-window-item>
				</v-window>

				<Slogan
					:pose="
						isSloganAnimation && !getIsHideAnimationContent
							? 'visible'
							: 'hidden'
					"
					:delay="getFirstStageAnimationDelay"
					class="d-none d-md-block rotated-phraze font-weight-light"
					:class="isLgAndUp ? 'rotated-phraze-lg' : 'rotated-phraze-md'"
					v-if="curStage <= about[$i18n.locale].slides.length"
				>
					{{ $t('common.slogan') }}
				</Slogan>
				<p
					class="d-none d-md-block font-weight-light rotated-phraze pointer back-to-start"
					:class="isLgAndUp ? 'rotated-phraze-lg' : 'rotated-phraze-md'"
					v-if="curStage > about[$i18n.locale].slides.length"
					@click="backToStart"
				>
					{{ about[$i18n.locale].backToStart }}
				</p>
				<OpacityBox
					:pose="
						isContactAnimation && !getIsHideAnimationContent
							? 'visible'
							: 'hidden'
					"
					:delay="getSecondStageAnimationDelay"
				>
					<v-footer absolute color="transparent" class="pb-0 px-0 px-sm-auto">
						<v-row justify="center">
							<v-col sm="12" md="10" lg="10" class="pb-0">
								<v-row
									justify-sm="center"
									justify-md="space-between"
									align="center"
								>
									<v-col sm="10" md="7" class="d-none d-md-flex">
										<v-slider
											v-model="curStage"
											:max="about[$i18n.locale].slides.length + 1"
											class="slider"
											step="1"
											ticks="always"
											tick-size="10"
											hide-details
											dark
										/>
									</v-col>
									<v-col
										xs="12"
										sm="12"
										md="auto"
										lg="auto"
										class="pa-0"
										:class="{ 'justify-center': isSmAndDown }"
									>
										<v-card
											class="pa-4 pt-0 use-contacts-container"
											@click="showLastStage"
										>
											<v-card-title
												class="justify-center font-weight-bold footer-padding pt-2 pt-sm-3 pt-md-4 pt-lg-5"
												:style="getUseContactsTitleFont"
												>{{ $t('contact.title') }}</v-card-title
											>
											<v-card-actions
												class="pa-0 justify-center"
												:style="getUseContactsActionFont"
											>
												<div class="contacts-action font-weight-bold">
													{{ $t('contact.subTitle') }}
												</div>
											</v-card-actions>
										</v-card>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-footer>
				</OpacityBox>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';
	import posed from 'vue-pose';
	import PreviewPage from '@/components/preview-page.vue';

	@Component({
		layout: 'immediate',
		transition: 'page',
		head: {
			title: 'About us',
		},
		components: {
			PreviewPage,
			Slogan: posed.p({
				visible: { opacity: 1, delay: ({ delay }) => delay },
				hidden: { opacity: 0 },
			}),
			OpacityBox: posed.div({
				visible: { opacity: 1, delay: ({ delay }) => delay },
				hidden: { opacity: 0 },
			}),
			TextSlider: posed.p({
				visible: {
					opacity: 1,
					transition: { duration: 500 },
				},
				hidden: { opacity: 0 },
			}),
		},
	})
	export default class AboutPage extends Vue {
		@Getter('AboutModule/getStage') about;
		@Getter('getPageRouteById') getPageRouteById;
		@Getter('getContactBarVisibility') isShowContactBar;
		@Getter('visibilityLoader') visibilityLoader;
		@Getter('getIsHideAnimationContent') getIsHideAnimationContent;
		@Mutation('changeContactBar') changeContactBar;

		curStage: number = 0;
		isSloganAnimation: boolean = false;
		isContactAnimation: boolean = false;
		isTextSliderAnimation: boolean = false;
		stageText: number = 0;
		stageAbout: number = 0;

		showLastStage() {
			this.curStage = this.about[this.$i18n.locale].slides.length + 1;
		}

		swipeLeft() {
			if (this.curStage < this.about[this.$i18n.locale].slides.length + 1) {
				this.curStage = this.curStage + 1;
			} else {
				this.curStage = 0;
			}
		}
		swipeRight() {
			if (this.curStage > 0) {
				this.curStage = this.curStage - 1;
			}
		}
		showLastStage() {
			this.curStage = this.about[this.$i18n.locale].slides.length + 1;
		}

		backToStart() {
			this.curStage = 0;
			this.changeContactBar(false);
		}

		get getFirstStageAnimationDelay() {
			const delayWithLoader = 2500;
			const delayWithoutLoader = 500;
			return this.visibilityLoader ? delayWithLoader : delayWithoutLoader;
		}

		get getSecondStageAnimationDelay() {
			const delayWithLoader = 3000;
			const delayWithoutLoader = 600;
			return this.visibilityLoader ? delayWithLoader : delayWithoutLoader;
		}

		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}
		get isSmAndDown() {
			return this.$breakpoint ? this.$breakpoint.is.smAndDown : false;
		}
		get isLgAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
		}

		get getSlideTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('aboutSlideTitleFont')}px` };
		}
		get getSlideContentFont() {
			return { fontSize: `${this.getAdaptiveSize('slideContentFont')}px` };
		}
		get getPreviewTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('previewTitle')}px` };
		}
		get getPreviewSubTitleFont() {
			return {
				fontSize: `${this.getAdaptiveSize('previewSubtitle')}px`,
			};
		}
		get getPreviewInfoFont() {
			return { fontSize: `${this.getAdaptiveSize('previewInfo')}px` };
		}
		get getUseContactsTitleFont() {
			return {
				fontSize: `${this.getAdaptiveSize('useContactsTitle')}px`,
			};
		}
		get getUseContactsActionFont() {
			return {
				fontSize: `${this.getAdaptiveSize('useContactsAction')}px`,
			};
		}

		@Watch('curStage')
		onChangeCurStage(value: number) {
			if (value === this.about[this.$i18n.locale].slides.length + 1) {
				this.changeContactBar(true);
			} else {
				this.changeContactBar(false);
			}
			this.isTextSliderAnimation = false;
			if (
				this.curStage > 0 &&
				this.curStage < this.about[this.$i18n.locale].slides.length + 2
			) {
				this.stageAbout = this.curStage > 1 ? this.curStage - 1 : this.curStage;
				setTimeout(() => {
					this.stageText =
						this.curStage > 1
							? this.stageAbout
							: this.stageAbout - this.curStage;
				}, 250);
				setTimeout(() => {
					this.isTextSliderAnimation = true;
				}, 500);
			} else {
				this.stageAbout = this.curStage;
				this.stageText = 0;
			}
		}

		mounted() {
			this.isSloganAnimation = true;
			this.isContactAnimation = true;
		}

		beforeDestroy() {
			this.changeContactBar(false);
		}
	}
</script>

<style lang="sass">
	.slider
		.v-slider__tick
			border-radius: 50%
			background: #363636
			cursor: pointer

		.v-slider__tick--filled
			background: white

	.preview-section
		height: 100vh

	.slide-container
		height: 97vh
		color: white

	.slide-container-mobile
		height: 90vh
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
		background-color: rgba(78, 79, 80, 0.3)
		color: white
		position: relative

	.border-right
		border-right: 16px solid white

	.use-contacts-container
		width: auto
		border-radius: 0 !important

	.contacts-action
		text-transform: uppercase
		border-bottom: 2px solid #212121

	.rotated-phraze
		position: fixed
		right: 8vw
		color: white
		writing-mode: vertical-rl
		transform: scaleX(-1) scaleY(-1)

		&:hover
			opacity: 0.8

	.rotated-phraze-md
		top: calc(50vh - 163px)
		font-size: 30px

	.rotated-phraze-lg
		top: calc(50vh - 230px)
		font-size: 2.5rem
		right: 9vw

	.rotate
		transform: rotate(90deg)

	.pointer
		cursor: pointer

	.back-to-start
		font-size: 35px !important
		opacity: 0.45
		top: calc(50vh - 185px) !important

	.footer-padding
		padding: 6% 12% 0
		white-space: nowrap

	.footer-section-about
		position: relative
		height: 60vh
		color: white

	.return-section
		width: 90%
		height: 40vh
		background: #282828
		opacity: .5
		cursor: pointer
		font-weight: normal
		font-style: normal

		p
			color: #696969

		.text-sm
			font-size: 30px

		.text-xs
			font-size: 25px

	.arrowLeft
		color: #2f2f2f
		font-size: 50px
</style>
