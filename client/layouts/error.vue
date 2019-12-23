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

		public isMdAndUp() {
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
			color: rgba(206, 206, 206, 1)

		.description
			font-size: 11vw
			display: inline
			color: rgba(218, 218, 218, 1)

		img
			width: auto
			height: 10vw
			vertical-align: middle

	.text
		text-decoration: none
		color: rgba(227, 227, 227, 1)

		:link
			text-decoration: none
			color: rgba(227, 227, 227, 1)

		:visited
			text-decoration: none
			color: rgba(227, 227, 227, 1)

		:active
			text-decoration: none
			color: rgba(227, 227, 227, 1)

		:hover
			text-decoration: none
			color: rgba(227, 227, 227, 1)

	.link-full
		background: rgba(242, 242, 242, 1)
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
			top: 50%

	.link-mobile
		background: rgba(242, 242, 242, 1)
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
</style>
