<template>
	<v-row justify="center">
		<v-col md="12" xl="8">
			<v-card>
				<ValidationObserver
					ref="observer"
					tag="div"
					v-slot="{ invalid }"
					@submit.prevent="onSubmit"
				>
					<v-row align="center" justify="center">
						<!-- <v-progress-linear :indeterminate="progress" :active="progress" /> -->
						<v-col xs="1" align="center" cols="1">
							Amdins
						</v-col>
						<v-divider class="mx-2" inset vertical></v-divider>
						<v-col xs="5">
							<VTextFieldValidation
								v-model="userCredentials.email"
								type="email"
								rules="required|email"
								label="Email"
							/>
						</v-col>
						<v-col xs="5">
							<VTextFieldValidation
								v-model="userCredentials.password"
								rules="required|min:8"
								vid="confirm"
								counter
								label="Password"
								@click:append="show = !show"
								:append-icon="changeVisibility(show)"
								:type="show ? 'text' : 'password'"
							/>
						</v-col>
						<v-col xs="1">
							<v-btn :disabled="invalid" @click="onSubmit" text>
								Add
							</v-btn>
						</v-col>
					</v-row>
				</ValidationObserver>
				<v-data-table
					sort-by="email"
					:items="items"
					:headers="headers"
					:search="userCredentials.email"
				>
					<template v-slot:item.action="{ item }">
						<v-icon small class="mr-2">
							account-edit-outline
						</v-icon>
						<v-icon small>
							account-off-outline
						</v-icon>
					</template>
					<template v-slot:no-data>
						<v-btn color="primary" @click="initialize">Reset</v-btn>
					</template>
				</v-data-table>
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

		private headers = [
			{ text: 'Email', align: 'center', value: 'email' },
			{ text: 'Create', align: 'center', value: 'createAt' },
			{ text: 'Update', align: 'center', value: 'updateAt' },
		];

		private items = Array.from(new Array(5), () => ({
			email: 'Real-Time',
			createAt: new Date(),
			updateAt: new Date(),
		}));

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
