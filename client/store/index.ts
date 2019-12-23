import {
	Getters,
	Mutations,
	Actions,
	Module,
	Context,
} from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { createStore } from 'vuex-smart-module';

import { Local, PageEntity, ContentEntity } from './interfaces';

import { ContentModule } from './modules/content';
import { PageModule } from './modules/pages';

class RootState {
	auth!: any;
	error!: any;
	locale: string = 'en';
	visibilityLoader: boolean = true;
	showContactBar: boolean = false;
	showScrollBar: boolean = false;
	isHideAnimationContent: boolean = false;
	pageId = '';
	page!: PageEntity;
	pages: PageEntity[] = [];
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
	get getPage(): PageEntity {
		return this.state.page;
	}
	get getPageStage(): PageEntity[] {
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
			(page: PageEntity) => page.id === this.state.pageId,
		);

		return matchingIndex + 1;
	}
	get getPageRouteByIndex(): (index: number) => string | null {
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
	setPages(pages: PageEntity[]) {
		return Vue.set(this.state, 'pages', pages);
	}
	setPage(page: PageEntity) {
		return Vue.set(this.state, 'page', page);
	}
	hideLoader() {
		return Vue.set(this.state, 'visibilityLoader', false);
	}
	setPageIdByPath(path: string) {
		const { locale } = this.state;

		const pages: any = this.state.pages[locale];
		const matchingPage = pages.find((page: PageEntity) =>
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
	private contentModule!: Context<typeof ContentModule>;
	private pageModule!: Context<typeof PageModule>;
	private store!: Store<NuxtAxiosInstance> | any;

	public $init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
		this.contentModule = ContentModule.context(store);
		this.pageModule = PageModule.context(store);
	}

	public async nuxtServerInit(): Promise<void> {
		await this.store.$axios
			.$get('content')
			.then(this.contentModule.mutations.setContents)
			.catch(this.contentModule.mutations.setError);

		await this.store.$axios
			.$get('page')
			.then(this.pageModule.mutations.setPages)
			.catch(this.pageModule.mutations.setError);

		// TODO: Delete after storage refactoring, in favor of atomic storage.
		//       This is necessary for parallel use by the main pages and the admin panel.
		this.state.pages = this.pageModule.state.pages;
		this.state.content = this.contentModule.state.contents;
	}

	public async fetchContentByPageId() {
		const params = {
			page: this.state.pageId,
		};

		await this.store.$axios
			.$get('content/', { params })
			.then(this.mutations.setPageContent)
			.catch(this.mutations.setError);
	}

	public async authorizationUser(data: any): Promise<void> {
		return await this.store.$auth
			.loginWith('local', { data })
			.catch(this.mutations.setError);
	}
}

const RootModule = new Module({
	state: RootState,
	getters: RootGetters,
	mutations: RootMutations,
	actions: RootActions,
	modules: {
		ContentModule,
		PageModule,
	},
});

export default (): Store<any> =>
	createStore(RootModule, {
		strict: process.env.NODE_ENV !== 'production',
	});
