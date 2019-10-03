<template>
	<v-container fluid class="pa-0">
		<div
			v-swiper:mySwiper="swiperOption"
			class="swiper-inactive d-none d-sm-flex"
			:class="isShowSwiper && 'swiper-active'"
		>
			<div class="swiper-wrapper">
				<v-col
					v-for="(page, i) in pages"
					:key="i"
					cols="10"
					lg="8"
					class="swiper-slide"
				>
					<nuxt-link :to="page.to" class="disable-underline">
						<v-card>
							<v-img
								:src="getDynamicAssets(page.img)"
								:gradient="imagePageGradient"
								:lazy-src="page.lazyImg"
								:height="isMdAndDown ? '45vh' : '55vh'"
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
										<span class="font-weight-bold" :style="getSlideTitleFont">
											{{ page.title }}
										</span>
									</v-row>
								</v-card-title>
								<div class="fill-height bottom-gradient"></div>
							</v-img>
						</v-card>
					</nuxt-link>
				</v-col>
			</div>
		</div>
		<v-row class="d-flex d-sm-none">
			<v-col v-for="(page, i) in pages" :key="i" cols="12">
				<nuxt-link :to="page.to" class="disable-underline">
					<client-only>
						<v-card :href="page.to" :link="true">
							<v-img
								:src="getDynamicAssets(page.img)"
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
										<span class="font-weight-bold" :style="getSlideTitleFont">
											{{ page.title }}
										</span>
									</v-row>
								</v-card-title>
								<div class="fill-height bottom-gradient"></div>
							</v-img>
						</v-card>
					</client-only>
				</nuxt-link>
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
	@Getter('getPageStage') pages;
	isShowSwiper: boolean = false;
	swiperOption = {
		mousewheel: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		spaceBetween: 100,
	};

	showSwiper() {
		if (!this.$nuxt.$store.state.isShowLoader) {
			this.isShowSwiper = true;
		} else {
			setTimeout(() => {
				this.isShowSwiper = true;
			}, 250);
		}
	}

	get isMdAndDown() {
		return this.$breakpoint ? this.$breakpoint.is.mdAndDown : false;
	}
	get getSlideTitleFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 40,
				sm: 31,
				md: 31,
				lg: 60,
			})}px`,
		};
	}
	get getSlideNumberFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 20,
				sm: 14,
				md: 14,
				lg: 32,
			})}px`,
		};
	}

	mounted() {
		this.showSwiper();
	}

	imagePageGradient: string =
		'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
}
</script>

<style lang="sass">
.swiper-wrapper
  width: 80%

.swiper-inactive
  transform: translateX(300%)

.swiper-active
    transform: translateX(0%)
    transition: 2s

.disable-underline
  text-decoration: none
</style>
