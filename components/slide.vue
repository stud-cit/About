<template>
	<SlideWrapper
		class="slide"
		:pose="isStartAnimation ? 'hidden' : 'default'"
		:index="index"
		:choosedSlide="choosedSlide"
		:to="localePath(page.link, $i18n.locale)"
		:router="$router"
		:isMobile="isXsOnly"
		:disableHidingAnimation="changeIsHideAnimationContent"
	>
		<v-card link tile>
			<v-img
				:src="getDynamicAssets(page.cover && page.cover.image)"
				:lazy-src="page.lazyImg"
				:height="slideHeight"
				:aspect-ratio="16 / 9"
			>
				<v-card-title
					class="white--text fill-height"
					:class="{ title: isXsOnly }"
				>
					<v-row justify="center" align="center" class="fill-height">
						<span
							class="font-weight-bold font-italic slider-number pr-4 pr-sm-6 pr-md-7 pr-lg-8"
							:style="slideNumberFont"
						>
							0{{ index + 1 }}
						</span>
						<span
							class="font-weight-bold text-uppercase slider-title"
							:style="slideTitleFont"
						>
							{{ page.title }}.
						</span>
					</v-row>
				</v-card-title>
			</v-img>
		</v-card>
	</SlideWrapper>
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
			SlideWrapper: posed.div({
				hidden: {
					applyAtEnd: { opacity: 0 },
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
							setTimeout(() => router.push(to), !isMobile ? 1200 : 150);
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

		get slideHeight() {
			let result;

			if (this.isXsOnly) {
				result = 30;
			} else if (this.isMdAndDown) {
				result = 45;
			} else {
				result = 55;
			}

			return `${result}vh`;
		}

		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}

		get isMdAndDown() {
			return this.$breakpoint ? this.$breakpoint.is.mdAndDown : false;
		}
		get slideNumberFont() {
			return { fontSize: `${this.getAdaptiveSize('slideNumberFont')}px` };
		}
		get slideTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('slideTitleFont')}px` };
		}
	}
</script>
