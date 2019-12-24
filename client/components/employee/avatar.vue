<template>
	<v-img
		:class="{'card-img': isXsOnly}"
		:height="avatarHeight"
		:src="image"
		lazy-src="/cover.jpg"
		:aspect-ratio="isXsOnly ? (4 / 3) : 'auto'"
	/>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import posed from 'vue-pose';


	@Component({
		props: ['image']
	})
	export default class Employee extends Vue {
		get avatarHeight() {
			if(this.isXsOnly) {
				return '40%'
			}
			return this.isLgAndUp ? '300px' : '200px'
		}

		get isLgAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
		}
		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}
	}
</script>


<style lang="sass">
	.card-img
		transition: all 1s
		margin: 15px 0
</style>
