<template>
	<v-container fluid id="portfolio">
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="$t('portfolio.previewTitle')"
					:subtitle="$t('portfolio.previewSubtitle')"
					:description="$t('portfolio.previewDescription')"
					:icon-down="true"
				/>
			</v-col>
		</v-row>
		<v-col class="pa-0">
			<v-parallax
				v-for="(project, i) in portfolio[$i18n.locale].projects"
				:key="i"
				:src="getDynamicAssets(project.cover)"
				class="pa-0"
				:style="getParalaxHeight"
			>
				<v-row justify="center" align="center" class="section">
					<v-col lg="7" md="7" sm="12">
						<v-card dark flat color="transparent">
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title
										v-text="project.title"
										class=" font-weight-medium text-underline text-wrap"
										:class="isMdAndUp ? '' : 'text-center'"
										:style="getTitleFontProject"
									/>
									<v-divider />
								</v-list-item-content>
							</v-list-item>
						</v-card>
					</v-col>
					<v-col
						lg="3"
						md="4"
						sm="12"
						class="ma-3 mr-0 d-flex pr-0"
						:class="isMdAndUp ? 'justify-end' : 'justify-center'"
					>
						<v-btn :to="project.link" large dark text class="pr-0"
						 @mouseover="borderActive = true"
						 @mouseleave="borderActive = false">
							<span class="headline d-none d-md-block pr-3" :class="{borderTextLink:borderActive}">
								{{ $t('portfolio.link') }}
							</span>
							<div class="arrow-right">
								<v-img
									src="/arrow-point-to-right.svg"
									:width="isMdAndUp ? '40px' : '65px'"
								/>
							</div>
						</v-btn>
					</v-col>
				</v-row>
			</v-parallax>
		</v-col>
		<product-footer />
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

import PreviewPage from '@/components/preview-page.vue';
import PruductFooter from '@/components/product-footer.vue';

@Component({
	layout: 'immediate',
	head: {
		title: 'Portfolio',
	},
	components: {
		PreviewPage,
		'product-footer': PruductFooter,
	},
})
export default class PortfolioPage extends Vue {
	@Getter('PortfolioModule/getStage') portfolio;
	@Mutation('changePageId') changePageId;

	borderActive: boolean = false;

	get isMdAndUp() {
		return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
	}
	created() {
		this.changePageId(4);
	}
	get getTitleFontProject() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 32,
				sm: 50,
				md: 55,
				lg: 65,
			})}px`,
		};
	}

	get getParalaxHeight() {
		return {
			height: `${this.getCustomAdaptiveSize({
				xs: 50,
				sm: 60,
				md: 65,
				lg: 65,
			})}vh`,
		};
	}
}
</script>

<style lang="sass">
#portfolio
  .text-underline
    line-height: normal
    text-decoration: underline
    text-underline-position: under
.arrow-right
  border-radius: 50%
  padding: 25px
  margin: 10px
  border: 5px solid white

.v-btn:hover::before
  opacity: 0 !important

.borderTextLink
  text-decoration: underline  
</style>
