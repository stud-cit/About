<template>
	<v-img
		:class="{ 'card-img': !isSmAndDown }"
		:height="avatarHeight"
		:src="image"
		lazy-src="/cover.jpg"
		:aspect-ratio="isSmAndDown ? 4 / 3 : 'auto'"
	/>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
		props: ['image'],
	})
	export default class Employee extends Vue {
		get avatarHeight() {
			if (this.isSmAndDown) {
				return '40%';
			}
			return this.isLgAndUp ? '300px' : '200px';
		}

		get isLgAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
		}

		get isSmAndDown() {
			return this.$breakpoint ? this.$breakpoint.is.smAndDown : false;
		}
	}
</script>

<style lang="sass">
	.card-img
		transition: all 1s
		margin: 15px 0
</style>
