<template>
	<div ref="container">
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="$t('offers.previewTitle')"
					:subtitle="$t('offers.previewSubtitle')"
					:description="$t('offers.previewDescription')"
					:icon-down="false"
				/>
				<ScrollBar />
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" md="10" lg="10" xl="10">
				<v-row
					class="representation-section"
					v-for="(offer, index) in weOffers[$i18n.locale].offers"
					:key="index"
					:justify="offer.contentPosition"
					align="start"
					:class="{ 'representation-xs': isXsOnly }"
					ref="representations"
				>
					<RepresentationBlock
						:direction="offer.contentPosition"
						:pose="representationToAnimate.includes(index) ? 'visible': 'hidden'"
						class="representation-block"
						:class="offer.contentPosition === 'start' ? 'image-left' : 'image-right'"
						appear
					>
						<v-col
							cols="12"
							xs="8"
							md="8"
							lg="8"
							class="mb-12 mb-md-0 px-0"
							:class="{ 'representation-image': isMdAndDown }"
						>
							<v-img
								class="pb-12 pb-md-0"
								:src="getDynamicAssets(offer.img)"
								:aspect-ratio="3 / 2"
							/>
						</v-col>

						<v-col
							cols="12"
							md="5"
							class="representation-card px-0"
							:class="
								offer.contentPosition === 'start'
									? 'right-bottom-position'
									: 'left-bottom-position'
							"
						>
							<RepresentationContent>
								<v-card class="pa-4 px-lg-8 py-lg-12">
									<v-card-title
										class="bold-preview card-title mb-3"
										:style="getCardTitleFont"
										:class="isXsOnly ? 'card-title-mobile' : 'mb-3'"
										>{{ offer.title }}</v-card-title
									>
									<v-card-text
										class="font-weight-medium card-content"
										:style="getCardContentFont"
									>
										<span>{{ offer.content }}</span>
									</v-card-text>
								</v-card>
							</RepresentationContent>
						</v-col>
					</RepresentationBlock>
				</v-row>
			</v-col>
			<product-footer class="max-width" />
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import posed from 'vue-pose';

import PruductFooter from '@/components/product-footer.vue';
import PreviewPage from '@/components/preview-page.vue';
import ScrollBar from '@/components/scroll-bar.vue';

@Component({
	layout: 'immediate',
	transition: 'page',
	head: {
		title: 'Offers',
	},
	components: {
		'product-footer': PruductFooter,
		PreviewPage,
		ScrollBar,
		RepresentationBlock: posed.div({
			visible: {
				opacity: 1,
				x: 0,
				transition: { duration: 200 },
				beforeChildren: true,
			},
			hidden: {
				opacity: 0,
				x: ({direction}) => direction === 'start' ? -40 : 40,
			},
		}),
		RepresentationContent: posed.div({
			visible: {
				opacity: 1,
				y: 0,
				delay: 75,
			},
			hidden: {
				opacity: 0,
				y: 20,
			},
		}),
	},
})
export default class OffersPage extends Vue {
	@Getter('OffersModule/getStage') weOffers;
	@Mutation('changePageId') changePageId;

	observers: IntersectionObserver[] = [];
	representationToAnimate: number[] = [];

	get isXsOnly() {
		return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
	}

	get isMdAndDown() {
		return this.$breakpoint ? this.$breakpoint.is.mdAndDown : false;
	}

	get getCardTitleFont() {
		return { fontSize: `${this.getAdaptiveSize('cardTitleFont')}px` };
	}
	get getCardContentFont() {
		return { fontSize: `${this.getAdaptiveSize('cardContentFont')}px` };
	}

	created() {
		this.changePageId(2);
	}


	setAnimation(entry, representationIndex, observer) {
		if (
			entry.intersectionRatio > 0 &&
			!this.representationToAnimate.includes(representationIndex)
		) {
			this.representationToAnimate.push(representationIndex);
			observer.disconnect();
		}
	}

	mounted() {
		const representations: any = this.$refs.representations;

		this.observers = representations.map((representation, index) => {
			const options = { threshold: 0.65 };
			const observer = new IntersectionObserver(([entry], observer) => this.setAnimation(entry, index, observer), options);
			observer.observe(representation);
			return observer;
		});
	}

	beforeDestroy() {
    this.observers.forEach( observer => {
			observer.disconnect();
		});
  }
}
</script>

<style lang="sass">
.representation-section
	width: 100%
	padding-bottom: 10vh
	margin: 10vh 0
	position: relative

.representation-image
	max-width: 100vw

.representation-card
	height: auto
	position: absolute
	overflow: hidden

.representation-block
	width: 100vw
	display: flex

.representation-xs
	padding-bottom: 15vh

.v-card:not(.v-sheet--tile)
	border-radius: 0 !important

.card-title
	word-break: break-word

.card-title-mobile
	line-height: 1

.image-left
	justify-content: flex-start

.image-right
	justify-content: flex-end

.right-bottom-position
	right: 0
	bottom: 0

.left-bottom-position
	left: 0
	bottom: 0

.max-width
	max-width: 100vw

.card-content
	line-height: 1.25
	color: rgba(0, 0, 0, 1) !important

.bold-preview
	font-weight: 800 !important
	font-style: normal
</style>
