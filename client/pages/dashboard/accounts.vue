<template>
	<v-row justiy="center">
		<v-col xs="12" sm="10" md="8" lg="6" xl="4">
			<v-banner sticky elevation="2" width="auto">
				<ValidationObserver
					v-slot="{ invalid }"
					ref="observer"
					tag="form"
					@submit.prevent="onSubmit"
				>
					<v-progress-linear :indeterminate="progress" :active="progress" />
					<VTextFieldValidation
						v-model="userCredentials.email"
						type="email"
						rules="required|email"
						outlined
						label="Email"
						autocomplete="email"
						prepend-icon="mdi-email-outline"
					/>
					<VTextFieldValidation
						v-model="userCredentials.password"
						:type="show ? 'text' : 'password'"
						:append-icon="changeVisibility(show)"
						rules="required|min:8"
						vid="confirm"
						outlined
						counter
						label="Password"
						autocomplete="current-password"
						prepend-icon="mdi-lock-outline"
						@click:append="show = !show"
					/>
					<v-btn :disabled="invalid" @click="onSubmit" outlined>
						Add
					</v-btn>
				</ValidationObserver>
			</v-banner>
		</v-col>

		<v-col xs="12" sm="10" md="8" lg="6" xl="4">
			<v-card class="mx-auto" max-width="300" tile>
				<v-list flat>
					<v-subheader>Accounts</v-subheader>
					<v-list-item-group color="primary">
						<v-list-item v-for="(item, i) in items" :key="i">
							<v-list-item-icon>
								<v-icon>mdi-account</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title v-text="item.text"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation, Action } from 'vuex-class';
	import { ValidationObserver } from 'vee-validate';

	@Component({
		layout: 'dashboard',
		components: {
			ValidationObserver,
			VTextFieldValidation: () =>
				import('~/components/inputs/VTextFieldValidation'),
		},
		head() {
			return {
				title: 'Accounts',
			};
		},
	})
	export default class DashboardAccountPage extends Vue {
		@Action('authorizationUser') authorizationUser;

		private show: boolean = false;
		private progress: boolean = false;
		private userCredentials = {
			email: '',
			password: '',
		};

		private items = [
			{ text: 'Real-Time' },
			{ text: 'Audience' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
			{ text: 'Conversions' },
		];

		private changeVisibility(condition) {
			return condition ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
		}

		private async onSubmit() {
			const validation = await this.$refs.observer.validate();
			if (!validation) return;
			this.progress = !this.progress;
			return await this.authorizationUser(this.userCredentials);
		}
	}
</script>
