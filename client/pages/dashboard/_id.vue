<template>
	<v-row align="center" justify="center">
		<v-col
			v-for="item in content"
			:key="item.id"
			cols="12"
			sm="12"
			md="8"
			lg="6"
		>
			<v-card flat>
				<v-card-title>
					<v-text-field
						counter="255"
						maxlength="255"
						label="Title"
						:value="item.title"
					/>
				</v-card-title>

				<template v-if="item.cover">
					<v-img
						@click="$refs.file.click()"
						:src="getDynamicAssets(item.cover.image)"
					/>
				</template>

				<template v-else>
					<v-row align="center" justify="center">
						<v-avatar size="100" color="indigo" @click="$refs.file.click()">
							<v-icon dark large>mdi-camera</v-icon>
						</v-avatar>
					</v-row>
				</template>

				<v-card-text>
					<v-textarea
						counter
						rows="5"
						counter="255"
						maxlength="255"
						label="Description"
						:value="item.description"
					/>
				</v-card-text>

				<v-card-actions> </v-card-actions>
			</v-card>
		</v-col>

		<input
			ref="file"
			type="file"
			accept="image/*"
			style="display:none"
			@change="onFileInputChange()"
		/>
	</v-row>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component({
		layout: 'dashboard',
		head() {
			return {
				title: this.page.title,
			};
		},
		async fetch({ store, params }) {
			await store.dispatch('PageModule/selectPage', {
				lang: store.$i18n.locale,
				link: params.id,
			});

			await store.dispatch('ContentModule/selectContent', {
				page: store.getters['PageModule/getPage'].id,
				lang: store.$i18n.locale,
			});
		},
	})
	export default class DashboardPage extends Vue {
		@Getter('ContentModule/getContent') content;
		@Getter('PageModule/getPage') page;
		@Mutation('PageModule/setPage') setPage;

		private async onFileInputChange(fieldName, file) {
			const formData = new FormData();
			const imageFile = this.$refs.file.files[0];
			formData.append('logotype', imageFile);
			return await this.updateLogotype(formData);
		}
	}
</script>
