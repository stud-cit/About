<template>
	<v-app class="app">
		<v-app-bar app flat class="pt-6 mt-sm-12 mb-3 app-bar">
			<v-row justify="center">
				<v-col cols="10">
					<v-row :class="{ 'margin-top': isSmAndUp }" justify="space-between">
						<v-col cols="auto" class="px-0">
							<p
								class="text-uppercase mb-0 bold-preview"
								:style="getPageTitleFont"
							>
								{{ $t('home.title') }}
							</p>
							<p
								class="mb-0 grey--text font-weight-bold"
								:style="getPageSubTitleFont"
							>
								{{ $t('home.subTitle') }}
							</p>
						</v-col>
						<v-col cols="auto" class="d-none d-md-flex align-center">
							<v-speed-dial
								v-model="changeLocale"
								direction="left"
								transition="slide-x-reverse-transition"
							>
								<template v-slot:activator color="red">
									<v-btn
										v-model="changeLocale"
										icon
										class="pa-0 font-weight-bold locale-button circle-lang"
										color="#4A4A4A"
									>
										<v-icon
											v-if="changeLocale"
											class="font-weight-thin"
											size="40"
											>mdi-close</v-icon
										>
										<span v-else>{{ $i18n.locale }}</span>
									</v-btn>
								</template>
								<v-btn
									v-for="(locale, i) in availableLocales()"
									v-text="locale.code"
									:key="i"
									:to="switchLocalePath(locale.code)"
									icon
									class="pa-0 font-weight-bold circle-lang"
									size="45"
									color="#4A4A4A"
								/>
							</v-speed-dial>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-app-bar>

		<v-content class="pt-2">
			<v-container fluid class="pa-0 fill-height">
				<nuxt />
			</v-container>
		</v-content>
		<v-btn
			class="d-flex d-md-none mobile-icon burger-icon circle-lang"
			@click="toggleVisibilityLocales"
			icon
			x-large
			:class="{ 'locale-button': isSmOnly, 'shadow-menu': isXsOnly }"
		>
			<v-icon size="35" color="black">mdi-menu</v-icon>
		</v-btn>

		<v-bottom-sheet v-model="isShowMobileLocales">
			<div class="relative">
				<v-btn
					class="mobile-icon close-icon circle-lang"
					@click="toggleVisibilityLocales"
					icon
					x-large
				>
					<v-icon size="30" color="black">
						mdi-close
					</v-icon>
				</v-btn>
				<div class="half-round" />
				<div class="locales-container">
					<div class="locales-list">
						<v-btn
							v-for="(locale, i) in $i18n.locales"
							:key="i"
							:to="switchLocalePath(locale.code)"
							class="locale-btn circle-lang"
							active-class="active-locale"
							x-large
							icon
							@click="toggleVisibilityLocales"
						>
							<span class="locale">{{ locale.code }}</span>
						</v-btn>
					</div>
				</div>
			</div>
		</v-bottom-sheet>
	</v-app>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component
	export default class PreliminaryLayout extends Vue {
		changeLocale: boolean = false;
		isShowMobileLocales: boolean = false;

		availableLocales() {
			return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
		}

		get getPageTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('pageTitleFont')}px` };
		}
		get getPageSubTitleFont() {
			return { fontSize: `${this.getAdaptiveSize('pageSubTitleFont')}px` };
		}

		get isSmOnly() {
			return this.$breakpoint ? this.$breakpoint.is.smOnly : false;
		}
		get isSmAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.smAndUp : false;
		}
		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}
		toggleVisibilityLocales() {
			this.isShowMobileLocales = !this.isShowMobileLocales;
		}
	}
</script>

<style lang="sass">
	.app .v-application--wrap
		flex-direction: row!important
		flex-wrap: wrap
		align-items: flex-start

		.app-bar
			position: sticky
			height: 110px !important
			margin-top: 10px !important
			background: rgba(255, 255, 255, 1) !important

	.locale-button
		width: 52px
		height: 52px
		border: 2px solid rgba(74, 74, 74, 1) !important

	.v-bottom-sheet
		background: rgba(138, 138 ,138, 1)
		box-shadow: 0px 11px 0px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 50px 8px rgba(0, 0, 0, 0.12)

	.theme--light.v-btn::before
		opacity: 0 !important

	.theme--light.v-btn:hover::before
		opacity: 0.18 !important

	.close-icon
		z-index: 20
		position: absolute
		left: calc(50vw - 26px)
		top: -18px

	.relative
		position: relative!important

	.half-round
		width: 100%
		height: 30px
		background: #FFFFFF
		clip-path: ellipse(50% 100% at 50% 100%)
		margin-bottom: -1px

	.locale
		font-size: 25px

	.locales-container
		width: 100%
		height: 10vh
		display: flex
		justify-content: center
		align-items: center
		background: #FFFFFF

	.locales-list
		width: 60%
		display: flex
		justify-content: space-between
		color: #FFFFFF

		.locale-btn
			color: #FFFFFF

		span
			color: #000000
			font-weight: 400

		.active-locale span
			font-weight: 700

	.bold-preview
		font-weight: 800
		font-style: normal

	.margin-top
		margin-top: 5%

	.circle-lang
		border-radius: 50% !important
		overflow: hidden
		background-color: #FFFFFF

	.burger-icon
		position: fixed
		left: 50%
		transform: translateX(-50%)
		bottom: 2vh

	.v-btn--icon .v-size--x-large
		min-height: 52px
		min-width: 52px

	.shadow-menu
		box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.35)
</style>
