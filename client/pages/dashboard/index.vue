<template>
	<v-row align="center" justify="center">
		<v-col
			v-for="item in pages[$i18n.locale]"
			:key="item.index"
			sm="12"
			md="8"
			lg="6"
		>

		<v-card outlined :to="'dashboard/' + item.link" @click="setPage(item)" >
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
				<v-btn dark x-large icon @click="onChangeCntentCover(item)">
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

			<!-- <v-card :to="'dashboard/' + page.link" @click="setPage(page)">
				<v-img
					height="30vh"
					:src="getDynamicAssets(page.cover && page.cover.image)"
					:lazy-src="getDynamicAssets(page.cover && page.cover.image)"
					:gradient="imagePageGradient"
					:aspect-ratio="16 / 9"
				>
					<v-card-title class="title white--text fill-height">
						<v-row justify="center" align="center" class="fill-height">
							<span class="font-weight-bold text-uppercase">
								{{ page.title }}.
							</span>
						</v-row>
					</v-card-title>
					<div class="fill-height bottom-gradient"></div>
				</v-img>
			</v-card> -->
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

		@Mutation('PageModule/setPage') setPage;

		@Action('StorageModule/createStore') private readonly createStore;
		@Action('PageModule/updatePage') private readonly updatePage;
		@Action('PageModule/selectPage') private readonly selectPage;

		private onChangeTitleInput({ target }) {
			this.updatePage({
				title: target.value,
				params: { id: target.id }
			});
		}

		private onChangeDescriptionInput({ target }) {
			this.updatePage({
				description: target.value,
				params: { id: target.id },
			});
		}
	}
</script>
