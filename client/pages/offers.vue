<template>
	<div>
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
				>
					<v-col
						cols="12"
						xs="8"
						md="8"
						lg="9"
						class="mb-12 mb-md-0"
						:class="{ 'representation-image': isMdAndDown }"
					>
						<v-img
							class="pb-12 pb-md-0"
							:src="getDynamicAssets(offer.img)"
							:lazy-src="getDynamicAssets('')"
							:aspect-ratio="3 / 2"
						/>
					</v-col>

					<v-col
						cols="12"
						md="5"
						class="representation-card"
						:class="
							offer.contentPosition === 'start'
								? 'right-bottom-position'
								: 'left-bottom-position'
						"
					>
						<v-card class="pa-4 px-lg-8 py-lg-12">
							<v-card-title
								class="mb-6 bold-preview card-title"
								:style="getCardTitleFont"
								>{{ offer.cardTitle }}</v-card-title
							>
							<v-card-text
								class="font-weight-bold card-content"
								:style="getCardContentFont"
							>
								<span>{{ offer.cardContent }}</span>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			<product-footer />
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

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
	},
})
export default class OffersPage extends Vue {
	@Getter('OffersModule/getStage') weOffers;
	@Mutation('changePageId') changePageId;

	get isXsOnly() {
		return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
	}

	get isMdAndDown() {
		return this.$breakpoint ? this.$breakpoint.is.mdAndDown : false;
	}

	get getCardTitleFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 15,
				sm: 20,
				md: 20,
				lg: 30,
			})}px`,
		};
	}
	get getCardContentFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 12,
				sm: 18,
				md: 12,
				lg: 22,
			})}px`,
		};
	}

	created() {
		this.changePageId(2);
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

.representation-xs
	padding-bottom: 15vh

.card-title
	word-break: break-word

.right-bottom-position
	right: 0
	bottom: 0

.left-bottom-position
	left: 0
	bottom: 0

.card-content
	line-height: 1.25
	color: rgba(0, 0, 0, 1) !important

.bold-preview
	font-weight: 800 !important
	font-style: normal
</style>
