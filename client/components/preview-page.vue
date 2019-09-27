<template>
	<v-row class="preview-section" justify="center" align="center">
		<v-row class="preview-wrapper" 
			justify="space-around"
			align="start"
		>
			<v-col cols="12" order="1" order-sm="1">
				<div class="d-none d-sm-block">
					<p class="font-weight-bold" :class="$vuetify.breakpoint.mdAndUp ? 'display-2' : 'display-1'">{{ title }}</p>
					<p class="font-weight-bold" :class="$vuetify.breakpoint.mdAndUp ? 'display-2' : 'display-1'">{{ subtitle }}</p>
				</div>
				<div class="d-block d-sm-none">
					<p class="headline font-weight-bold text-center">{{ title }}</p>
					<p class="headline font-weight-bold text-center">{{ subtitle }}</p>
				</div>
			</v-col>
			<v-col cols="12" order="3" order-sm="2">
				<v-row justify="space-around" justify-sm="start">
					<v-col cols="auto" order="1" order-sm="1">
						<div class="arrow mr-3" @click="handleNavigatingPage(false)">&#8592;</div>
					</v-col>
					<v-col cols="auto" order="3" order-sm="2">
						<div class="arrow mr-3" @click="handleNavigatingPage(true)">&#8594;</div>
					</v-col>
					<v-col cols="auto" order="2" order-sm="3" :class="{rotate: $vuetify.breakpoint.xsOnly}">
						<nuxt-link class="square-container" to="/">
							<div class="square mr-3 squareOne"></div>
							<div class="square mr-3 squareTwo"></div>
							<div class="square squareThree"></div>
						</nuxt-link>	
					</v-col>					
				</v-row>
			</v-col>

			<v-col cols="12" order="2" order-sm="3">
				<v-row class="d-none d-sm-flex">
					<span :class="$vuetify.breakpoint.smAndUp ? 'headline' : 'title'">
						{{ description }}
					</span>
				</v-row>
				<v-row justify="center" class="d-flex d-sm-none pl-0">
					<img class="pointer-icon" src="/pointer-mobile.svg" />
				</v-row>
				<v-row justify="center" justify-sm="start" class="mt-4">
					<span
						:class="$vuetify.breakpoint.smAndUp ? 'title' : 'subtitle-1'"
						class="gray"
					>
						Scroll for more information
					</span>
				</v-row>
			</v-col>
		</v-row>

		<v-row class="pa-0 use-contacts-container" justify="end" no-gutters>
			<v-col cols="12" sm="auto">
				<v-card class="pa-4 pt-0 card-contacts" @click="showContactBar">
					<v-card-title class="title justify-center">Do you have some questions?</v-card-title>
					<v-card-actions class="title contacts-action justify-center pa-0">Use our contacts</v-card-actions>
				</v-card>
			</v-col>
			<v-col sm="1"></v-col>
		</v-row>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

@Component({
	props: ['title', 'subtitle', 'description'],
})

export default class PreviewPage extends Vue {
@Getter('getPageByRoute') getPageByRoute;
@Getter('getPageById') getPageById;
@Mutation('changeContactBar') changeContactBar;
	showContactBar() {
		this.changeContactBar(true);
	}

	handleNavigatingPage(toRight: boolean) {
		const route = this.$route.path.replace('/', '');
		const pageIndex = this.getPageByRoute(route);
		const newPageIndex = toRight ? pageIndex + 1 : pageIndex - 1;
		const nextPage = this.getPageById(newPageIndex);
		this.$router.push(nextPage);
	}
}

</script>

<style lang="sass">
	.preview-section
		height: 100vh

		.use-contacts-container
			width: 100vw
			position: fixed
			right: 0
			bottom: 0
			z-index: 10
		
			.card-contacts
				border-bottom-left-radius: 0
				border-bottom-right-radius: 0

			.contacts-action
				text-transform: uppercase
				text-decoration: underline

	.preview-wrapper
		height: 60vh
		color: white

	.arrow
		font-size: 1.8rem
		text-align: center
		cursor: pointer
	
	.square-container
		display: flex

	.square
		height: 40px
		width: 40px
		border-radius: 20%
		border: 2px solid white
	
	.squareOne
		clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)
		
	.squareThree
		clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%)

	.rotate
		transform: rotate(90deg)
	.gray
		color: gray
</style>