<template>
	<v-container fluid cdclass="py-0 ma-0">
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<v-window v-model="curStage" continuous dark>
					<v-window-item>
						<v-col cols="12" class="pa-0 slide-container">
							<PreviewPage
								:title="$t('common.companyName')"
								:description="$t('about.previewDescription')"
								:icon-down="false"
							/>
						</v-col>
					</v-window-item>
					<v-window-item
						v-for="(slide, index) in about[$i18n.locale].slides"
						:key="index"
					>
						<v-row justify="start" align="center" class="slide-container">
							<v-col cols="12" md="10" lg="10">
								<v-row>
									<v-col col="12">
										<div
											class="font-weight-bold ma-2 white--text text-uppercase"
											:style="getSlideTitleFont"
										>
											{{ $t('common.companyName') }}
										</div>
										<div
											class="px-xl-12 px-lg-8 px-md-8 px-sm-8 px-xs-8 py-xl-12 py-lg-2 py-md-8 py-sm-8 px-4 py-2 slide-content font-weight-light"
											:style="getSlideContentFont"
										>
											<p class="py-md-12">{{ slide }}</p>
										</div>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-window-item>
					<v-window-item class="slide-container"></v-window-item>
				</v-window>

				<p
					class="d-none d-md-block rotated-phraze font-weight-light"
					:class="isLgAndUp ? 'rotated-phraze-lg' : 'rotated-phraze-md'"
					v-if="curStage <= about[$i18n.locale].slides.length"
				>
					{{ $t('common.slogan') }}
				</p>
				<p
					class="font-weight-light rotated-phraze pointer back-to-start"
					:class="isLgAndUp ? 'rotated-phraze-lg' : 'rotated-phraze-md'"
					v-if="curStage > about[$i18n.locale].slides.length"
					@click="backToStart"
				>
					{{ $t('about.backToStart') }}
				</p>

				<v-footer absolute color="transparent" class="pb-0 px-0 px-sm-auto">
					<v-row justify="center">
						<v-col sm="12" md="10" lg="10" class="pb-0">
							<v-row
								justify-sm="center"
								justify-md="space-between"
								align="center"
							>
								<v-col sm="10" md="7" class="d-none d-sm-flex">
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
										@click="() => changeContactBar(true)"
									>
										<v-card-title
											class="justify-center"
											:style="getUseContactsTitleFont"
											>{{ $t('contact.title') }}</v-card-title
										>
										<v-card-actions
											class="pa-0 justify-center"
											:style="getUseContactsActionFont"
										>
											<div class="contacts-action">
												{{ $t('contact.subTitle') }}
											</div>
										</v-card-actions>
									</v-card>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-footer>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import PreviewPage from '@/components/preview-page.vue';

@Component({
	layout: 'immediate',
	transition: 'page',
	head: {
		title: 'About us',
	},
	components: {
		PreviewPage,
	},
})
export default class AboutPage extends Vue {
	@Getter('AboutModule/getStage') about;
	@Getter('getPageId') pageId;
	@Getter('getPageRouteById') getPageRouteById;
	@Getter('getContactBarVisibility') isShowContactBar;
	@Mutation('changePageId') changePageId;
	@Mutation('changeContactBar') changeContactBar;
	curStage: number = 0;

	backToStart() {
		this.curStage = 0;
		this.changeContactBar(false);
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
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 12,
				sm: 20,
				md: 20,
				lg: 30,
			})}px`,
		};
	}
	get getSlideContentFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 15,
				sm: 20,
				md: 20,
				lg: 30,
			})}px`,
		};
	}
	get getPreviewTitleFont() {
		return { fontSize: `${this.getCommonAdaptiveFontSize('previewTitle')}px` };
	}
	get getPreviewSubTitleFont() {
		return {
			fontSize: `${this.getCommonAdaptiveFontSize('previewSubtitle')}px`,
		};
	}
	get getPreviewInfoFont() {
		return { fontSize: `${this.getCommonAdaptiveFontSize('previewInfo')}px` };
	}
	get getUseContactsTitleFont() {
		return {
			fontSize: `${this.getCommonAdaptiveFontSize('useContactsTitle')}px`,
		};
	}
	get getUseContactsActionFont() {
		return {
			fontSize: `${this.getCommonAdaptiveFontSize('useContactsAction')}px`,
		};
	}

	@Watch('curStage')
	onChangeCurStage(value: number) {
		if (value === this.about[this.$i18n.locale].slides.length + 1) {
			this.changeContactBar(true);
		}
	}

	@Watch('isShowContactBar')
	onChangeContactBar(curValue: boolean, prevValue: boolean) {
		// when we close contact bar - show prev stage
		if (prevValue === true) {
			this.curStage = this.curStage - 1;
		} else {
			this.curStage = this.about[this.$i18n.locale].slides.length + 1;
		}
	}

	created() {
		this.changePageId(1);
	}

	mounted() {}
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
	background-color: rgba(78, 79, 80, 0.3)
	color: white
	position: relative

// .spacer
// 	flex-grow: 0.65 !important

.use-contacts-container
	width: auto
	border-radius: 0

.contacts-action
	text-transform: uppercase
	border-bottom: 2px solid black

.rotated-phraze
	position: fixed
	right: 8vw
	color: white
	writing-mode: vertical-rl
	transform: scaleX(-1) scaleY(-1)

.rotated-phraze-md
	top: calc(50vh - 163px)
	font-size: 30px

.rotated-phraze-lg
	top: calc(50vh - 270px)
	font-size: 2.5rem

.rotate
	transform: rotate(90deg)

.pointer
	cursor: pointer

.back-to-start
	font-size: 35px !important
	opacity: 0.45
	top: calc(50vh - 185px) !important
</style>
