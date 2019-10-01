<template>
  <v-container class="pb-0">
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
		<v-row
			justify="center"
		>
			<v-col cols="12" md="10" xl="12">
				<v-row
					class="ma-0 representation-section"
					:class="isXsOnly ? 'autoHeight' : 'fullHeight'"
					justify="center"
					align="center"
					v-for="(preview, index) in weOffers.representation"
					:key="index"
				>
					<v-row class="representation-container" :style="getHeightContainer">
						<v-col
							cols="12"
							md="10"
							class="representation-image"
							:class="contentPosition(index, 'top', false)"
						>
							<v-img :src="getDynamicAssets('/images/weOffer/1.jpg')" />
						</v-col>
						<v-col
							cols="12"
							md="8"
							class="representation-content"
							:class="contentPosition(index, 'bottom', true)"
						>
							<v-card class="pa-4 px-lg-8 py-lg-12">
								<v-card-title class="mb-6 font-weight-bold card-title" :style="getCardTitleFont">
									{{preview.title}}
								</v-card-title>
								<v-card-text class="font-weight-regular card-content" :style="getCardContentFont">
									<span>{{preview.text}}</span>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-row>
      </v-col>
    </v-row>
    <product-footer />
  </v-container>
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


	get contentPosition() {
		return (index, positionX, reveresePositionY) => {
			const isSmAndDown = this.$breakpoint ? this.$breakpoint.is.smAndDown : false;
			if(isSmAndDown) {
				return positionX === 'top' ? 'position-top' : 'position-bottom';
			}
			else if(reveresePositionY) {
				return index % 2 === 0 ? 'position-right position-top' : 'position-left position-bottom';
			}
			else {
				return index % 2 === 0 ? 'position-left position-bottom' : 'position-right position-top';

			}
		}
	}
  get isXsOnly() {
    return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
	}
	get getHeightContainer() {
    return {
      height: `${this.getCustomAdaptiveSize({
        xs: 60,
        sm: 75,
        md: 60,
        lg: 80,
      })}vh`,
    };
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

	.representation-container
		position: relative

		.representation-image
			position: absolute

		.representation-content
			height: 40vh
			position: absolute
			overflow: hidden

	.card-title
		word-break: break-word

.position-right
	right: 0

.position-left
	left: 0

.position-top
	top: 0

.position-bottom
	bottom: 0

.fullHeight
	height: 100vh

.autoHeight
	height: auto
</style>
