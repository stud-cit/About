<template>
	<v-col
		xs="6"
		md="12"
		:class="{ 'card-addition': isMdAndUp, 'pa-0': isMdAndUp }"
	>
		<div
			class="employee-name font-weight-bold line-height-1-2"
			:class="isMdAndUp ? 'mt-6 mb-4' : 'mt-3 mb-2'"
			:style="getStaffNameFont"
		>
			{{ employee.title }}
		</div>
		<div class="employee-position-short" :style="getStaffPositionFont">
			{{ employee.description }}
		</div>
		<div
			class="employee-position-full font-weight-bold mt-7"
			:style="getStackPositionFont"
		>
			{{ employee.description }}
		</div>
		<p
			class="text-center white--text font-italic"
			:class="isXsOnly ? 'subtitle-2' : 'heading'"
			v-if="!isMdAndUp"
		>
			{{ sliderInfo }}
		</p>
	</v-col>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
		props: ['employee', 'sliderInfo', 'isMdAndUp', 'isXsOnly'],
	})
	export default class EmployeeInfo extends Vue {
		get getStaffNameFont() {
			return { fontSize: `${this.getAdaptiveSize('staffNameFont')}px` };
		}
		get getStaffPositionFont() {
			return { fontSize: `${this.getAdaptiveSize('staffPositionFont')}px` };
		}
		get getStackPositionFont() {
			return { fontSize: `${this.getAdaptiveSize('stackPositionFont')}px` };
		}
	}
</script>

<style lang="sass">
	.employee-name
		color: rgba(255, 255, 255, 1)
		text-align: center
		margin-bottom: 0
		display: block

	.employee-position-short, .employee-position-full
		font-weight: 400
		color: rgba(255, 255, 255, 1)
		text-align: center

	.employee-position-full
		opacity: 0

	.line-height-1-2
		line-height: 1.2
</style>
