<template>
        <div class="container">
            <section class="errors" v-if="error.statusCode === 404">
                <div class="number">404</div>
                <div class="description">Not F<img src="@/static/not-found.svg" alt="">und</div>
            </section>
            <section v-else>An error occurred</section>
            <a href="/" class="link">
                <div class="back">
                </div>
                <div class="text">
                    Return to Home Page
                </div>
            </a>
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
		transform: translateY(-50%)
		~	.number
				font-size: 250px
				color: rgba(206, 206, 206, 1)
			.description
				font-size: 150px
				display: inline
				color: rgba(218, 218, 218, 1)
			img
				width: auto
				height: 250px

	.link
		~	.back
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
				right: 260px
				top: 0
				bottom: 0
				display: flex
				flex-direction: row-reverse
				align-items: flex-end
			:link, :visited, :active, :hover
				text-decoration: none
				color: rgba(227, 227, 227, 1)

</style