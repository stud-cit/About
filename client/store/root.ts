import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
	[x: string]: any;
}

interface PageModel {
	id: number;
	title: string;
	to: string;
	img: string;
	lazyImg: string;
}

export const state = (): State => ({

	isShowLoader: true,
	pageId: 0,
	pages: [
		{
			id: 1,
			title: 'About Us',
			to: 'about',
			img: '/images/background/about.png',
			lazyImg: 'https://picsum.photos/id/1/60',
			cover: '/images/background/about.png',
		},
		{
			id: 2,
			title: 'We Offers',
			to: 'offers',
			img: '/images/background/offers.png',
			lazyImg: 'https://picsum.photos/id/3/60',
			cover: '/images/background/offers.png',
		},
		{
			id: 3,
			title: 'Our Staff',
			to: 'our-staff',
			img: '/images/background/our-staff.png',
			lazyImg: 'https://picsum.photos/id/4/60',
			cover: '/images/background/our-staff.png',
		},
		{
			id: 4,
			title: 'Portfolio',
			to: 'portfolio',
			img: '/images/background/portfolio.png',
			lazyImg: 'https://picsum.photos/id/5/60',
			cover: '/images/background/portfolio.png',
		},
	],
	about: {
		previewTitle: 'Student centr of information technology',
		previewSubtitle: '',
		previewDescription: 'We can make this world better.',
		slides: [
			`StudCIT – это команда из талантливых специалистов, для которых изготовление сайтов не работа,
					а часть жизни. Возможность постоянно совершенствоваться,
					решать нетривиальные задачи и использовать способности на благо клиента.
					Специализируемся на разработке интернет ресурсов вариативного предназначения
					и сложности. Также способны решать нестандартные задачи, в рамках индивидуальных проектов.`,

			`Детально изучим каждый случай, спроектируем модель решения,
					создадим подходящий дизайн и функциональный прототип, реализуем заказ и
					закончим проект презентацией готового продукта. Необычный и свежий подход
					к поставленной задаче, гибкая и широкая специализация, качественная
					реализация - характерные черты Студцит.`,
		],
	},
	weOffers: {
		previewTitle: 'Do you know what we can?',
		previewSubtitle: 'What we do? What we support?',
		previewDescription:
			'Our possibilities are limited only by our imagination.',
		representation: [
			{
				title: 'Разработка веб-сайта для различных целей',
				text: `Не каждый, кто задумывался о создании собственного ресурса в сети, до конца понимает,
					зачем это нужно. А ведь определение целей будущего проекта, определяет дальнейшее
					продвижение и популяризацию.`,
				img: '/images/weOffer/one.jpg',
			},
			{
				title: 'Создание програмного обеспечения для реальных задач',
				text: `Разработанное программное обеспечение - инструмент для решения необходимых задач.
					Например, при помощи веб-приложений, начисляется заработная плата, ведется
					контроль времени работы, как каждого сотрудника, так и части компании,
					выполняется проверка работы учреждения.`,
				img: '/images/weOffer/two.jpg',
			},
			{
				title: 'Проектирование информационных систем различной сложности',
				text: `Web-разработка начинается с определения целей. В зависмости
					 от поставленой цели нами будет выбрана наиболее походящая платформа
					 и функционал. Эти две составляющие напрямую влияют на сложность выполнения.`,
				img: '/images/weOffer/three.jpg',
			},
		],
	},
	ourStaff: {
		previewTitle:
			'Many people who can easily realize all things which you wish.',
		previewSubtitle: '',
		previewDescription: 'Together we can more than one by one.',
		representation: [
			{
				id: 1,
				name: 'Kirk Philips',
				position: 'Frontend developer',
				stack: 'Proficient in HTML + CSS, JS',
				img_src: '/images/ourStaff/team.jpg',
			},
			{
				id: 2,
				name: 'Kirk Philips2',
				position: 'Designer',
				stack: 'Proficient in HTML + CSS, JS',
				img_src: '/images/ourStaff/team.jpg',
			},
			{
				id: 3,
				name: 'Kirk Philip3',
				position: 'Designer',
				stack: 'Proficient in HTML + CSS, JS',
				img_src: '/images/ourStaff/team.jpg',
			},
			{
				id: 4,
				name: 'Kirk Philips4',
				position: 'Designer',
				stack: 'Proficient in HTML + CSS, JS',
				img_src: '/images/ourStaff/team.jpg',
			},
			{
				id: 5,
				name: 'Kirk Philips5',
				position: 'Designer',
				stack: 'Proficient in HTML + CSS, JS',
				img_src: '/images/ourStaff/team.jpg',
			},
		],
	},
	portfolio: {
		previewTitle: 'Do you know what we can?',
		previewSubtitle: 'What we have made?',
		previewDescription: 'Our projects is one of the best',
		projects: [
			{
				title: 'Department of Social Work of Sumy State University',
				cover: '/images/portfolio/SOC.png',
				link: 'http://soc.sumdu.edu.ua/',
			},
			{
				title:
					'Practice and internship search platform of Sumy State University',
				cover: '/images/portfolio/JOB.png',
				link: 'http://job-test.sumdu.edu.ua/',
			},
			{
				title:
					'Online assessment of the quality of the educational process at Sumy State University',
				cover: '/images/portfolio/AC.png',
				link: 'http://ac.sumdu.edu.ua/',
			},
		],
	},
	showContactBar: false,
	contacts: {
		motto: 'Speed, quality, simplicity',
		email: 'STUDCITMAIL@GMAIL.COM',
		phone: '+380 98 43 70 202',
		street: 'Ukraine, Sumy, st. Rimsky-Korsakov, 2',
		office: 'Sumy State University, Electrotechnical Corps, cab. ET-504',
	},
});

export const getters: GetterTree<RootState, RootState> = {
	getContactBarVisibility({ showContactBar }: State) {
		return showContactBar;
	},
	getPageCover({ pages, pageId }: State) {
		const currentPage = pages.find(({ id }: PageModel) => id === pageId);
		return currentPage ? currentPage.cover : null;
	},
	getPageStage({ pages }: State) {
		return pages;
	},
	getPageId({ pageId }: State) {
		return pageId;
	},
	getPageRouteById({ pages }: State) {
		return (index: number) => {
			const changedIndex = index > 4 ? 1 : index < 1 ? 4 : index;
			const currentPage = pages.find(
				({ id }: PageModel) => id === changedIndex,
			);
			return currentPage ? currentPage.to : '';
		};
	},
	getProjectsStage({ portfolio }: State) {
		return portfolio.projects;
	},
	getAboutStage({ about }: State) {
		return about;
	},
	getOffersStage({ weOffers }: State) {
		return weOffers;
	},
	getStaffStage({ ourStaff }: State) {
		return ourStaff;
	},
	getPortfolioStage({ portfolio }: State) {
		return portfolio;
	},
	getContactStage({ contacts }: State) {
		return contacts;
	},
};

export const actions: ActionTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
	hideLoader(state: RootState): void {
		state.isShowLoader = false;
	},
	changePageId(state: RootState, pageId: number): void {
		state.pageId = pageId;
	},
	changeContactBar(state: RootState, visibility: boolean): void {
		state.showContactBar = visibility;
	},
};
