<template>
	<v-img
		:src="getStaticAssetUrl(value)"
		:lazy-src="getStaticAssetUrl(value)"
		:gradient="getGradient()"
		:aspect-ratio="16 / 9"
	>
		<v-col xs="12" style="position:absolute">
			<v-row class="lightbox white--text px-2">
				<slot name="title" />
			</v-row>
		</v-col>

		<v-row align="center" justify="center" class="fill-height">
			<slot />
		</v-row>

		<slot name="footer" />
	</v-img>
</template>

<script lang="ts">
	import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

	@Component
	export default class ContentCover extends Vue {
		@Prop({ type: String, required: false }) src: string;

		@Watch('src')
		onChangeValue(val: string) {
			this.value = val;
		}

		created() {
			this.value = this.src;
		}

		private value!: string;

		private getGradient() {
			return `to top left, rgba(70, 88, 158, .6), rgba(43, 61, 161, .9)`;
		}
	}
</script>
