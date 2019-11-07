<template>
	<v-container
		fluid
		id="contact"
		class="pa-0"
		:class="{ static: isStatic }"
		v-if="isStatic || isActive"
	>
		<v-row class="ma-0 slogan" justify="center">
			<v-col cols="10" class="pa-0 font-weight-regular">
				<span
					:class="{ 'font-weight-bold': isSmAndDown }"
					:style="getTagLineFont"
					>{{ $t('common.slogan') }}</span
				>
			</v-col>
		</v-row>
		<v-row class="contact-bar-section pa-0 ma-0 color-main">
			<v-row class="relative" justify="center" align="center">
				<v-row justify="space-around">
					<v-col cols="10" class="pa-0">
						<v-col
							class="my-4 pa-0 d-flex d-md-none justify-space-between"
							:class="isSmAndDown ? 'mobUnderline' : 'underline'"
						>
							<v-col class="bold-preview px-0" cols="auto" :style="getMailFont">
								<a
									class="linkMail color-main"
									:href="`mailto:${contacts[$i18n.locale].email}`"
									target="_blank"
									>{{ contacts[$i18n.locale].email }}</a
								>
							</v-col>
							<v-col
								class="bold-preview px-0"
								cols="auto"
								:style="getMailFont"
								>{{ contacts[$i18n.locale].phone }}</v-col
							>
						</v-col>
						<v-row align="center" justify="space-between">
							<v-col cols="7" md="9" sm="8">
								<v-row
									class="underline mb-4 d-none d-md-flex"
									justify="space-between"
								>
									<v-col cols="auto" :style="getMailFont" class="pa-0">
										<a
											class="linkMail color-main bold-preview"
											href="mailto:studcitmail@gmail.com"
											target="_blank"
											>{{ contacts[$i18n.locale].email }}</a
										>
									</v-col>
									<v-col
										cols="auto"
										:style="getMailFont"
										class="pa-0 bold-preview"
										>{{ contacts[$i18n.locale].phone }}</v-col
									>
								</v-row>
								<v-row>
									<v-col
										cols="12"
										class="bold-preview px-md-0 py-0 color-main"
										:style="getLocationFont"
										>{{ contacts[$i18n.locale].street }}</v-col
									>
									<v-col
										cols="12"
										class="bold-preview px-md-0 py-0 color-main"
										:style="getLocationFont"
										>{{ contacts[$i18n.locale].office }}</v-col
									>
								</v-row>
							</v-col>
							<v-col cols="5" sm="4" md="2" class="pt-0 pt-md-2">
								<v-row
									class="py-md-3 py-0 mr-1 mr-md-0"
									justify="center"
									align="end"
								>
									<a
										class="map"
										target="_blank"
										href="https://www.google.com.ua/maps/place/Department+of+General+and+Theoretical+Physics+of+SSU/@50.8918344,34.8410504,17z/data=!4m9!1m3!11m2!2sfL29wECLWo3E0vp-J1Rb4QPskla8Pg!3e3!3m4!1s0x0:0x33afc095aa39b815!8m2!3d50.8929585!4d34.8404856?hl=ru"
									>
										<v-img src="/map.jpg"></v-img>
									</a>
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-row>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

@Component({})
export default class ContactBar extends Vue {
	@Getter('getContactBarVisibility') isActive;
	@Getter('getContactStage') contacts;

	@Prop({ default: false }) readonly isStatic: boolean;

	get getMailFont() {
		return { fontSize: `${this.getAdaptiveSize('mailFont')}px` };
	}
	get getLocationFont() {
		return { fontSize: `${this.getAdaptiveSize('useContactsAction')}px` };
	}
	get getTagLineFont() {
		return { fontSize: `${this.getAdaptiveSize('tagLineFont')}px` };
	}

	get isMdAndUp() {
		return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
	}
	get isSmAndDown() {
		return this.$breakpoint ? this.$breakpoint.is.smAndDown : false;
	}
	get isXs() {
		return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
	}
}
</script>

<style lang="sass">
.linkMail
	text-decoration: none

.container
	padding: 0 !important

#contact
	position: fixed
	bottom: 0
	padding: 0!important
	z-index: 15

	.contact-bar-section
		background: white

	.color-main
		color: #2d2d2d

.slogan
	position: relative
	top: 7px
	font-style: normal
	color: white
	line-height: 2.5rem

.static
	position: static!important

.underline
	border-bottom: 6px solid #2d2d2d

.mobUnderline
	border-bottom: 2px solid #2d2d2d

.map
	width: 100%

.relative
	position: relative

.bold-preview
	font-weight: 800 !important
	font-style: normal
</style>
