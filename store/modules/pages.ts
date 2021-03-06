import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { PageEntity, StorageEntity } from '../interfaces';

class PageState {
	error!: any;
	cover!: StorageEntity;
	page: PageEntity | {} = {};
	pages!: PageEntity[];
}

class PageGetters extends Getters<PageState> {
	public get getError(): any {
		return this.state.error;
	}

	public get getCover(): StorageEntity | {} {
		return this.state.cover;
	}

	public get getPage(): PageEntity | {} {
		return this.state.page;
	}

	public get getPages(): PageEntity[] {
		return this.state.pages;
	}
	get getPageIndex(): (locale: string) => number {
		return locale => {
			const matchingIndex = this.state.pages[locale].findIndex(
				(page: PageEntity) => page.page_id === this.state.page.page_id,
			);
			return matchingIndex + 1;
		};
	}
	get getPageRouteByIndex(): (locale: string, index: number) => string | null {
		return (locale, index) => {
			const pages = this.state.pages[locale];
			let changedIndex: number;
			if (index > pages.length - 1) {
				changedIndex = 0;
			} else if (index < 0) {
				changedIndex = pages.length - 1;
			} else {
				changedIndex = index;
			}

			const currentPage = pages[changedIndex];
			return currentPage ? currentPage.link : null;
		};
	}
}

class PageMutations extends Mutations<PageState> {
	public setError(data: any): any {
		return Vue.set(this.state, 'error', data);
	}

	public setPage(page: PageEntity): PageEntity {
		return Vue.set(this.state, 'page', page);
	}

	public setPlainPage(data: PageEntity): PageEntity {
		return Vue.set(this.state, 'page', data);
	}

	public setPages({ data }: { data: PageEntity[] }): PageEntity[] {
		return Vue.set(this.state, 'pages', data);
	}

	/**
	 * 1. Find page by route in state
	 * 2. Set page cover
	 */
	public setPageCover({ lang, link }: Record<string, string>): StorageEntity {
		const matchingPage = this.state.pages[lang].find((page: PageEntity) =>
			link.includes(page.link),
		);

		return Vue.set(this.state, 'cover', matchingPage.cover);
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
			.$post('page', data)
			.then(this.mutations.setPages)
			.catch(this.mutations.setError);
	}
	public async updatePageCover({
		id,
		lang,
		formData,
	}: {
		id: string;
		lang: string;
		formData: any;
	}): Promise<void> {
		const headers = { 'Content-Type': 'multipart/form-data' };
		return await this.store.$axios.$post(`admin/page/${lang}/${id}`, formData, {
			headers,
		});
	}

	public async selectPages(): Promise<void> {
		return await this.store.$axios
			.$get('page')
			.then(this.mutations.setPages)
			.catch(this.mutations.setError);
	}

	public async selectPage(params?: any): Promise<void> {
		// remove slashes from link
		if (params.link) {
			params.link = params.link.replace('/', '');
		}

		return await this.store.$axios
			.$get('page', { params })
			.then((request: any) => this.mutations.setPage(request.data))
			.catch(this.mutations.setError);
	}

	public async updatePage({ lang, id, ...data }): Promise<void> {
		return await this.store.$axios
			.$post(`admin/page/${lang}/${id}`, data)
			.then(this.mutations.setPage)
			.catch(this.mutations.setError);
	}

	public async deletePage({ page_id }: PageEntity): Promise<void> {
		await this.store.$axios
			.$delete('page', { params: { page_id } })
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
