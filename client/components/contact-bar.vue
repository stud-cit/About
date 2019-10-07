<template>
	<v-container
		fluid
		id="contact"
		class="pa-0"
		:class="{ static: isStatic }"
		v-if="isStatic || isActive"
	>
		<v-row class="ma-0 slogan" justify="center">
			<v-col cols="10" class="pa-0 font-weight-medium">
				<span
					:class="{ 'font-weight-bold': isSmAndDown }"
					:style="getTagLineFont"
				>
					{{ $t('about.tagLine') }}
				</span>
			</v-col>
		</v-row>
		<v-row class="contact-bar-section pa-0 ma-0">
			<v-row class="relative" justify="center" align="center">
				<v-row justify="space-around">
					<v-col cols="10">
						<v-col
							class="mb-4 d-flex d-sm-none justify-space-between"
							:class="isXs ? 'mobUnderline' : 'underline'"
						>
							<v-col
								class="font-weight-bold"
								cols="auto"
								:style="getMailFont"
							>
								{{ contacts.email }}
							</v-col>
							<v-col
								class="font-weight-bold"
								cols="auto"
								:style="getMailFont"
							>
								{{ contacts.phone }}
							</v-col>
						</v-col>
						<v-row align="center" justify="space-between">
							<v-col cols="6" sm="8" md="9">
								<v-row
									class=" underline mb-4 d-none d-sm-flex font-weight-bold"
									justify="space-between"
								>
									<v-col cols="auto" :style="getMailFont">
										{{ contacts.email }}
									</v-col>
									<v-col cols="auto" :style="getMailFont">
										{{ contacts.phone }}
									</v-col>
								</v-row>
								<v-col
									cols="12"
									class="font-weight-bold px-0 py-0 "
									:style="getLocationFont"
								>
									{{ contacts.street }}
								</v-col>
								<v-col
									cols="12"
									class="font-weight-bold px-0 py-0 "
									:style="getLocationFont"
								>
									{{ contacts.office }}
								</v-col>
							</v-col>
							<v-col cols="6" sm="3" md="2">
								<v-row class="pb-0" justify="center" align="end">
									<a
										class="map"
										href="https://www.google.com.ua/maps/place/Department+of+General+and+Theoretical+Physics+of+SSU/@50.8918344,34.8410504,17z/data=!4m9!1m3!11m2!2sfL29wECLWo3E0vp-J1Rb4QPskla8Pg!3e3!3m4!1s0x0:0x33afc095aa39b815!8m2!3d50.8929585!4d34.8404856?hl=ru"
									>
										<v-img src="/map.png"></v-img>
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
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 16,
				sm: 18,
				md: 20,
				lg: 25,
			})}px`,
		};
	}
	get getCreadentialsFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 20,
				sm: 28,
				md: 35,
				lg: 42,
			})}px`,
		};
	}
	get getLocationFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 14,
				sm: 18,
				md: 22,
				lg: 35,
			})}px`,
		};
	}
	get getTagLineFont() {
		return {
			fontSize: `${this.getCustomAdaptiveSize({
				xs: 30,
				sm: 44,
				md: 74,
				lg: 95,
				xl: 125,
			})}px`,
		};
	}
	get isSmAndUp() {
		return this.$breakpoint ? this.$breakpoint.is.smAndUp : false;
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
.container
	padding: 0 !important

#contact
	position: fixed
	bottom: 0
	padding: 0!important
	z-index: 15

	.contact-bar-section
		background: white
		color: black

.slogan
	position: relative
	top: 7px
	font-style: normal
	color: white
	line-height: 2.5rem

.static
	position: static!important

.underline
	border-bottom: 6px solid black

.mobUnderline
	border-bottom: 2px solid black

.map
	width: 100%

.relative
	position: relative
</style>
