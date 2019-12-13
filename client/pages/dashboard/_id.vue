<template>
	<v-row>
		<v-col v-for="(page, i) in pages" :key="i" md="6">
			<v-card :href="'dsahboard/' + page.title">
				<v-img
					:src="getDynamicAssets(`/images/covers${page.videoBg.cover}`)"
					:gradient="imagePageGradient"
					:lazy-src="page.lazyImg"
					height="30vh"
					:aspect-ratio="16 / 9"
				>
					<v-card-title class="title white--text fill-height">
						<v-row justify="center" align="center" class="fill-height">
							<span class="font-weight-bold text-uppercase">
								{{ $t(page.title) }}.
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

@Component
export default class DashboardPage extends Vue {
	@Getter('getPageStage') pages;

	imagePageGradient: string =
		'to top right, rgba(115, 115, 115, .33), rgba(32, 32, 72, .7)';
}
</script>
