import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { createStore } from 'vuex-smart-module';

import { AboutModule } from './modules/about.module';
import { OffersModule } from './modules/offers.module';
import { OurStaffModule } from './modules/ourStaff.module';
import { PortfolioModule } from './modules/portfolio.module';

// image using for showing img during video loading
interface CoverModel {
	readonly image: string;
	readonly video: string;
}
interface PageModel {
	readonly id: string;
	readonly name: string;
	readonly title: string;
	readonly description: string;
	readonly link: string;
	readonly cover: CoverModel;
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

const mockedPages: Record<string, PageModel[]> = {
	ua: [{
			id: '1wscz',
			title: 'About Us',
			description: 'We can make this world better',
			name: '',
			link: 'about',
			cover: {
				image: '/about.jpg',
				video: '/about-us-pc.mp4',
			},
		},
		{
			id: '2sfpdsokf',
			title: 'We Offers',
			description:
			'Our possibilities are limited only by our imagination.',
			name: 'Do you know what we can? <br /> What we do? What we support?',
			link: 'offers',
			cover: {
				image: '/offers.jpg',
				video: '/we-offer-pc.mp4',
			},
		},
		{
			id: '3x[vppor',
			title:
			'Our Staff',
			description: 'Together we can more than one by one.',
			name: 'Many people who can easily realize all things which you wish.',
			link: 'our-staff',
			cover: {
				image: '/our-staff.jpg',
				video: '/staff-pc.mp4',
			},
		},
		{
			id: '4srcl-fdspkf',
			title: 'Portfolio',
			description: 'The fruits of our humble activity.',
			name: 'Our implemented incredible <br/> projects which we are proud of.',
			link: 'portfolio',
			cover: {
				image: '/portfolio.jpg',
				video: '/portfolio-pc.mp4',
			},
		}],
	ru: [{
		id: '1wscz',
		title: 'About Us',
		description: 'We can make this world better',
		name: '',
		link: 'about',
		cover: {
			image: '/about.jpg',
			video: '/about-us-pc.mp4',
		},
	},
	{
		id: '2sfpdsokf',
		title: 'We Offers',
		description:
		'Our possibilities are limited only by our imagination.',
		name: 'Do you know what we can? <br /> What we do? What we support?',
		link: 'offers',
		cover: {
			image: '/offers.jpg',
			video: '/we-offer-pc.mp4',
		},
	},
	{
		id: '3x[vppor',
		title:
		'Our Staff',
		description: 'Together we can more than one by one.',
		name: 'Many people who can easily realize all things which you wish.',
		link: 'our-staff',
		cover: {
			image: '/our-staff.jpg',
			video: '/staff-pc.mp4',
		},
	},
	{
		id: '4srcl-fdspkf',
		title: 'Portfolio',
		description: 'The fruits of our humble activity.',
		name: 'Our implemented incredible <br/> projects which we are proud of.',
		link: 'portfolio',
		cover: {
			image: '/portfolio.jpg',
			video: '/portfolio-pc.mp4',
		},
	}],
	en: [{
		id: '1wscz',
		title: 'About Us',
		description: 'We can make this world better',
		name: '',
		link: 'about',
		cover: {
			image: '/about.jpg',
			video: '/about-us-pc.mp4',
		},
	},
	{
		id: '2sfpdsokf',
		title: 'We Offers',
		description:
		'Our possibilities are limited only by our imagination.',
		name: 'Do you know what we can? <br /> What we do? What we support?',
		link: 'offers',
		cover: {
			image: '/offers.jpg',
			video: '/we-offer-pc.mp4',
		},
	},
	{
		id: '3x[vppor',
		title:
		'Our Staff',
		description: 'Together we can more than one by one.',
		name: 'Many people who can easily realize all things which you wish.',
		link: 'our-staff',
		cover: {
			image: '/our-staff.jpg',
			video: '/staff-pc.mp4',
		},
	},
	{
		id: '4srcl-fdspkf',
		title: 'Portfolio',
		description: 'The fruits of our humble activity.',
		name: 'Our implemented incredible <br/> projects which we are proud of.',
		link: 'portfolio',
		cover: {
			image: '/portfolio.jpg',
			video: '/portfolio-pc.mp4',
		},
	}],
};

class RootState {
	auth!: any;
	error!: any;
	visibilityLoader: boolean = true;
	showContactBar: boolean = false;
	showScrollBar: boolean = false;
	isHideAnimationContent: boolean = false;
	pageId = '';
	pages: PageModel[] = [];
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

	get getIsHideAnimationContent(): boolean {
		return this.state.isHideAnimationContent;
	}

	get getPageCover(): CoverModel | {} {
		return (locale: string) => {
			const currentPage = this.state.pages[locale].find(
				({ id }: PageModel) => id === this.state.pageId,
			);
			return currentPage ? currentPage.cover : {};
		};
	}

	get getPageStage(): (locale: string) => PageModel[] {
		return (locale: string) => this.state.pages[locale];
	}

	get getPageIndex(): (locale: string) => number {
		return (locale: string) => {
			const matchingIndex = this.state.pages[locale].findIndex(
				(page: PageModel) => page.id === this.state.pageId,
			);
			return matchingIndex + 1;
		};
	}

	get getPageById(): (locale: string) => PageModel {
		return (locale: string) =>
			this.state.pages[locale].find(
				(page: PageModel) => page.id === this.state.pageId,
			);

	}

	get getPageId(): string {
		return this.state.pageId;
	}

	get getPageRouteByIndex(): (index: number) => string {
		return (index: number) => {
			const changedIndex = index > 4 ? 1 : index < 1 ? 4 : index;
			const currentPage = this.state.pages[changedIndex];
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
	setPages(pages: PageModel[]) {
		return Vue.set(this.state, 'pages', pages);
	}
	hideLoader() {
		return Vue.set(this.state, 'visibilityLoader', false);
	}
	setPageIdByPath({locale, path}: Record<string, string>) {
		const pages = this.state.pages[locale];
		const matchingPage = pages.find((page: PageModel) =>
			path.includes(page.link),
		);

		if (matchingPage) {
			Vue.set(this.state, 'pageId', matchingPage.id);
		}
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

	async nuxtServerInit({
		app: {
			store: { commit },
		},
	}) {
		return await new Promise(res => {
			setTimeout(() => {
				res(commit('setPages', mockedPages));
			}, 300);
		});
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
