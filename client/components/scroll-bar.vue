<template>
	<OpacityBox :pose="visibility ? 'visible' : 'hidden'">
		<div class="d-none d-md-flex scrollbar-track" v-scroll="handleScroll">
			<div class="scrollbar-thumb" :style="{ top: `${currScroll}%` }" />
		</div>
	</OpacityBox>
</template>

<script lang="ts">
import posed from 'vue-pose';

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
	components: {
		OpacityBox: posed.div({
			visible: { opacity: 1 },
			hidden: { opacity: 0 },
		}),
	},
})
export default class ScrollBar extends Vue {
	@Getter('visibilityLoader') visibilityLoader;

	el: 'scrollbar-track';
	targ: 'scrollbar-thumb';
	currScroll: number = 0;
	visibility: boolean = false;

	handleScroll(): void {
		const currentScroll = window.scrollY;
		const windowHeight = window.innerHeight;
		const scrollHeight = document.body.scrollHeight;
		const scrollToFooter = scrollHeight - windowHeight * 2;
		if (currentScroll > scrollToFooter) {
			this.visibility = false;
		} else {
			this.currScroll = (currentScroll / (scrollHeight - windowHeight)) * 100;
			this.visibility = true;
		}
	}

	mounted() {
		const animationDelay = this.visibilityLoader ? 2500 : 350;
		setTimeout(() => {
			this.handleScroll();
			if (document.body.scrollHeight > window.innerHeight) {
				this.visibility = true;
			}
		}, animationDelay);
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
	background-color: rgba(0,0,0,1)

.scrollbar-thumb
	cursor: pointer
	position: absolute
	top: 0
	width: 12px
	height: 12px
	border-radius: 50%
	right: -4px
	background-color: rgba(255,255,255,1)
</style>
