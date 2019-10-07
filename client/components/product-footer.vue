<template>
	<v-row justify="center" align="end" class="footer-section">
		<v-col cols="10" class="d-flex ">
			<v-row
				justify="center"
				align="center"
				class="return-section d-lg-none flex-column"
				@click="scollTop"
			>
				<p class="arrowUp">&#8593;</p>
				<p :class="isSmAndUp ? 'text-sm' : 'text-xs'">
					{{ $t('common.backToTop') }}
				</p>
			</v-row>
		</v-col>
		<p class="d-none d-lg-block rotated-return-bar" @click="scollTop">
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
		return this.$breakpoint ? this.$breakpoint.is.sm : false;
	}
}
</script>

<style lang="sass">
.footer-section
    position: relative
    height: 100vh
    color: white

.return-section
    width: 90%
    height: 40vh
    background: #282828
    opacity: .5
    cursor: pointer
    font-weight: normal
    font-style: normal

    p
        color: #696969

    .text-sm
        font-size: 30px

    .text-xs
        font-size: 25px

.rotated-return-bar
    position: absolute
    top: calc(25vh)
    right: 5vw
    writing-mode: vertical-rl
    transform: scaleX(-1) scaleY(-1)
    font-size: 35px
    cursor: pointer

.arrowUp
      color: #2f2f2f
      font-size: 50px
</style>
