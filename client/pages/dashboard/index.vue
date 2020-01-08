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
						:value="item.title"
						:id="item.id"
						@blur="onChangeTitleInput"
					/>
				</template>

				<v-btn dark icon large :to="'dashboard/' + item.link" @click="setPage(item)">
					<v-icon medium >mdi-open-in-app</v-icon>
				</v-btn>

				<v-btn dark icon large @click="deletePage({ id: item.id, lang: $i18n.locale})">
					<v-icon medium >mdi-delete-outline</v-icon>
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

		@Mutation('PageModule/setPage') private readonly setPage;

		@Action('StorageModule/createStore') private readonly createStore;
		@Action('PageModule/selectPage') private readonly selectPage;
		@Action('PageModule/updatePage') private readonly updatePage;
		@Action('PageModule/deletePage') private readonly deletePage;

		private onChangeTitleInput({ target }) {
			return this.updatePage({
				title: target.value,
				params: { id: target.id }
			});
		}

		private onChangeDescriptionInput({ target }) {
			return this.updatePage({
				description: target.value,
				params: { id: target.id },
			});
		}
	}
</script>
