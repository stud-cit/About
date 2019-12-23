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
					@click="() => choosePage(page, i)"
				>
					<Slide
						:isStartAnimation="isStartAnimation"
						:index="i"
						:page="page ? page : {}"
						:choosedSlide="choosedSlide"
					/>
				</v-col>
			</div>
		</div>
		<v-row class="d-flex d-sm-none" justify="center">
			<v-col
				v-for="(page, i) in pages"
				:key="i"
				cols="10"
				@click="() => choosePage(page, i)"
			>
				<Slide
					:isStartAnimation="isStartAnimation"
					:index="i"
					:page="page ? page : {}"
					:choosedSlide="choosedSlide"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
		layout: 'preliminary',
		head: {
			title: 'Home',
		},
		components: {
			Slide: () => import('~/components/slide'),
		},
	})
	export default class HomePage extends Vue {
		@Getter('visibilityLoader') visibilityLoader;
		@Getter('getPageStage') pages;
		@Mutation('setPage') setPage;

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

		choosePage(page, i: number): void {
			this.choosedSlide = i;
			this.setPage(page);
		}

		get isStartAnimation() {
			return this.choosedSlide !== -1 ? true : false;
		}

		mounted() {
			this.showSwiper();
		}
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
</style>
