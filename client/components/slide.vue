<template>
	<Slide
		class="slide"
		:pose="isStartAnimation ? 'hidden' : 'default'"
		:index="index"
		:choosedSlide="choosedSlide"
		:to="localePath(page.link, $i18n.locale)"
		:router="$router"
		:isMobile="isXsOnly"
		:disableHidingAnimation="changeIsHideAnimationContent"
	>
		<v-card class="disable-underline" :link="true">
			<v-img
				:src="getDynamicAssets(page.cover.image)"
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
							0{{ ++index }}
						</span>
						<span
							class="font-weight-bold text-uppercase"
							:style="getSlideTitleFont"
						>
							{{ page.title }}.
						</span>
					</v-row>
				</v-card-title>
				<div class="fill-height bottom-gradient"></div>
			</v-img>
		</v-card>
	</Slide>
</template>
<script lang="ts">
	import posed from 'vue-pose';
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
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
		props: ['index', 'isStartAnimation', 'choosedSlide', 'page'],
	})
	export default class Slide extends Vue {
		@Mutation('changeIsHideAnimationContent') changeIsHideAnimationContent;

		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}

		get getSlideNumberFont() {
			return { fontSize: `${this.getAdaptiveSize('slideNumberFont')}px` };
		}
		get getSlideTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('slideTitleFont')}px` };
		}

		imagePageGradient: string =
			'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
	}
</script>

<style></style>
