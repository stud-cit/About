<template>
	<v-row
		class="preview-section"
		justify="center"
		align="center"
		:class="isAboutPage ? 'preview-section-about' : 'preview-section-not-about'"
	>
		<v-col cols="12" lg="12" xl="12">
			<v-row
				class="ma-0 ml-sm-2"
				justify="space-around"
				align="end"
				:class="{
					'preview-margin': iconDown,
					'preview-wrapper': !isXsOnly,
					'preview-wrapper-mobile': isXsOnly,
				}"
			>
				<v-col
					cols="12"
					order="1"
					order-sm="1"
					class="pa-0 line-height"
					:class="{ 'text-center': isXsOnly }"
				>
					<div class="d-block">
						<ContentBlock
							:pose="isStartAnimation ? 'visible' : 'hidden'"
							:delay="getAnimationDelay"
							class="bold-preview"
							:class="{
								'text-uppercase': isAboutPage,
								'title-about': isLgAndUp && isAboutPage,
							}"
							:style="getPreviewTitleFont"
						>
							{{ title }}
						</ContentBlock>
						<ContentBlock
							:pose="isStartAnimation ? 'visible' : 'hidden'"
							:delay="getAnimationDelay"
							class="bold-preview"
							:style="getPreviewTitleFont"
						>
							{{ subtitle }}
						</ContentBlock>
					</div>
				</v-col>
				<v-col cols="12" order="3" order-sm="2">
					<OpacityBlock
						:pose="isStartAnimation ? 'visible' : 'hidden'"
						:delay="getAnimationDelay"
					>
						<v-row justify="space-around" justify-sm="start">
							<v-col cols="auto" order="1" order-sm="1">
								<div class="arrow mr-3" @click="handleNavigatingPage(false)">
									<v-img src="/arrow-left.svg" width="45px" />
								</div>
							</v-col>
							<v-col cols="auto" order="3" order-sm="2">
								<div class="arrow mr-3" @click="handleNavigatingPage(true)">
									<v-img src="/arrow-right.svg" width="45px" />
								</div>
							</v-col>
							<v-col
								cols="auto"
								order="2"
								order-sm="3"
								:class="{ rotate: isXsOnly }"
							>
								<nuxt-link
									class="square-container"
									:to="
										`/${
											$i18n.locale !== $i18n.defaultLocale ? $i18n.locale : ''
										}`
									"
								>
									<div class="squares mr-3 squareOne"></div>
									<div class="squares mr-3 squareTwo"></div>
									<div class="squares squareThree"></div>
								</nuxt-link>
							</v-col>
						</v-row>
					</OpacityBlock>
				</v-col>

				<v-col cols="12" order="2" order-sm="3">
					<v-row class="d-none d-sm-flex font-weight-regular line-height-1">
						<ContentBlock
							:pose="isStartAnimation ? 'visible' : 'hidden'"
							:delay="getAnimationDelay"
							:style="getPreviewSubTitleFont"
						>
							{{ description }}
						</ContentBlock>
					</v-row>
					<v-row justify="center" class="d-flex d-sm-none pl-0">
						<img class="pointer-icon" src="/pointer-mobile.svg" />
					</v-row>
					<v-row justify="center" justify-sm="start" class="mt-4">
						<ContentBlock
							:pose="isStartAnimation ? 'visible' : 'hidden'"
							:delay="getAnimationDelay"
							class="gray font-weight-regular"
							:style="getPreviewInfoFont"
						>
							{{ $t(getScrollInfo) }}
						</ContentBlock>
					</v-row>
				</v-col>
			</v-row>
			<v-row
				v-show="isShowUseContacts"
				v-scroll="handleScroll"
				class="pa-0 use-contacts-container"
				justify="end"
				no-gutters
			>
				<v-col cols="12" sm="auto">
					<v-card
						class="pa-4 pt-0"
						:class="isXsOnly ? 'card-contacts' : 'card-contacts-sm-and-up'"
						@click="scrollToFooter"
					>
						<v-card-title
							class="justify-center font-weight-bold footer-padding pt-2 pt-sm-3 pt-md-4 pt-lg-5 "
							:style="getUseContactsTitleFont"
							>{{ $t('contact.title') }}</v-card-title
						>
						<v-card-actions
							class="pa-0 justify-center font-weight-bold"
							:style="getUseContactsActionFont"
						>
							<div class="contacts-action">{{ $t('contact.subTitle') }}</div>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col sm="1"></v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import posed from 'vue-pose';

