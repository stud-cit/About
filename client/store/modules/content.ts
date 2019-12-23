import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { ContentEntity } from '../interfaces';

class ContentState {
	error!: any;
	content!: ContentEntity;
	contents!: ContentEntity;
}

class ContentGetters extends Getters<ContentState> {
	public get getError(): any {
		return this.state.error;
	}

	public get getContent(): ContentEntity {
		console.log();
		return this.state.content;
	}

	public get getContents(): ContentEntity {
		return this.state.contents;
	}
}

class ContentMutations extends Mutations<ContentState> {
	public setError(data: any) {
		return Vue.set(this.state, 'error', data);
	}

	public setContents(data: ContentEntity[]) {
		return Vue.set(this.state, 'contents', data);
	}

	public setContent(data: ContentEntity) {
		const [lang] = Object.keys(data);
		return Vue.set(this.state, 'content', data[lang]);
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

	public async createContent(data: ContentEntity): Promise<void> {
		return await this.store.$axios
			.$post('content/', data)
			.then(this.mutations.setContents)
			.catch(this.mutations.setError);
	}

	public async selectContent(params: any): Promise<void> {
		return await this.store.$axios
			.$get('content/', { params })
			.then(this.mutations.setContent)
			.catch(this.mutations.setError);
	}

	public async updateContent(data: ContentEntity): Promise<void> {
		return await this.store.$axios
			.$patch('content/', data)
			.then(this.mutations.setContent)
			.catch(this.mutations.setError);
	}

	public async deleteContent(data: any): Promise<void> {
		return await this.store.$axios
			.$patch('content/', data)
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
