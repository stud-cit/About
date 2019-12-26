<template>
	<OpacityBox
		:pose="
			visibility && visibilityScrollBar && !getIsHideAnimationContent
				? 'visible'
				: 'hidden'
		"
		:delay="visibilityLoader ? 2500 : 500"
	>
		<div class="d-none d-md-flex scrollbar-track" v-scroll="handleScroll">
			<div class="scrollbar-thumb" :style="{ top: `${currScroll}%` }" />
		</div>
	</OpacityBox>
</template>

<script lang="ts">
	import posed from 'vue-pose';
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
		components: {
			OpacityBox: posed.div({
				visible: { opacity: 1, delay: ({ delay }) => delay },
				hidden: { opacity: 0, transition: { duration: 0 } },
			}),
		},
	})
	export default class ScrollBar extends Vue {
		@Getter('visibilityLoader') visibilityLoader;
		@Getter('getScrollBarVisibility') visibilityScrollBar;
		@Getter('getIsHideAnimationContent') getIsHideAnimationContent;
		@Mutation('changeScrollBar') changeScrollBar;

		el: 'scrollbar-track';
		targ: 'scrollbar-thumb';
		currScroll: number = 0;
		visibility: boolean = false;

		handleScroll(): void {
			const currentScroll = window.scrollY;
			const windowHeight = window.innerHeight;
			const scrollHeight = document.body.scrollHeight;
			const scrollToFooter = scrollHeight - windowHeight * 1.65;
			if (currentScroll > scrollToFooter) {
				this.visibility = false;
			} else {
				this.currScroll = (currentScroll / (scrollHeight - windowHeight)) * 100;
				this.visibility = true;
			}
		}

		mounted() {
			this.changeScrollBar(true);
			if (document.body.scrollHeight > window.innerHeight) {
				this.visibility = true;
			}
			this.handleScroll();
		}
	}
</script>

<style lang="sass">
	.scrollbar-track
		position: fixed
		top: 20%
		right: 50px
		bottom: 20%
		width: 3px
		background-color: #000000

	.scrollbar-thumb
		cursor: pointer
		position: absolute
		top: 0
		width: 12px
		height: 12px
		border-radius: 50%
		right: -4px
		background-color: #FFFFFF
</style>
