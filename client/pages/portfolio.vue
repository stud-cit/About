<template>
	<v-container fluid id="portfolio">
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="page.name"
					:description="page.description"
					:icon-down="true"
				/>
			</v-col>
		</v-row>
		<v-col class="pa-0">
			<v-parallax
				v-for="(project, i) in pageContent"
				:key="i"
				:src="getDynamicAssets(project.cover ? project.cover.image : '')"
				class="pa-0"
				:style="getParalaxHeight"
			>
				<v-row justify="center" align="center" class="section">
					<v-col lg="7" md="7" sm="12">
						<v-card dark flat color="transparent">
							<v-list-item>
								<v-list-item-content v-if="!isMdAndUp">
									<a :href="project.link">
										<v-list-item-title
											v-text="project.title"
											class="font-weight-medium text-underline text-wrap text-center portfolio-link"
											:style="getProjectTitleFont"
										/>
									</a>
								</v-list-item-content>
								<v-list-item-content v-else>
									<v-list-item-title
										v-text="project.title"
										class=" font-weight-medium text-underline text-wrap"
										:style="getProjectTitleFont"
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
						class="ma-3 mr-0 ml-0 d-none d-md-flex pr-0 pl-0"
						:class="isMdAndUp ? 'justify-end' : 'justify-center'"
					>
						<v-btn
							:href="project.description"
							target="_blank"
							large
							dark
							text
							:ripple="false"
							depressed
							class="pr-0 pl-0"
						>
							<span class="headline d-none d-md-block pr-3">
								{{ $t('common.showExample') }}
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
		<product-footer class="max-width" />
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Action, Getter, Mutation } from 'vuex-class';

	import PreviewPage from '@/components/preview-page.vue';
	import PruductFooter from '@/components/product-footer.vue';

	@Component({
		layout: 'immediate',
		transition: 'page',
		head: {
			title: 'Portfolio',
		},
		components: {
			PreviewPage,
			'product-footer': PruductFooter,
		},
		asyncData({ store, route }) {
			/**
			 * Set cover to get load video
			 * before the fetching data
			 */
			store.commit('PageModule/setPageCover', {
				lang: store.$i18n.locale,
				link: route.path,
			});
		},
	})
	export default class PortfolioPage extends Vue {
		@Action('PageModule/selectPage') selectPage;
		@Action('ContentModule/selectClientContent') selectClientContent;
		@Getter('PageModule/getPage') page;
		@Getter('ContentModule/getContents') pageContent;

		get isMdAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
		}
		get getProjectTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('projectTitleFont')}px` };
		}
		get getParalaxHeight() {
			return { height: `${this.getAdaptiveSize('paralaxHeight')}vh` };
		}

		async created() {
			const lang = this.$i18n.locale;
			const link = this.$route.path.replace(`/${lang}`, '').replace('/', '');

			await this.selectPage({ link, lang });
			await this.selectClientContent({
				page: this.page.page_id,
				lang,
			});
		}
	}
</script>

<style lang="sass">
	#portfolio

		.text-underline
			line-height: normal
			text-decoration: underline
			text-underline-position: under

		.portfolio-link
			color: #FFFFFF

		.v-btn:before
			background-color: transparent

	.arrow-right
		border-radius: 50%
		padding: 25px
		margin: 10px
		border: 5px solid #FFFFFF

	.v-btn:hover::before
		opacity: 0 !important

	.headline:hover
		border-bottom: 1px solid #FFFFFF

	.max-width
		max-width: 100vw
</style>
