<template>
	<v-row>
		<v-col v-for="(page, i) in pages[$i18n.locale]" :key="i" md="6">
			<v-card :to="'dashboard/' + page.link" @click="setPage(page)">
				<v-img
					height="30vh"
					:src="getDynamicAssets(page.cover.image)"
					:gradient="imagePageGradient"
					:lazy-src="page.lazyImg"
					:aspect-ratio="16 / 9"
				>
					<v-card-title class="title white--text fill-height">
						<v-row justify="center" align="center" class="fill-height">
							<span class="font-weight-bold text-uppercase">
								{{ page.title }}.
							</span>
						</v-row>
					</v-card-title>
					<div class="fill-height bottom-gradient"></div>
				</v-img>
			</v-card>
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
	export default class DashboardPage extends Vue {
		@Getter('PageModule/getPages') pages;
		@Mutation('PageModule/setPage') setPage;

		imagePageGradient: string =
			'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
	}
</script>
