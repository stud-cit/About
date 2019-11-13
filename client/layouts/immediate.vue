<template>
	<v-app>
		<!-- shows video on md using sources otherwise using default src -->
		<!-- TODO: (vadim) change to videoMobile when get proper videos-->
		<client-only>
			<video-background
				id="video-bg"
				:sources="[
					{
						src: videoBg.videoPc
							? getDynamicAssets(`/videos${videoBg.videoPc}`)
							: '',
						res: 600,
						autoplay: true,
						poster: videoBg.cover
							? getDynamicAssets(`/images/covers${videoBg.cover}`)
							: '',
					},
				]"
				:src="
					videoBg.videoPc ? getDynamicAssets(`/videos${videoBg.videoPc}`) : ''
				"
				:poster="
					videoBg.cover
						? getDynamicAssets(`/images/covers${videoBg.cover}`)
						: ''
				"
				:overlay="videoBg.gradient"
			/>
		</client-only>
		<v-app-bar
			id="header"
			:class="scrollNumber ? 'pt-5 pt-lg-7' : 'pt-2 pb-1 mini-header'"
			:color="scrollNumber ? 'transparent' : ''"
			app
			flat
			v-scroll="handleScroll"
		>
			<v-row class="mx-1 mx-sm-0" justify="center" align="center">
				<v-col cols="12" sm="10" order-md="2" class="pa-0">
					<v-row justify="space-between" align="center">
						<v-col
							:cols="scrollNumber ? 'auto' : '2'"
							class="pa-0 d-none d-sm-flex"
						>
							<OpacityBox
								:pose="isStartAnimation ? 'visible' : 'hidden'"
								:delay="getAnimationDelay"
							>
								<nuxt-link :to="localePath({ name: 'index' })" nuxt>
									<v-img src="/logo.svg" />
								</nuxt-link>
							</OpacityBox>
						</v-col>
						<v-col cols="6" md="6" lg="7" xl="6" class="d-none d-md-flex">
							<Navs
								class="nav-panel"
								:pose="isStartAnimation ? 'visible' : 'hidden'"
								:delay="getAnimationDelay"
							>
								<v-col
									class="pa-0 nav-links"
									cols="auto"
									v-for="(page, index) in pages"
									:key="index"
								>
									<ContentBox>
										<v-btn
											class="px-0 desktop-link"
											active-class="active-desktop-link"
											:to="localePath(page.to)"
											:ripple="false"
											replace
											exact
											dark
											text
										>
											<span :style="getTotalPagesFont" class="not-uppercase">
												{{ $t(page.title) }}
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
			<v-col v-show="scrollNumber" cols="auto" offset="0" offset-sm="1">
				<OpacityBox
					:pose="isStartAnimation ? 'visible' : 'hidden'"
					:delay="getAnimationDelay"
				>
					<p class="bold-italic-preview d-flex">
						<span :style="getPageIndexFont">0{{ pageId }}</span>
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
				class="index"
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
					<v-list-item v-for="(page, index) in pages" class="px-0" :key="index">
						<v-btn
							class="text-center display-2 page-link font-weight-bold"
							exact-active-class="page-link-active"
							@click="toggleVisibilityMobileMenu()"
							:to="localePath(page.to)"
							replace
							exact
							nuxt
						>
							<span class="page-link-title">{{ $t(page.title) }}</span>
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
import ContactBar from '@/components/contact-bar.vue';

@Component({
	components: {
		'contact-bar': ContactBar,
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
	@Getter('getPageByRoute') getPageByRoute;
	@Getter('getPageId') pageId;
	@Getter('getPageStage') pages;
	@Getter('getPageVideoBg') videoBg;
	@Getter('visibilityLoader') visibilityLoader;
	@Mutation('changeScrollBar') changeScrollBar;

	isShowMobileMenu: boolean = false;
	isStartAnimation: boolean = false;
	scrollNumber: boolean = true;

	handleScroll(): void {
		const currentScroll = window.scrollY;
		currentScroll > 10 && this.$breakpoint.is.mdAndUp
			? (this.scrollNumber = false)
			: (this.scrollNumber = true);
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
		if (this.scrollNumber) {
			return { fontSize: `${this.getAdaptiveSize('totalPagesFont')}vw` };
		} else {
			return { fontSize: `${this.getAdaptiveSize('totalMiniPagesFont')}vw` };
		}
	}

	toggleVisibilityMobileMenu() {
		this.isShowMobileMenu = !this.isShowMobileMenu;
	}
	mounted() {
		this.isStartAnimation = true;

		// hide scrollBar on any route change
		this.$router.beforeHooks.push((prevRoute, nextRoute, next) => {
			this.changeScrollBar(false);
			setTimeout(() => next(), 25);
		});
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
	color: rgba(255, 255, 255, 1)
	transition: all ease .5s

	.desktop-link
		font-weight: 600
		&::before
			opacity: 0

	.active-desktop-link
		border-bottom: 4px solid white
		border-radius: unset

	&.mini-header
		background: rgba(0, 0, 0, 0.45)

.nav-panel
	display: flex
	align-items: center
	justify-content: space-between
	width: 100%

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
	color: white
	font-weight: bold
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
		background: white
		color: white
		box-shadow: none

		.page-link-title
			font-size: 35px
			color: black

	.page-link-active .page-link-title
		border-bottom: 2px solid black

.imageCover
	position: fixed !important
	width: 100vw
	height: 100vh

.desktop-link:hover
	opacity: 0.5

.not-uppercase
	text-transform: none !important

.bold-italic-preview
	font-weight: 800 !important
	font-style: italic

.index
	z-index: 10
</style>
