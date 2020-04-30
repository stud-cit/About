<template>
	<v-card>
		<ValidationObserver
			v-slot="{ invalid }"
			ref="observer"
			tag="form"
			@submit.prevent="onSubmit"
		>
			<v-progress-linear :indeterminate="progress" :active="progress" />
			<v-card-title class="title font-weight-regular justify-center">
				<span>Dasboard</span>
			</v-card-title>
			<v-card-text>
				<VTextFieldValidation
					v-model="userCredentials.email"
					type="email"
					rules="required|email"
					outlined
					label="Email"
					autocomplete="email"
					prepend-icon="mdi-email-outline"
					:error="error"
				/>
				<VTextFieldValidation
					v-model="userCredentials.password"
					:type="show ? 'text' : 'password'"
					:append-icon="changeVisibility(show)"
					rules="required|min:6"
					vid="confirm"
					outlined
					counter
					label="Password"
					autocomplete="current-password"
					prepend-icon="mdi-lock-outline"
					@click:append="show = !show"
					:error="error"
				/>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn :disabled="invalid" @click="onSubmit" depressed color="primary">
					Login
				</v-btn>
			</v-card-actions>
		</ValidationObserver>
	</v-card>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { ValidationObserver } from 'vee-validate';
	import { Action } from 'vuex-class';

	@Component({
		middleware: ['guest'],
		components: {
			ValidationObserver,
			VTextFieldValidation: () =>
				import('~/components/inputs/VTextFieldValidation'),
		},
	})
	export default class DashboardAuthPage extends Vue {
		@Action('authorizationUser') authorizationUser;

		private show: boolean = false;
		private progress: boolean = false;
		private error: boolean = false;
		private userCredentials = {
			email: '',
			password: '',
		};

		private changeVisibility(condition) {
			return condition ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
		}

		private async onSubmit() {
			const validation = await this.$refs.observer.validate();
			if (!validation) return;
			this.progress = !this.progress;
			this.error = false;

			const result = await this.authorizationUser(this.userCredentials);

			if (!result) {
				this.progress = false;
				this.error = true;
			}
		}
	}
</script>
