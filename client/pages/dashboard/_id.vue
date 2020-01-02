<template>
	<v-row align="center" justify="center">
		<v-col v-for="item in contents" :key="item.id" sm="12" md="6" lg="4">
			<v-card outlined>
				<content-cover :src="item.cover && item.cover.image">
					<template #title>
						<v-text-field
							dark
							label="Title"
							counter="255"
							maxlength="255"
							:value="item.title"
							:id="item.id"
							@blur="onChangeTitleInput"
						/>
					</template>
					<v-btn dark x-large icon @click="onChangeContentCover(item)">
						<v-icon large>mdi-camera</v-icon>
					</v-btn>
				</content-cover>
				<v-card-text>
					<v-textarea
						counter
						rows="6"
						counter="255"
						maxlength="255"
						label="Description"
						:value="item.description"
						:id="item.id"
						@blur="onChangeDescriptionInput"
					/>
				</v-card-text>
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
	import { Getter, Mutation, Action } from 'vuex-class';

	@Component({
		layout: 'dashboard',
		head() {
			return {
				title: this.page.title,
			};
		},
		components: {
			ContentCover: () => import('~/components/content/content-cover'),
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
		@Getter('ContentModule/getContents') private readonly contents;
		@Getter('ContentModule/getContent') private readonly content;
		@Getter('StorageModule/getStorage') private readonly storage;
		@Getter('PageModule/getPage') private readonly page;

		@Mutation('ContentModule/setContent') private readonly setContent;

		@Action('ContentModule/updateContent') private readonly updateContent;
		@Action('ContentModule/selectContent') private readonly selectContent;
		@Action('StorageModule/createStore') private readonly createStore;

		private async onChangeTitleInput({ target }) {
			await this.updateContent({
				title: target.value,
				params: { id: target.id }
			});
		}

		private async onChangeDescriptionInput({ target }) {
			await this.updateContent({
				description: target.value,
				params: { id: target.id },
			});
		}

		private async onChangeContentCover(item) {
			this.$refs.file.click();
			return this.setContent(item);
		}

		private async onFileInputChange(fieldName, file) {
			const formData = new FormData();
			const imageFile = this.$refs.file.files[0];
			formData.append('file', imageFile);
			await this.createStore(formData);
			await this.updateContent({
				cover: this.storage.id,
				params: { id: this.content.id },
			});
			await this.selectContent({
				page: this.page.id,
				lang: this.$i18n.locale,
			});
		}
	}
</script>
