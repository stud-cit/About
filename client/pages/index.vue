<template>
	<v-container fluid class="pa-0" id="home">
		<div
			v-if="showSwiper"
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
				>
					<nuxt-link
						:to="localePath(page.to, $i18n.locale)"
						class="disable-underline"
					>
						<v-card class="none-radius" @click="hideSwiper">
							<v-img
								:src="getDynamicAssets(`/images/covers${page.videoBg.cover}`)"
								:gradient="imagePageGradient"
								:lazy-src="page.lazyImg"
								:height="isMdAndDown ? '45vh' : '55vh'"
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
								<div class="fill-height bottom-gradient"></div>
							</v-img>
						</v-card>
					</nuxt-link>
				</v-col>
			</div>
		</div>
		<v-row class="d-flex d-sm-none" justify="center">
			<v-col v-for="(page, i) in pages" :key="i" cols="10">
				<client-only>
					<v-card class="disable-underline" :href="localePath(page.to, $i18n.locale)" :link="true">
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
										class="font-weight-bold font-italic pr-4"
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
				</client-only>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
	layout: 'preliminary',
	head: {
		title: 'Home',
	},
})
export default class HomePage extends Vue {
	@Getter('visibilityLoader') visibilityLoader;
	@Getter('getPageStage') pages;

	isShowSwiper: boolean = false;
	swiperOption = {
		mousewheel: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 200,
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
			}, 250);
		}
	}

	hideSwiper() {
		this.isShowSwiper = false;
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
