import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { PageEntity } from '../interfaces';

class PageState {
	error!: any;
	page!: PageEntity;
	pages!: PageEntity[];
}

class PageGetters extends Getters<PageState> {
	public get getError(): any {
		return this.state.error;
	}

	public get getPage(): PageEntity {
		return this.state.page;
	}

	public get getPages(): PageEntity[] {
		return this.state.pages;
	}
}

class PageMutations extends Mutations<PageState> {
	public setError(data: any) {
		return Vue.set(this.state, 'error', data);
	}

	public setPage(data: PageEntity) {
		const [lang] = Object.keys(data);
		const [page] = data[lang];
		return Vue.set(this.state, 'page', page);
	}

	public setPages(data: PageEntity[]) {
		return Vue.set(this.state, 'pages', data);
	}
}

class PageActions extends Actions<
	PageState,
	PageGetters,
	PageMutations,
	PageActions
> {
	private store!: Store<NuxtAxiosInstance> | any;

	public $init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
	}

	public async createPage(data: PageEntity): Promise<void> {
		return await this.store.$axios
			.$post('page/', data)
			.then(this.mutations.setPages)
			.catch(this.mutations.setError);
	}

	public async selectPage(params: any): Promise<void> {
		return await this.store.$axios
			.$get('page/', { params })
			.then(this.mutations.setPage)
			.catch(this.mutations.setError);
	}

	public async updatePage(data: PageEntity): Promise<void> {
		return await this.store.$axios
			.$patch('page/', data)
			.then(this.mutations.setPage)
			.catch(this.mutations.setError);
	}

	public async deletePage(data: any): Promise<void> {
		return await this.store.$axios
			.$patch('page/', data)
			.then(this.mutations.setPage)
			.catch(this.mutations.setError);
	}
}

export const PageModule = new Module({
	state: PageState,
	getters: PageGetters,
	mutations: PageMutations,
	actions: PageActions,
});
