<template>
	<v-row
		justify="center"
		align="end"
		class="footer-section"
		:class="isSmAndDown ? 'footer-mobile' : 'footer-full'"
	>
		<v-col cols="12" sm="10" class="d-flex">
			<v-row
				justify="center"
				align="center"
				class="return-section d-md-none flex-column"
				@click="scollTop"
			>
				<p class="arrowUp">&#8593;</p>
				<p :class="isSmAndUp ? 'text-sm' : 'text-xs'">
					{{ $t('common.backToTop') }}
				</p>
			</v-row>
		</v-col>
		<p class="d-none d-md-block rotated-return-bar" @click="scollTop">
			{{ $t('common.backToTop') }}
		</p>
		<contact-bar id="contact" :isStatic="true" />
	</v-row>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import ContactBar from './contact-bar';

	@Component({
		components: {
			'contact-bar': ContactBar,
		},
	})
	export default class PruductFooter extends Vue {
		scollTop() {
			window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
		}

		get isSmAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.smAndUp : false;
		}

		get isSmAndDown() {
			return this.$breakpoint ? this.$breakpoint.is.smAndDown : false;
		}
	}
</script>

<style lang="sass">
	.footer-section
		position: relative
		color: #FFFFFF
		margin: 0

	.footer-full
		height: 100vh

	.footer-mobile
		height: 90vh

	.return-section
		width: 90%
		height: 40vh
		background: #282828
		opacity: 0.5
		cursor: pointer
		font-weight: 400
		font-style: normal

		p
			color: #696969

		.text-sm
			font-size: 30px

		.text-xs
			font-size: 25px

	.rotated-return-bar
		position: absolute
		top: calc(30vh)
		right: 5vw
		writing-mode: vertical-rl
		transform: scaleX(-1) scaleY(-1)
		font-size: 35px
		cursor: pointer
		opacity: 0.55

		&:hover
			opacity: 0.8

	.arrowUp
		color: #2F2F2F
		font-size: 50px
</style>
