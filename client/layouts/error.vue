<template>
	<v-container>
		<section class="errors" v-if="error.statusCode === 404">
			<div class="numbers">404</div>
			<div class="description">
				NOT F<img src="@/static/not-found.svg" alt="" />UND
			</div>
		</section>
		<section v-else>{{ $t('errors.errorOccured') }}</section>
		<nuxt-link to="/" :class="isMdAndUp ? 'link-full' : 'link-mobile'">
			<div class="text">{{ $t('errors.returnToHome') }}</div>
		</nuxt-link>
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
		layout: 'default',
		head: {
			title: 'Error page',
		},
	})
	export default class ErrorPage extends Vue {
		@Prop() public error: object;

		get isMdAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
		}
	}
</script>

<style lang="sass">
	.errors
		text-align: center
		width: 100%
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)

		.numbers
			font-size: 15vw
			color: #CECECE

		.description
			font-size: 11vw
			display: inline
			color: #DADADA

		img
			width: auto
			height: 10vw
			vertical-align: middle

	.text
		text-decoration: none
		color: #E3E3E3

		:link
			text-decoration: none
			color: #E3E3E3

		:visited
			text-decoration: none
			color: #E3E3E3

		:active
			text-decoration: none
			color: #E3E3E3

		:hover
			text-decoration: none
			color: #E3E3E3

	.link-full
		background: #F2F2F2
		height: 100vh
		width: 100px
		position: absolute
		right: 0
		top: 0
		bottom: 0

		.text
			position: absolute
			transform: rotate(-90deg)
			font-size: 60px
			right: -15rem
			white-space: nowrap
			top: 45%

	.link-mobile
		background: #F2F2F2
		width: 100vw
		height: 8vh
		position: absolute
		right: 0
		left: 0
		bottom: 0
		display: flex
		align-items: center

		.text
			position: absolute
			font-size: 5vw
			left: 50%
			transform: translate(-50%)

	.nuxt-link-active

		&:hover
			background: #C1C1C1

			.text
				color: #9E9E9E
</style>
