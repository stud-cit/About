<template>
	<v-row align="center" justify="center">
		<v-col
			v-for="item in pages[$i18n.locale]"
			:key="item.index"
			xs="12"
			sm="8"
			md="6"
			lg="4"
		>
			<v-card outlined>
				<content-cover :src="item.cover && item.cover.image">
					<template #title>
						<v-text-field
							dark
							label="Title"
							counter="255"
							maxlength="255"
							:id="item.id"
							:value="item.title"
							@blur="onChangeTitleInput"
						/>
					</template>

					<v-btn
						dark
						icon
						large
						:to="'dashboard/' + item.link"
						@click="setPlainPage(item)"
					>
						<v-icon medium>mdi-open-in-app</v-icon>
					</v-btn>

					<v-btn dark large icon @click="onChangeContentCover(item)">
						<v-icon medium>mdi-camera</v-icon>
					</v-btn>
				</content-cover>
				<v-card-text style="position: relative">
					<v-btn
						absolute
						dark
						fab
						top
						right
						small
						color="red"
						@click="onChangeDelete(item)"
					>
						<v-icon>mdi-delete-outline</v-icon>
					</v-btn>
					<v-row dense>
						<v-col xs="12" sm="6" cols="12">
							<v-text-field
								label="Name"
								counter="255"
								maxlength="255"
								:id="item.id"
								:value="item.name"
								@blur="onChangeNameInput"
							/>
						</v-col>
						<v-col xs="12" sm="6" cols="12">
							<v-text-field
								label="Link"
								counter="255"
								maxlength="255"
								:id="item.id"
								:value="item.link"
								@blur="onChangeLinkInput"
							/>
						</v-col>
						<v-col cols="12">
							<v-textarea
								rows="6"
								counter="255"
								maxlength="255"
								label="Description"
								:value="item.description"
								:id="item.id"
								@blur="onChangeDescriptionInput"
							/>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>

		<input
			ref="file"
			type="file"
			accept="image/* video/*"
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
				title: 'Dashboard',
			};
		},
		components: {
			ContentCover: () => import('~/components/content/content-cover'),
		},
	})
	export default class DashboardPage extends Vue {
		@Getter('StorageModule/getStorage') private readonly storage;
		@Getter('PageModule/getPages') private readonly pages;
		@Getter('PageModule/getPage') private readonly page;

		@Mutation('PageModule/setPlainPage') private readonly setPlainPage;

		@Action('StorageModule/createStore') private readonly createStore;
		@Action('PageModule/selectPages') private readonly selectPages;
		@Action('PageModule/updatePage') private readonly updatePage;
		@Action('PageModule/deletePage') private readonly deletePage;

		private onChangeLinkInput({ target }): void {
			const link = target.value;
			const params = { id: target.id };
			this.updatePage({ link, params });
		}

		private onChangeNameInput({ target }): void {
			const name = target.value;
			const params = { id: target.id };
			this.updatePage({ name, params });
		}

		private onChangeTitleInput({ target }): void {
			const title = target.value;
			const params = { id: target.id };
			this.updatePage({ title, params });
		}

		private onChangeDescriptionInput({ target }): void {
			const description = target.value;
			const params = { id: target.id };
			this.updatePage({ description, params });
		}

		private onChangeContentCover(item: any): void {
			this.$refs.file.click();
			this.setPlainPage(item);
		}

		private async onChangeDelete(item) {
			await this.deletePage(item);
			await this.selectPages();
		}

		private async onFileInputChange(fieldName, file) {
			const formData = new FormData();
			const [imageFile] = this.$refs.file.files;
			if (!imageFile) return
			formData.append('file', imageFile);
			await this.createStore(formData);
			await this.updatePage({
				cover: this.storage,
				params: { id: this.page.id },
			});
			await this.selectPages();
		}
	}
</script>
