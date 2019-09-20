<template>
        <div class="container">
            <section class="errors" v-if="error.statusCode === 404">
                <div class="number">404</div>
                <div class="description">NOT F<img src="@/static/not-found.svg" alt="">UND</div>
            </section>
            <section v-else>An error occurred</section>
            <nuxt-link to="/" class="link">
                <div class="back">
                </div>
                <div class="text">
                    Return to Home Page
                </div>
            </nuxt-link>
        </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

export default {
    props: ['error'],
    layout: 'default'
}
</script>

<style lang="sass">
.errors
	text-align: center
	width: 100%
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50% , -50%)
	.number
		font-size: 250px
		color: rgba(206, 206, 206, 1)
	.description
		font-size: 150px
		display: inline
		color: rgba(218, 218, 218, 1)
	img
		width: auto
		height: 140px
		vertical-align: middle

.link
	.back
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
		height: 100px
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

</style>