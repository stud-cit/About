<template>
	<v-container fluid class="pa-0" id="home">
		<div
			v-swiper:mySwiper="swiperOption"
			class="swiper-inactive d-none d-sm-flex"
			:class="isShowSwiper && 'swiper-active'"
		>
			<div class="swiper-wrapper">
				<v-col
					v-for="(page, i) in pages"
					:key="i"
					cols="12"
					sm="10"
					md="10"
					lg="9"
					class="swiper-slide"
					@click="() => choosePage(i)"
				>
					<Slide
						class="slide"
						:pose="isStartAnimation ? 'hidden' : 'default'"
						:index="i"
						:choosedSlide="choosedSlide"
						:to="localePath(page.link, $i18n.locale)"
						:router="$router"
						:isMobile="isXsOnly"
						:disableHidingAnimation="changeIsHideAnimationContent"
					>
						<v-card class="none-radius">
							<v-img
								:src="getDynamicAssets(`/images/covers${page.videoBg.cover}`)"
								:lazy-src="page.lazyImg"
								:height="isMdAndDown ? '45vh' : '65vh'"
								:aspect-ratio="16 / 9"
							>
								<v-card-title class="white--text fill-height">
									<v-row justify="center" align="center" class="fill-height">
										<span
											class="font-weight-bold font-italic pr-4 slider-number"
											:style="getSlideNumberFont"
											>0{{ ++i }}</span
										>
										<span
											class="font-weight-bold text-uppercase slider-title"
											:style="getSlideTitleFont"
											>{{ $t(page.title) }}.</span
										>
									</v-row>
								</v-card-title>
								<div class="fill-height bottom-gradient" />
							</v-img>
						</v-card>
					</Slide>
				</v-col>
			</div>
		</div>
		<v-row class="d-flex d-sm-none" justify="center">
			<v-col
				v-for="(page, i) in pages"
				:key="i"
				cols="10"
				@click="() => choosePage(i)"
			>
				<Slide
					class="slide"
					:pose="isStartAnimation ? 'hidden' : 'default'"
					:index="i"
					:choosedSlide="choosedSlide"
					:to="localePath(page.link, $i18n.locale)"
					:router="$router"
					:isMobile="isXsOnly"
					:disableHidingAnimation="changeIsHideAnimationContent"
				>
					<v-card class="disable-underline" :link="true">
						<v-img
							:src="getDynamicAssets(`/images/covers${page.videoBg.cover}`)"
							:gradient="imagePageGradient"
							:lazy-src="page.lazyImg"
							height="30vh"
							:aspect-ratio="16 / 9"
						>
							<v-card-title class="title white--text fill-height">
								<v-row justify="center" align="center" class="fill-height">
									<span
										class="font-weight-bold font-italic pr-4 pr-sm-6 pr-md-7 pr-lg-8"
										:style="getSlideNumberFont"
									>
										0{{ ++i }}
									</span>
									<span
										class="font-weight-bold text-uppercase"
										:style="getSlideTitleFont"
									>
										{{ $t(page.title) }}.
									</span>
								</v-row>
							</v-card-title>
							<div class="fill-height bottom-gradient"></div>
						</v-img>
					</v-card>
				</Slide>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';
	import posed from 'vue-pose';

	@Component({
		layout: 'preliminary',
		head: {
			title: 'Home',
		},
		components: {
			/**
			 * 	Move choosed slide on y axis on sm and higer
			 * 	Move choosed slide on x axis on xs only
			 */
			Slide: posed.div({
				hidden: {
					applyAtEnd: { display: 'none' },
					opacity: ({ index, choosedSlide, isMobile }) =>
						index === choosedSlide && !isMobile ? 1 : 0,
					x: ({ index, choosedSlide, isMobile }) =>
						index === choosedSlide && isMobile ? -30 : 0,
					transition: ({ index, choosedSlide, isMobile }) => ({
						duration: index === choosedSlide ? 1200 : 400,
						ease: 'easeOut',
					}),
					y: ({ index, choosedSlide, isMobile }) => {
						if (!isMobile) {
							return index === choosedSlide ? -30 : 0;
						}
						return 0;
					},
					onPoseComplete: ({
						index,
						choosedSlide,
						isMobile,
						to,
						router,
						disableHidingAnimation,
					}) => {
						if (index === choosedSlide) {
							disableHidingAnimation(false);
							setTimeout(() => router.push(to), !isMobile ? 1250 : 150);
						}
					},
				},
				default: {
					opacity: 1,
					y: 0,
				},
			}),
		},
	})
	export default class HomePage extends Vue {
		@Getter('visibilityLoader') visibilityLoader;
		@Getter('getPageStage') pages;
		@Mutation('changeIsHideAnimationContent') changeIsHideAnimationContent;

		choosedSlide: number = -1;
		isShowSwiper: boolean = false;
		swiperOption = {
			mousewheel: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 150,
			breakpoints: {
				768: {
					spaceBetween: 50,
				},
				1024: {
					spaceBetween: 100,
				},
			},
		};

		showSwiper() {
			if (!this.visibilityLoader) {
				this.isShowSwiper = true;
			} else {
				setTimeout(() => {
					this.isShowSwiper = true;
				}, 1000);
			}
		}

		choosePage(index: number): void {
			this.choosedSlide = index - 1;
		}

		get isStartAnimation() {
			return this.choosedSlide !== -1 ? true : false;
		}

		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}
		get isMdAndDown() {
			return this.$breakpoint ? this.$breakpoint.is.mdAndDown : false;
		}

		get getSlideTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('slideTitleFont')}px` };
		}
		get getSlideNumberFont() {
			return { fontSize: `${this.getAdaptiveSize('slideNumberFont')}px` };
		}

		mounted() {
			this.showSwiper();
		}

		imagePageGradient: string =
			'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
	}
</script>

<style lang="sass">
	#home .swiper-wrapper
	  width: 75%

	  .slide
	    cursor: pointer
	.swiper-inactive
	  transform: translateX(300%)

	.swiper-active
	    transform: translateX(0%)
	    transition: 2s

	.disable-underline
	  text-decoration: none

	.none-radius
	  border-radius: 0px
</style>