@Component({
	components: {
		OpacityBlock: posed.div({
			visible: { opacity: 1, delay: ({ delay }) => delay },
			hidden: { opacity: 0 },
		}),
		ContentBlock: posed.p({
			visible: { opacity: 1, y: 0, delay: ({ delay }) => delay },
			hidden: { opacity: 0, y: 20 },
		}),
	},
	props: ['title', 'subtitle', 'description', 'iconDown'],
})
export default class PreviewPage extends Vue {
	@Getter('getPageByRoute') getPageByRoute;
	@Getter('getPageId') pageId;
	@Getter('getPageRouteById') getPageRouteById;
	@Getter('visibilityLoader') visibilityLoader;

	isShowUseContacts: boolean = true;
	aboutPageId: number = 1;
	portfolioPageId: number = 4;
	weofferPageId: number = 2;

	// animation
	isStartAnimation: boolean = false;
	animationDelayWithLoader: number = 2000;
	animationDelayWithoutLoader: number = 200;

	handleScroll(): void {
		const windowHeight = window.innerHeight;
		const scrollHeight = document.body.scrollHeight;
		const scrollToFooter = scrollHeight - windowHeight * 2;
		const isPortfolioPage = this.pageId === this.portfolioPageId;
		const isWeOfferPage = this.pageId === this.weofferPageId;

		// on porfolio page we have to hide if any scroll we have
		if (isPortfolioPage && window.scrollY > 0) {
			this.isShowUseContacts = false;
		} else if (isWeOfferPage && window.scrollY > 0) {
			this.isShowUseContacts = false;
		} else if (window.scrollY > scrollToFooter) {
			this.isShowUseContacts = false;
		} else {
			this.isShowUseContacts = true;
		}
	}

	scollToContent(): void {
		window.scrollTo({ left: 0, top: window.innerHeight, behavior: 'smooth' });
	}

	scrollToFooter() {
		window.scrollTo({
			left: 0,
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	}

	handleNavigatingPage(toRight: boolean) {
		const newPageIndex = toRight ? this.pageId + 1 : this.pageId - 1;
		const nextPage = this.getPageRouteById(newPageIndex);
		this.$router.replace(this.localePath(nextPage));
	}

	get getScrollInfo() {
		if (this.isAboutPage) {
			if (this.isMdAndUp) {
				return 'about.scrollPointNavigation';
			} else {
				return 'common.swipe';
			}
		} else {
			return 'common.scroll';
		}
	}

	get isAboutPage() {
		return this.pageId === this.aboutPageId;
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

	get getAnimationDelay() {
		return this.visibilityLoader
			? this.animationDelayWithLoader
			: this.animationDelayWithoutLoader;
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
	get getPreviewTitleFont() {
		return {
			fontSize: `${this.getAdaptiveSize('previewTitle')}px`,
		};
	}

	mounted() {
		this.isStartAnimation = true;

		// increase animation delay to prevent staring too early
		this.animationDelayWithoutLoader = 350;

		// initial check
		this.handleScroll();
	}
}
</script>

<style lang="sass">
.preview-section

	.use-contacts-container
		width: 100vw
		position: fixed
		right: 0
		bottom: 0
		z-index: 10

		.card-contacts
			border-radius: 0

		.card-contacts-sm-and-up
			border-radius: 0 !important

		.contacts-action
			text-transform: uppercase
			border-bottom: 2px solid black

.preview-section-about
	height: 97vh !important

.preview-section-not-about
	height: 100vh !important

.preview-wrapper
	height: 70vh
	color: white

.preview-wrapper-mobile
	height: 60vh
	color: white

.preview-margin
	margin-bottom: 0vh
	margin-top: 13vh

.arrow
	font-size: 1.8rem
	text-align: center
	cursor: pointer

.square-container
	display: flex

.squares
	height: 40px
	width: 40px
	border-radius: 20%
	border: 4px solid white

.squareOne
	clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)

.squareThree
	clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%)

.scroll-bottom-icon
	position: absolute
	top: 90vh
	z-index: 10
	opacity: 0.5
	border-radius: 50%
	border: 1px solid rgba(255, 255, 255, 0.5)
	padding: 30px

.icon-down
	position: absolute
	top: 50%
	transform: translateY(-50%)

.rotate
	transform: rotate(90deg)
.gray
	color: gray

.line-height
	line-height: 1.2

.line-height-1
	line-height: 1

.title-about
	width: 80%

.bold-preview
	font-weight: 800 !important
	font-style: normal

.footer-padding
	padding: 6% 12% 0
	white-space: nowrap
</style>
