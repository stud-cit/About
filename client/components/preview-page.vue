<template>
	<section class="question">
		<div class="pretitle">{{ title }}</div>
		<div class="pretitle">{{ subtitle }}</div>
		<div class="navigation">
			<div class="arrow" @click="handleNavigatingPage('left')">&#8592;</div>
			<div class="arrow" @click="handleNavigatingPage('right')">&#8594;</div>
			<nuxt-link class="square-container" to="/">
				<div class="square squareOne"></div>
				<div class="square squareTwo"></div>
				<div class="square squareThree"></div>
			</nuxt-link>
		</div>
		<p class="description">{{ description }}</p>
		<p class="scroll-text">Scroll for more information</p>
		<v-card class="bottom-card" @click="showContactBar">
		<v-card-title class="bottom-card-title">Do you have some questions?</v-card-title>
		<v-card-actions class="bottom-card-action">USE OUR CONTACTS</v-card-actions>
		</v-card>
	</section>
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

  handleNavigatingPage(direction: 'left' | 'right') {
	const route = this.$route.path.replace('/', '');
	const pageIndex = this.getPageByRoute(route);
	const newPageIndex = direction === 'left' ? pageIndex - 1 : pageIndex + 1;
	const nextPage = this.getPageById(newPageIndex);
	this.$router.push(nextPage);
  }
}

</script>

<style lang="sass">
.wrapper
	width: 80%
	color: white
	margin-left: auto
	margin-right: auto

.question
	position: relative
	height: 100vh
	display: flex
	flex-direction: column
	align-items: flex-start
	justify-content: flex-end
	color: #ffffff
 
.pretitle
	font-size: 4rem
	color: white
	width: 90%
 
.navigation
	display: flex
	flex-direction: row
	color: white
	margin: 5rem 0 

.navigation div
	margin-right: .8rem
 
.arrow
	font-size: 1.8rem
	text-align: center
	cursor: pointer
 
.square-container
	display: flex

.square
	height: 2.5rem
	width: 2.5rem
	border-radius: 20%
	border: 2px solid white
 
.squareOne
	clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)
	
.squareThree
	clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%)
 
.description
	font-size: 2rem

.scroll-text
	opacity: 0.5
	font-size: 1.3rem 

.bottom-card
	color: black
	font-size: 2rem
	font-weight: 100
	text-align: center
	display: flex
	justify-content: center
	flex-direction: column
	width: 25rem
	padding-top: 1rem
	padding-bottom: 1rem
	justify-self: flex-end
	align-self: flex-end
	margin-bottom: 1rem	

.bottom-card-title
	text-align: center
	justify-content: center
	font-size: 1.3rem 

.bottom-card-action
	justify-content: center
	text-decoration: underline
	font-weight: 100	
</style>