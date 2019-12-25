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

import { ContentModule } from './modules/content';
import { PageModule } from './modules/pages';

class RootState {
	auth!: any;
	error!: any;
	visibilityLoader: boolean = true;
	showContactBar: boolean = false;
	showScrollBar: boolean = false;
	isHideAnimationContent: boolean = false;
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
	get getContactStage() {
		return this.state.contacts;
	}
}

class RootMutations extends Mutations<RootState> {
	__ctx__: any;
	setError(data: any) {
		return Vue.set(this.state, 'error', data);
	}
	hideLoader() {
		return Vue.set(this.state, 'visibilityLoader', false);
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
