<template>
	<v-app>
		<client-only>
			<video-background
				id="video-bg"
				:src="getDynamicAssets(cover.video)"
				:poster="getDynamicAssets(cover.image)"
				autoplay
			/>
		</client-only>
		<v-app-bar
			id="header"
			:class="isShowNormalHeader ? 'pt-5 pt-lg-7' : 'pt-2 pb-1 mini-header'"
			:color="isShowNormalHeader ? 'transparent' : ''"
			app
			flat
			v-scroll="handleScroll"
		>
			<v-row class="mx-1 mx-sm-0" justify="center" align="center">
				<v-col cols="12" sm="10" order-md="2" class="pa-0">
					<v-row justify="space-between" align="center">
						<v-col
							:cols="isShowNormalHeader ? 'auto' : '2'"
							class="pa-0 d-none d-sm-flex"
						>
							<OpacityBox
								:pose="
									isStartAnimation && !getIsHideAnimationContent
										? 'visible'
										: 'hidden'
								"
								:delay="getAnimationDelay"
							>
								<v-img
									@click="navigateToHomePage"
									class="logo-img"
									src="/logo.svg"
								/>
							</OpacityBox>
						</v-col>
						<v-col cols="6" md="6" lg="7" xl="6" class="d-none d-md-flex">
							<Navs
								class="nav-panel"
								:pose="
									isStartAnimation && !getIsHideAnimationContent
										? 'visible'
										: 'hidden'
								"
								:delay="getAnimationDelay"
							>
								<v-col
									class="pa-0 nav-links"
									cols="auto"
									v-for="(page, index) in pages[$i18n.locale]"
									:key="index"
								>
									<ContentBox>
										<v-btn
											class="px-0 desktop-link"
											active-class="active-desktop-link"
											:to="localePath(page.link)"
											:ripple="false"
											replace
											exact
											dark
											text
										>
											<span :style="getTotalPagesFont" class="not-uppercase">
												{{ page.title }}
											</span>
										</v-btn>
									</ContentBox>
								</v-col>
							</Navs>
						</v-col>
						<v-btn
							class="d-flex d-md-none"
							@click="toggleVisibilityMobileMenu"
							icon
							:class="{ 'gumburger-mobile-position': isXsOnly }"
							color="white"
						>
							<v-icon size="50">mdi-menu</v-icon>
						</v-btn>
					</v-row>
				</v-col>
			</v-row>
		</v-app-bar>
		<v-row
			class="mx-2 mt-sm-4 mt-md-5 mt-lg-6 mx-sm-0 page-info"
			justify="start"
			:class="{ 'page-info-mobile': isXsOnly }"
		>
			<v-col v-show="isShowNormalHeader" cols="auto" offset="0" offset-sm="1">
				<OpacityBox
					:pose="
						isStartAnimation && !getIsHideAnimationContent
							? 'visible'
							: 'hidden'
					"
					:delay="getAnimationDelay"
				>
					<p class="bold-italic-preview d-flex mt-md-3">
						<span :style="getPageIndexFont"
							>0{{ pageIndex($i18n.locale) }}</span
						>
						<span
							class="total-pages mt-1 mt-sm-2"
							:style="getPageTotalIndexFont"
						>
							/04
						</span>
					</p>
				</OpacityBox>
			</v-col>
		</v-row>
		<v-content class="pt-0">
			<v-container fluid class="pa-0">
				<nuxt />
				<contact-bar />
			</v-container>
		</v-content>
		<v-dialog
			v-model="isShowMobileMenu"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
			scrollable
		>
			<v-btn
				class="index close-menu"
				@click="toggleVisibilityMobileMenu"
				icon
				large
				fixed
				right
			>
				<v-icon size="50" color="black">mdi-close</v-icon>
			</v-btn>
			<v-list id="pages-list-container">
				<v-list-item-group class="pages-list">
					<v-list-item
						v-for="(page, index) in pages[$i18n.locale]"
						class="px-0"
						:key="index"
					>
						<v-btn
							class="text-center display-2 page-link font-weight-bold"
							exact-active-class="page-link-active"
							@click="toggleVisibilityMobileMenu()"
							:to="localePath(page.link)"
							replace
							exact
							nuxt
						>
							<span class="page-link-title">{{ page.title }}</span>
						</v-btn>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-dialog>
	</v-app>
</template>

