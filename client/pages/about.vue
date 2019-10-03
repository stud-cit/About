<template>
	<v-container class="py-0">
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<v-window v-model="curStage" continuous dark>
					<v-window-item>
						<PreviewPage
							:title="about.previewTitle"
							cols="12"
							sm="9"
							:subtitle="about.previewSubtitle"
							:description="about.previewDescription"
							:icon-down="false"
						/>
					</v-window-item>

					<v-window-item v-for="(slide, index) in about.slides" :key="index">
						<v-row justify="center" align="center" class="slide-container">
							<v-col cols="12">
								<v-row>
									<v-col col="12">
										<div
											class="font-weight-bold ma-2 white--text"
											:style="getSlideTitleFont"
										>
											Student centr of information technology
										</div>
										<div
											class="px-8 py-12 slide-content font-weight-light"
											:style="getSlideContentFont"
										>
											{{ slide }}
										</div>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-window-item>
					<v-window-item class="slide-container"></v-window-item>
				</v-window>
			</v-col>
		</v-row>
		<p
			class="d-none d-md-block rotated-phraze font-weight-light"
			:class="isLgAndUp ? 'rotated-phraze-lg' : 'rotated-phraze-md'"
			v-if="curStage <= about.slides.length"
		>
			{{ $t('about.tagLine') }}
		</p>
		<p
			class="d-none d-md-block font-weight-light rotated-phraze pointer"
			:class="isLgAndUp ? 'rotated-phraze-lg' : 'rotated-phraze-md'"
			v-if="curStage > about.slides.length"
			@click="backToStart"
		>
			{{ $t('about.backToStart') }}
		</p>

		<v-footer absolute color="transparent" class="pb-0 px-0 px-sm-auto">
			<v-row justify="center">
				<v-col sm="10" md="12" class="pb-0">
					<v-row justify-sm="end" justify-md="space-around" align="center">
						<v-col sm="12" md="8" class="px-0 d-none d-sm-flex">
							<v-slider
								v-model="curStage"
								:max="about.slides.length + 1"
								class="slider"
								step="1"
								ticks="always"
								tick-size="10"
								hide-details
								dark
							/>
						</v-col>
						<v-col xs="12" sm="auto" class="pb-0">
							<v-card
								class="pa-4 pt-0 use-contacts-container"
								@click="() => changeContactBar(true)"
							>
								<v-card-title
									class="justify-center"
									:style="getUseContactsTitleFont"
									>{{ $t('contact.titleShort') }}</v-card-title
								>
								<v-card-actions
									class="pa-0 contacts-action justify-center"
									:style="getUseContactsActionFont"
									>{{ $t('contact.preTitleShort') }}</v-card-actions
								>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-footer>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import PreviewPage from '@/components/preview-page.vue';

@Component({
	layout: 'immediate',
	head: {
		title: 'About us',
	},
	components: {
		PreviewPage,
	},
})
export default class AboutPage extends Vue {
	@Getter('getAboutStage') about;
	@Getter('getPageId') pageId;
	@Getter('getPageRouteById') getPageRouteById;
	@Getter('getContactBarVisibility') isShowContactBar;
	@Mutation('changePageId') changePageId;
	@Mutation('changeContactBar') changeContactBar;
	curStage: number = 0;

	handleNavigatingPage(toRight: boolean) {
		const newPageIndex = toRight ? this.pageId + 1 : this.pageId - 1;
		const nextPage = this.getPageRouteById(newPageIndex);
		this.$router.push(nextPage);
	}
	backToStart() {
		this.curStage = 0;
		this.changeContactBar(false);
	}

	get isXsOnly() {
		return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
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
		if (value === this.about.slides.length + 1) {
			this.changeContactBar(true);
		}
	}

	@Watch('isShowContactBar')
	onChangeContactBar(curValue: boolean, prevValue: boolean) {
		// when we close contact bar - show prev stage
		if (prevValue === true) {
			this.curStage = this.curStage - 1;
		} else {
			this.curStage = this.about.slides.length + 1;
		}
	}

	created() {
		this.changePageId(1);
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

.use-contacts-container
	width: auto
	border-bottom-left-radius: 0
	border-bottom-right-radius: 0

.contacts-action
	text-transform: uppercase
	text-decoration: underline

.rotated-phraze
	position: fixed
	right: 2vw
	color: white
	writing-mode: vertical-rl
	transform: scaleX(-1) scaleY(-1)

.rotated-phraze-md
	top: calc(50vh - 163px)
	font-size: 30px

.rotated-phraze-lg
	top: calc(50vh - 272px)
	font-size: 50px

.rotate
	transform: rotate(90deg)

.pointer
	cursor: pointer
</style>
