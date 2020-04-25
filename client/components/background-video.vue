<template>
	<client-only>
		<video-background
			id="video-bg"
			:src="getDynamicAssets(cover.video)"
			:poster="getDynamicAssets(cover.image)"
			autoplay
		/>
	</client-only>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component
	export default class BackgroundVideo extends Vue {
		@Getter('PageModule/getCover') cover;
	}
</script>

<style lang="sass">
	#video-bg
		height: 100vh
		max-height: 100vh
		position: fixed

	.imageCover
		position: fixed !important
		width: 100vw
		height: 100vh
</style>
