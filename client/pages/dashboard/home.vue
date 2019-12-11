<template>
	<v-row>
		<v-col sm="12" md="6" lg="4">
			<v-container fluid>
				<v-row>
					<v-col
						v-for="(page, i) in pages"
						:key="i"
						class="d-flex child-flex"
						cols="6"
					>
						<v-skeleton-loader
							:loading="!page.videoBg.cover"
							type="card"
							transition="scale-transition"
						>
							<v-img
								:src="getDynamicAssets(`/images/covers${page.videoBg.cover}`)"
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
											0{{ ++i }}
										</span>
										<span
											class="font-weight-bold text-uppercase"
											:style="getSlideTitleFont"
										>
											{{ $t(page.title) }}.
										</span>
									</v-row>
								</v-card-title>
								<div class="fill-height bottom-gradient"></div>
							</v-img>
						</v-skeleton-loader>
					</v-col>
				</v-row>
			</v-container>
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
		layout: 'dashboard',
		head() {
			return {
				title: 'Companies',
			};
		},
	})
	export default class DashboardHomePage extends Vue {
		@Getter('getPageStage') pages;

		imagePageGradient: string =
			'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
	}
</script>