<script lang="ts">
	import posed from 'vue-pose';
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
		components: {
			ContactBar: () => import('~/components/contact-bar'),
			Navs: posed.div({
				visible: {
					beforeChildren: true,
					staggerChildren: 50,
					delayChildren: ({ delay }) => delay,
				},
				hidden: {
					afterChildren: true,
				},
			}),
			OpacityBox: posed.div({
				visible: { opacity: 1, delay: ({ delay }) => delay },
				hidden: { opacity: 0 },
			}),
			ContentBox: posed.div({
				visible: { opacity: 1, y: 0 },
				hidden: { opacity: 0, y: 20 },
			}),
		},
	})
	export default class ImmediatetLayout extends Vue {
		@Getter('PageModule/getPageIndex') pageIndex;
		@Getter('PageModule/getCover') cover;
		@Getter('PageModule/getPage') page;
		@Getter('PageModule/getPages') pages;
		@Getter('getIsHideAnimationContent') getIsHideAnimationContent;
		@Getter('visibilityLoader') visibilityLoader;
		@Mutation('changeScrollBar') changeScrollBar;
		@Mutation('changeIsHideAnimationContent') changeIsHideAnimationContent;

		isShowMobileMenu: boolean = false;
		isStartAnimation: boolean = false;
		isShowNormalHeader: boolean = true;

		/**
		 * Set delay to play hiding content animations
		 */
		navigateToHomePage(): void {
			this.changeIsHideAnimationContent(true);
			setTimeout(
				() => this.$router.push(this.localePath({ name: 'index' })),
				500,
			);
		}

		handleScroll(): void {
			const currentScroll = window.scrollY;
			const windowHeight = window.innerHeight;
			const scrollHeight = document.body.scrollHeight;
			const scrollToFooter = scrollHeight - windowHeight * 1.3;

			// show normal header version when scroll to footer
			if (currentScroll > scrollToFooter) {
				this.isShowNormalHeader = true;
			} else {
				currentScroll > 10 && this.$breakpoint.is.mdAndUp
					? (this.isShowNormalHeader = false)
					: (this.isShowNormalHeader = true);
			}
		}
		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}

		get isMdAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
		}

		get getAnimationDelay() {
			return this.visibilityLoader ? 1500 : 0;
		}

		get getPageIndexFont() {
			return { fontSize: `${this.getAdaptiveSize('pageIndexFont')}px` };
		}
		get getPageTotalIndexFont() {
			return { fontSize: `${this.getAdaptiveSize('pageTotalIndexFont')}px` };
		}
		get getTotalPagesFont() {
			if (this.isShowNormalHeader) {
				return { fontSize: `${this.getAdaptiveSize('totalPagesFont')}px` };
			} else {
				return { fontSize: `${this.getAdaptiveSize('totalMiniPagesFont')}px` };
			}
		}

		toggleVisibilityMobileMenu() {
			this.isShowMobileMenu = !this.isShowMobileMenu;
		}

		mounted() {
			this.isStartAnimation = true;
		}
	}
</script>

<style lang="sass">
	#video-bg
		height: 100vh
		max-height: 100vh
		position: fixed

	#header
		z-index: 30
		height: auto !important
		color: #FFFFFF
		transition: all ease 0.5s

		.desktop-link
			font-weight: 600

			:hover
				opacity: 0.5

			::before
				opacity: 0

		.active-desktop-link
			border-bottom: 4px solid #FFFFFF
			border-radius: unset

		&.mini-header
			background: rgba(0, 0, 0, 0.8)

	.nav-panel
		display: flex
		align-items: center
		justify-content: space-between
		width: 100%

		.v-btn:before
			background-color: transparent

	.logo-img
		cursor: pointer

	.nav-links
		align-items: center

	.nav-link
		font-size: 15px

	.nav-link-desktop
		font-size: 25px

	.gumburger-mobile-position
		position: absolute !important
		right: 0
		margin-right: 4vw

	.page-info
		position: fixed
		width: 100%
		top: 7vh
		z-index: 5
		color: #FFFFFF
		font-weight: 700
		font-style: italic

		.total-pages
			vertical-align: top

	.page-info-mobile
		top: 3vh

	#pages-list-container
		height: 100vh
		display: flex
		align-items: center

		.pages-list
			width: 100vh
			height: 90vh
			display: flex
			flex-direction: column
			justify-content: space-between

		.page-link
			width: 100%
			height: 100%
			background: #FFFFFF
			color: #FFFFFF
			box-shadow: none

			.page-link-title
				font-size: 35px
				color: #000000

		.page-link-active .page-link-title
			border-bottom: 2px solid #000000

	.imageCover
		position: fixed !important
		width: 100vw
		height: 100vh

	.theme--light.v-btn::before
		border-radius: 0 !important
		border: 0 !important

	.theme--light.v-btn:hover::before
		border-radius: 0 !important
		border: 0 !important

	.v-dialog--fullscreen

		.v-btn--round
			border-radius: 0 !important

	.not-uppercase
		text-transform: none !important

	.bold-italic-preview
		font-weight: 800
		font-style: italic

	.index
		z-index: 10

	.close-menu
		display: flex
		justify-content: flex-end
</style>
