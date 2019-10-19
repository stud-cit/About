import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { createStore } from 'vuex-smart-module';

import { AboutModule } from './modules/about.module';
import { OffersModule } from './modules/offers.module';
import { OurStaffModule } from './modules/ourStaff.module';
import { PortfolioModule } from './modules/portfolio.module';



interface PageModel {
	readonly id: number;
	readonly title: string;
	readonly to: string;
	readonly img: string;
	readonly lazyImg: string;
	readonly cover: string;
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
	pageId = 0;
	pages: PageModel[] = [
		{
			id: 1,
			title: 'pages.about',
			to: 'about',
			img: '/images/background/about.jpg',
			lazyImg: 'https://picsum.photos/id/1/60',
			cover: '/images/background/about.jpg',
		},
		{
			id: 2,
			title: 'pages.weOffers',
			to: 'offers',
			img: '/images/background/offers.jpg',
			lazyImg: 'https://picsum.photos/id/3/60',
			cover: '/images/background/offers.jpg',
		},
		{
			id: 3,
			title: 'pages.ourStaff',
			to: 'our-staff',
			img: '/images/background/our-staff.jpg',
			lazyImg: 'https://picsum.photos/id/4/60',
			cover: '/images/background/our-staff.jpg',
		},
		{
			id: 4,
			title: 'pages.portfolio',
			to: 'portfolio',
			img: '/images/background/portfolio.jpg',
			lazyImg: 'https://picsum.photos/id/5/60',
			cover: '/images/background/portfolio.jpg',
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

	get visibilityLoader() {
		return this.state.visibilityLoader;
	}

  get isAuth() {
    return this.state.auth.loggedIn;
	}

	get getContactBarVisibility() {
		return this.state.showContactBar;
	}

	get getPageCover() {
		const currentPage = this.state.pages.find(({ id }: PageModel) => id === this.state.pageId);
		return currentPage ? currentPage.cover : null;
	}

	get getPageStage() {
		return this.state.pages;
	}

	get getPageId() {
		return this.state.pageId;
	}

	get getPageRouteById() {
		return (index: number) => {
			const changedIndex = index > 4 ? 1 : index < 1 ? 4 : index;
			const currentPage = this.state.pages.find(
				({ id }: PageModel) => id === changedIndex,
			);
			return currentPage ? currentPage.to : '';
		};
	}
	get getContactStage() {
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
