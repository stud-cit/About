import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { createStore } from 'vuex-smart-module';

import { AboutModule } from './modules/about.module';
import { OffersModule } from './modules/offers.module';
import { OurStaffModule } from './modules/ourStaff.module';
import { PortfolioModule } from './modules/portfolio.module';

// cover using for showing img during video loading
interface VideoBgModel {
	readonly cover: string;
	readonly videoMobile: string;
	readonly videoPc: string;
}
interface PageModel {
	readonly id: number;
	readonly title: string;
	readonly link: string;
	readonly videoBg: VideoBgModel;
}

interface ContactsLocaleModel {
	email: string;
	phone: string;
	street: string;
	office: string;
}

interface ContactsModel {
	ua: ContactsLocaleModel;
	ru: ContactsLocaleModel;
	en: ContactsLocaleModel;
}

class RootState {
	auth!: any;
	error!: any;
	visibilityLoader: boolean = true;
	showContactBar: boolean = false;
	showScrollBar: boolean = false;
	pageId = 0;
	pages: PageModel[] = [
		{
			id: 1,
			title: 'pages.about',
			link: 'about',
			videoBg: {
				cover: '/about.jpg',
				videoMobile: '/about-us-mobile.mp4',
				videoPc: '/about-us-pc.mp4',
			},
		},
		{
			id: 2,
			title: 'pages.weOffers',
			link: 'offers',
			videoBg: {
				cover: '/offers.jpg',
				videoMobile: '/we-offer-mobile.mp4',
				videoPc: '/we-offer-pc.mp4',
			},
		},
		{
			id: 3,
			title: 'pages.ourStaff',
			link: 'our-staff',
			videoBg: {
				cover: '/our-staff.jpg',
				videoMobile: '/staff-mobile.mp4',
				videoPc: '/staff-pc.mp4',
			},
		},
		{
			id: 4,
			title: 'pages.portfolio',
			link: 'portfolio',
			videoBg: {
				cover: '/portfolio.jpg',
				videoMobile: '/portfolio-mobile.mp4',
				videoPc: '/portfolio-pc.mp4',
			},
		},
	];
	contacts: ContactsModel = {
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

	get getPageVideoBg(): VideoBgModel | {} {
		const currentPage = this.state.pages.find(
			({ id }: PageModel) => id === this.state.pageId,
		);
		return currentPage ? currentPage.videoBg : {};
	}

	get getPageStage(): PageModel[] {
		return this.state.pages;
	}

	get getPageId(): number {
		return this.state.pageId;
	}

	get getPageRouteById(): (index: number) => string {
		return (index: number) => {
			const changedIndex = index > 4 ? 1 : index < 1 ? 4 : index;
			const currentPage = this.state.pages.find(
				({ id }: PageModel) => id === changedIndex,
			);
			return currentPage ? currentPage.link : '';
		};
	}
	get getContactStage(): ContactsModel {
		return this.state.contacts;
	}
}

class RootMutations extends Mutations<RootState> {
	setError(data: any) {
		return Vue.set(this.state, 'error', data);
	}
	hideLoader() {
		return Vue.set(this.state, 'visibilityLoader', false);
	}
	changePageId(pageId: number) {
		return Vue.set(this.state, 'pageId', pageId);
	}
	changeContactBar(visibility: boolean) {
		return Vue.set(this.state, 'showContactBar', visibility);
	}
	changeScrollBar(visibility: boolean) {
		return Vue.set(this.state, 'showScrollBar', visibility);
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
	modules: {
		AboutModule,
		OffersModule,
		OurStaffModule,
		PortfolioModule,
	},
});

export default (): Store<any> =>
	createStore(RootModule, {
		strict: process.env.NODE_ENV !== 'production',
	});
