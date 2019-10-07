<template>
	<v-app>
		<v-app-bar
			id="header"
			class="pt-3 pt-lg-4 mt-3"
			color="transparent"
			app
			dark
			flat
		>
			<v-row class="mx-1 mx-sm-0" justify="center" align="center">
				<v-col cols="12" sm="10" order-md="2" class="pa-0">
					<v-row justify="space-between" align="center">
						<v-col cols="auto" class="pa-0">
							<nuxt-link :to="localePath({name: 'index'})" nuxt>
								<v-img src="/logo.svg" />
							</nuxt-link>
						</v-col>
						<v-col cols="6" md="6" lg="6" xl="6" class="d-none d-md-flex">
							<v-row justify="space-between">
								<v-col
									class="pa-0 nav-links"
									cols="auto"
									v-for="(page, index) in pages"
									:key="index"
								>
									<v-btn
										class="px-0 desktop-link"
										active-class="active-desktop-link"
										:to="page.to"
										exact
										dark
										text
									>
										<span
											:class="isLgAndUp ? 'nav-link-desktop' : 'nav-link'"
										>
											{{ $t(page.title) }}
										</span>
									</v-btn>
								</v-col>
									<v-btn icon dark :to="localePath({name: 'index'})" class="d-none d-md-flex" nuxt>
								<v-icon size="50">mdi-fullscreen-exit</v-icon>
							</v-btn>
							<v-btn
								class="d-flex d-md-none"
								@click="toggleVisibilityMobileMenu"
								icon
							>
								<v-icon size="50">mdi-menu</v-icon>
							</v-btn>
							</v-row>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-app-bar>
		<v-row class="mx-2 mx-sm-0 page-info" justify="start">
			<v-col cols="auto" offset="0" offset-sm="1">
				<p>
					<span :style="getPageIndexFont">{{ pageId }}</span>
					<span class="total-pages" :style="getTotalPagesFont"> / 4</span>
				</p>
			</v-col>
		</v-row>
		<v-img :src="getDynamicAssets(cover)" class="imageCover" />

		<v-content class="pt-0">
			<v-container fluid class="fill-height pa-0">
				<nuxt />
				<contact-bar />
			</v-container>
		</v-content>

		<v-dialog
			v-model="isShowMobileMenu"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
			scrollable
		>
			<v-btn @click="toggleVisibilityMobileMenu" icon large fixed right>
				<v-icon size="50" color="black">
					mdi-close
				</v-icon>
			</v-btn>
			<v-list id="pages-list-container">
				<v-list-item-group class="pages-list">
					<v-list-item v-for="(page, index) in pages" class="px-0" :key="index">
						<v-btn
							class="text-center display-2 page-link font-weight-bold"
							exact-active-class="page-link-active"
							@click="toggleVisibilityMobileMenu()"
							:to="page.to"
							exact
							nuxt
						>
							<span class="page-link-title">{{ page.title }}</span>
						</v-btn>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-dialog>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import ContactBar from '@/components/contact-bar.vue';

@Component({
	components: {
		'contact-bar': ContactBar,
	},
})
export default class ImmediatetLayout extends Vue {
	@Getter('getPageByRoute') getPageByRoute;
	@Getter('getPageId') pageId;
	@Getter('getPageStage') pages;
	@Getter('getPageCover') cover;

	get isLgAndUp() {
		return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
	}

	get getPageIndexFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 25,
				sm: 40,
				md: 40,
				lg: 45,
			})}px`,
		};
	}
  get getPageIndexFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 25,
        sm: 40,
        md: 40,
        lg: 45,
      })}px`,
    };
  }
  get getTotalPagesFont() {
    return {
      fontSize: `${this.getCustomAdaptiveSize({
        xs: 13,
        sm: 20,
        md: 20,
        lg: 25,
      })}px`,
    };
  }
  isShowMobileMenu: boolean = false;

  toggleVisibilityMobileMenu() {
    this.isShowMobileMenu = !this.isShowMobileMenu;
	}
}
</script>

<style lang="sass">
#header
	z-index: 30
	.desktop-link
		font-weight: 600
		&::before
			opacity: 0
	.active-desktop-link
		border-bottom: 4px solid white
		border-radius: unset

.nav-links
	align-items: center

.nav-link
	font-size: 15px

.nav-link-desktop
	font-size: 25px

.page-info
	position: fixed
	width: 100%
	top: 9vh
	z-index: 5
	color: white
	font-weight: bold
	font-style: italic

	.total-pages
		vertical-align: super

#pages-list-container
	height: 100vh
	display: flex
	align-items: center

	.pages-list
		width: 100vh
		height: 90vh
		display: flex
		flex-direction: column
		justify-content: space-between

	.page-link
		width: 100%
		height: 100%
		background: white
		color: white
		box-shadow: none

		.page-link-title
			font-size: 35px
			color: black

	.page-link-active .page-link-title
		border-bottom: 2px solid black

.imageCover
	position: fixed !important
	width: 100vw
	height: 100vh

.desktop-link:hover
	opacity: 0.5
</style>
