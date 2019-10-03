<template>
	<div>
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="weOffers.previewTitle"
					cols="12"
					sm="9"
					:subtitle="weOffers.previewSubtitle"
					:description="weOffers.previewDescription"
					:icon-down="false"
				/>
				<ScrollBar />
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" md="10"
			>
				<v-row
					class="representation-section"
					v-for="(preview, index) in weOffers.representation"
					:key="index"
					justify="start"
					align="start"
					:class="{ 'representation-xs': isXsOnly }"
				>
					<v-col cols="12" md="10" lg="8" class="representation-image">
						<v-img :src="getDynamicAssets(preview.img)" />
					</v-col>

					<v-col
						cols="12"
						md="6"
						class="representation-card right-bottom-position"
					>
						<v-card class="pa-4 px-lg-8 py-lg-12">
							<v-card-title
								class="mb-6 font-weight-bold card-title"
								:style="getCardTitleFont"
							>
								{{ preview.title }}
							</v-card-title>
							<v-card-text
								class="font-weight-regular card-content"
								:style="getCardContentFont"
							>
								<span>{{ preview.text }}</span>
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
	@Getter('getOffersStage') weOffers;
	@Mutation('changePageId') changePageId;

	get isXsOnly() {
		return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
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
				sm: 20,
				md: 12,
				lg: 25,
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
	padding-bottom: 25vh

.card-title
	word-break: break-word

.right-bottom-position
	right: 0
	bottom: 0
</style>
