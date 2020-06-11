import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { ContentEntity, ContentFiltersModel } from '../interfaces';

class ContentState {
	contents!: ContentEntity;
	content!: ContentEntity;
	error!: any;
}

class ContentGetters extends Getters<ContentState> {
	public get getError(): any {
		return this.state.error;
	}

	public get getContent(): ContentEntity {
		return this.state.content;
	}

	public get getContents(): ContentEntity {
		return this.state.contents;
	}
}

class ContentMutations extends Mutations<ContentState> {
	public setError(data: any): void {
		return Vue.set(this.state, 'error', data);
	}

	public setContents({ data }: { data: ContentEntity[] }) {
		return Vue.set(this.state, 'contents', data);
	}

	public setContent(data: ContentEntity) {
		return Vue.set(this.state, 'content', data);
	}

	public setContentFromServer({ data }: { data: ContentEntity }) {
		return Vue.set(this.state, 'content', data);
	}
}

class ContentActions extends Actions<
	ContentState,
	ContentGetters,
	ContentMutations,
	ContentActions
> {
	private store!: Store<NuxtAxiosInstance> | any;

	public $init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
	}

	public async createContent({
		id,
		lang,
	}: {
		id: string;
		lang: string;
	}): Promise<void> {
		// create initial content record
		const contentToCreate = {
			page_id: id,
			title: 'Title',
			description: 'Description',
			image: null,
			lang,
		};

		return await this.store.$axios
			.$post('admin/content', contentToCreate)
			.then(this.mutations.setContentFromServer)
			.catch(this.mutations.setError);
	}

	public async selectClientContent(
		params?: ContentFiltersModel,
	): Promise<void> {
		return await this.store.$axios
			.$get('content', { params })
			.then(this.mutations.setContents)
			.catch(this.mutations.setError);
	}

	public async selectAdminContent(params?: ContentFiltersModel): Promise<void> {
		return await this.store.$axios
			.$get('admin/content', { params })
			.then(this.mutations.setContents)
			.catch(this.mutations.setError);
	}

	public async updateContent({ id, lang, ...data }): Promise<void> {
		return await this.store.$axios
			.$post(`admin/content/${lang}/${id}`, data)
			.then(this.mutations.setContentFromServer)
			.catch(this.mutations.setError);
	}

	public async updateContentCover({
		id,
		lang,
		formData,
	}: {
		id: string;
		lang: string;
		formData: any;
	}): Promise<void> {
		const headers = { 'Content-Type': 'multipart/form-data' };
		return await this.store.$axios.$post(
			`admin/content/${lang}/${id}`,
			formData,
			{ headers },
		);
	}

	public async deleteContent({ content_id }: ContentEntity): Promise<void> {
		return await this.store.$axios
			.$delete(`admin/content/${content_id}`)
			.then(this.mutations.setContent)
			.catch(this.mutations.setError);
	}
}

export const ContentModule = new Module({
	state: ContentState,
	getters: ContentGetters,
	mutations: ContentMutations,
	actions: ContentActions,
});
