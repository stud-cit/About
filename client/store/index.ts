import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { createStore } from 'vuex-smart-module';

import { PageModel, CoverModel } from './interfaces';

class RootState {
	auth!: any;
	error!: any;
	locale: string = 'en';
	visibilityLoader: boolean = true;
	showContactBar: boolean = false;
	showScrollBar: boolean = false;
	isHideAnimationContent: boolean = false;
	pageId = '';
	page!: PageModel;
	pages: PageModel[] = [];
	content: {} = {};
	contacts = {
		ua: {
			email: 'STUDCITMAIL@GMAIL.COM',
			phone: '+380 98 43 70 202',
			street: 'Україна, м. Суми, вул. Римського-Корсакова, 2',
			office: 'Сумський державний університет, ЕТ-корпус, каб. ET-504',
		},
		ru: {
			email: 'STUDCITMAIL@GMAIL.COM',
			phone: '+380 98 43 70 202',
			street: 'Украина, г. Сумы, ул. Римського-Корсакова, 2',
			office: 'Сумский Государственный Университет, ЭТ-корпус, каб. ЭT-504',
		},
		en: {
			email: 'STUDCITMAIL@GMAIL.COM',
			phone: '+380 98 43 70 202',
			street: 'Ukraine, Sumy, st. Rimsky-Korsakov, 2',
			office: 'Sumy State University, Electrotechnical Corps, cab. ET-504',
		},
	};
}

class RootGetters extends Getters<RootState> {
	get getError(): any {
		return this.state.error;
	}
	get visibilityLoader(): boolean {
		return this.state.visibilityLoader;
	}
	get isAuth(): boolean {
		return this.state.auth.loggedIn;
	}
	get getContactBarVisibility(): boolean {
		return this.state.showContactBar;
	}
	get getScrollBarVisibility(): boolean {
		return this.state.showScrollBar;
	}
	get getIsHideAnimationContent(): boolean {
		return this.state.isHideAnimationContent;
	}
	get getPage(): PageModel {
		return this.state.page;
	}
	get getPageStage(): PageModel[] {
		const { locale } = this.state;
		return this.state.pages[locale];
	}
	get getPageContent(): Record<string, any>[] {
		const { locale } = this.state;
		return this.state.content[locale];
	}
	get getPageIndex(): number {
		const { locale } = this.state;
		const matchingIndex = this.state.pages[locale].findIndex(
			(page: PageModel) => page.id === this.state.pageId,
		);

		return matchingIndex + 1;
	}
	get getPageRouteByIndex(): (index: number) => string {
		return index => {
			const { locale } = this.state;
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
	get getContactStage() {
		return this.state.contacts;
	}
}

class RootMutations extends Mutations<RootState> {
	__ctx__: any;
	setError(data: any) {
		return Vue.set(this.state, 'error', data);
	}
	setLocale(locale: string) {
		return Vue.set(this.state, 'locale', locale);
	}
	setPages(pages: PageModel[]) {
		return Vue.set(this.state, 'pages', pages);
	}
	setPage(page: PageModel) {
		return Vue.set(this.state, 'page', page);
	}
	hideLoader() {
		return Vue.set(this.state, 'visibilityLoader', false);
	}
	setPageIdByPath(path: string) {
		const { locale } = this.state;

		const pages: any = this.state.pages[locale];
		const matchingPage = pages.find((page: PageModel) =>
			path.includes(page.link),
		);

		if (matchingPage) {
			Vue.set(this.state, 'pageId', matchingPage.id);
			Vue.set(this.state, 'page', matchingPage);
		}
	}
	setPageContent(content: Record<string, any>) {
		Vue.set(this.state, 'content', content);
	}
	changeContactBar(visibility: boolean) {
		return Vue.set(this.state, 'showContactBar', visibility);
	}
	changeScrollBar(visibility: boolean) {
		return Vue.set(this.state, 'showScrollBar', visibility);
	}
	changeIsHideAnimationContent(isHide: boolean) {
		return Vue.set(this.state, 'isHideAnimationContent', isHide);
	}
}

class RootActions extends Actions<
	RootState,
	RootGetters,
	RootMutations,
	RootActions
> {
	store!: Store<NuxtAxiosInstance> | any;

	$init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
	}

	async nuxtServerInit() {
		return await this.store.$axios
			.$get('page/')
			.then(data => this.mutations.setPages(data))
			.catch(err => this.mutations.setError(err));
	}

	async fetchContentByPageId() {
		const params = {
			page: this.state.pageId,
		};

		await this.store.$axios
			.$get('content/', { params })
			.then(pageContent => this.mutations.setPageContent(pageContent))
			.catch(err => this.mutations.setError(err));
	}

	async authorizationUser(data: any): Promise<void> {
		return await this.store.$auth
			.loginWith('local', { data })
			.catch(err => this.mutations.setError(err));
	}
}

const RootModule = new Module({
	state: RootState,
	getters: RootGetters,
	mutations: RootMutations,
	actions: RootActions,
});

export default (): Store<any> =>
	createStore(RootModule, {
		strict: process.env.NODE_ENV !== 'production',
	});
