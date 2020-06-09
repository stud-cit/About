<template>
	<v-row>
		<v-col xs="12">
			<v-card color="grey darken-4" tile flat>
				<contact-bar default :style="{ position: 'relative' }" />
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
		layout: 'dashboard',
		head() {
			return {
				title: 'Setting',
			};
		},
		components: {
			ContactBar: () => import('~/components/contact-bar'),
		},
	})
	export default class DashboardSettingPage extends Vue {
		@Mutation('changeContactBar') changeContactBar;

		mounted() {
			this.changeContactBar(true);
		}
	}
</script>
