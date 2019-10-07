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
			title: 'pages.about',
			to: 'about',
			img: '/images/background/about.png',
			lazyImg: 'https://picsum.photos/id/1/60',
			cover: '/images/background/about.png',
		},
		{
			id: 2,
			title: 'pages.weOffers',
			to: 'offers',
			img: '/images/background/offers.png',
			lazyImg: 'https://picsum.photos/id/3/60',
			cover: '/images/background/offers.png',
		},
		{
			id: 3,
			title: 'pages.ourStaff',
			to: 'our-staff',
			img: '/images/background/our-staff.png',
			lazyImg: 'https://picsum.photos/id/4/60',
			cover: '/images/background/our-staff.png',
		},
		{
			id: 4,
			title: 'pages.portfolio',
			to: 'portfolio',
			img: '/images/background/portfolio.png',
			lazyImg: 'https://picsum.photos/id/5/60',
			cover: '/images/background/portfolio.png',
		},
	],
	about: {
		ua: {
			previewTitle: 'common.companyName',
			previewSubtitle: '',
			previewDescription: 'Мы можемо зробити цей світ краще.',
			slides: [
				`СтудЦІТ - це команда з талановитих фахівців, для яких виготовлення сайтів не робота,
				а частина життя. Можливість постійно вдосконалюватися, вирішувати нетривіальні
				завдання та використовувати здібності на благо клієнта. Спеціалізуємося на розробці
				інтернет ресурсів варіативного призначення й складності. Також здатні вирішувати
				нестандартні завдання, в рамках індивідуальних проектів.`,
				`Детально вивчимо кожен випадок, спроектуємо модель рішення, створимо відповідний
				дизайн і функціональний прототип, реалізуємо замовлення і закінчимо проект презентацією
				готового продукту. Незвичайний та свіжий підхід до поставленого завдання, гнучка і
				широка спеціалізація, якісна реалізація - характерні риси СтудЦІТ.`,
			],
		},
		ru: {
			previewTitle: 'common.companyName',
			previewSubtitle: '',
			previewDescription: 'Мы можем сделать этот мир лучше.',
			slides: [
				`СтудЦИТ – это команда из талантливых специалистов, для которых изготовление сайтов не работа,
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
		en: {
			previewTitle: 'common.companyName',
			previewSubtitle: '',
			previewDescription: 'We can make this world better.',
			slides: [
				`Student Center of Information Technologies (StudCIT) is a team of talented
				professionals for whom website design is not a job but a part of life. There
				is an opportunity to constantly improve, solve non-trivial tasks and use abilities
				for the benefit of the client. We specialize in the development of internet resources
				of different purpose and complexity. We are also capable of solving non-standard tasks
				within individual projects.`,
				`Let us study each case in detail, design a model of the solution, create the
				appropriate design and a functional prototype, implement the order and finish the
				project with the presentation of the finished product. An unusual and new approach
				to the task, flexible and broad specialization, quality implementation are the
				features of the StudCIT.`,
			],
		},
	},
	weOffers: {
		ua: {
			previewTitle: 'Ви знаєте, що ми можемо?',
			previewSubtitle: 'Що ми робимо? Які проєкти ми підтримуємо?',
			previewDescription: 'Наші можливості.',
			representation: [
				{
					title: 'Розробка веб-сайту для різних цілей',
					text: `Не кожен, хто замислювався про створення власного ресурсу в мережі, до кінця
						розуміє, навіщо це потрібно. Саме визначення цілей майбутнього проекту, визначає
						подальший розвиток та популяризацію.`,
					img: '/images/weOffer/one.jpg',
					positionCard: 'start',
				},
				{
					title: 'Створення програмного забезпечення для вирішення реально існюючих завдань',
					text: `Розроблене програмне забезпечення - інструмент для вирішення необхідних завдань.
						Наприклад, за допомогою веб-додатків, нараховується заробітна плата, ведеться контроль
						часу роботи, як кожного співробітника, так і частини компанії, виконується перевірка
						роботи установи.`,
					img: '/images/weOffer/two.jpg',
					positionCard: 'end',
				},
				{
					title: 'Проєктування інформаційних систем різної складності',
					text: `Web-розробка починається з визначення причин і цілей.
						Ці дві складові напряму впливають на складність виконання.`,
					img: '/images/weOffer/three.jpg',
					positionCard: 'end',
				},
			],
		},
		ru: {
			previewTitle: 'Ты знаешь что мы можем?',
			previewSubtitle: 'Что мы делаем? Какие проэкты мы поддерживаем?',
			previewDescription: 'Наши возможности ограничены только нашим воображением.',
			representation: [
				{
					title: 'Разработка веб-сайта для различных целей',
					text: `Не каждый, кто задумывался о создании собственного ресурса в сети, до конца понимает,
						зачем это нужно. А ведь определение целей будущего проекта, определяет дальнейшее
						продвижение и популяризацию.`,
					img: '/images/weOffer/one.jpg',
					positionCard: 'start',
				},
				{
					title: 'Создание програмного обеспечения для реальных задач',
					text: `Разработанное программное обеспечение - инструмент для решения необходимых задач.
						Например, при помощи веб-приложений, начисляется заработная плата, ведется
						контроль времени работы, как каждого сотрудника, так и части компании,
						выполняется проверка работы учреждения.`,
					img: '/images/weOffer/two.jpg',
					positionCard: 'end',
				},
				{
					title: 'Проектирование информационных систем различной сложности',
					text: `Web-разработка начинается с определения целей. В зависмости
						от поставленой цели нами будет выбрана наиболее походящая платформа
						и функционал. Эти две составляющие напрямую влияют на сложность выполнения.`,
					img: '/images/weOffer/three.jpg',
					positionCard: 'end',
				},
			],
		},
		en: {
			previewTitle: 'Do you know what we can?',
			previewSubtitle: 'What we do? What we support?',
			previewDescription: 'Our possibilities are limited only by our imagination.',
			representation: [
				{
					title: 'Website development for different purposes',
					text: `Not everyone who has thought about creating their own resource on
					 the network fully understands why it is necessary. It\`s the definition
						of the goals of the future project that determines the further development
						and promotion.`,
					img: '/images/weOffer/one.jpg',
					positionCard: 'start',
				},
				{
					title: 'Creating software to solve tasks',
					text: `The developed software is a tool for solving the necessary tasks.
						For example, with the help of web applications wages are calculated, work
						time is monitored both for each employee and for part of the company,
						the work of the institution is checked. `,
					img: '/images/weOffer/two.jpg',
					positionCard: 'end',
				},
				{
					title: 'Design of information systems of various complexity',
					text: `Web development begins by identifying the causes and goals. Depending
					from the goal we will choose the most suitable platform
					and functional. These two components directly affect the complexity of execution.`,
					img: '/images/weOffer/three.jpg',
					positionCard: 'end',
				},
			],
		},
	},
	ourStaff: {
		ua: {
			previewTitle: 'У нас багато людей, які можуть легко реалізувати все те, що ви хочете.',
			previewSubtitle: '',
			previewDescription: 'Разом ми можемо більше, ніж кожен окремо.',
			representation: [
				{
					id: 1,
					name: 'Андрiй Горiшняк',
					position: 'Project manager',
					stack: 'Aglie, SCRUM, Lean',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 2,
					name: 'Евгенiй Бабiй',
					position: 'Designer',
					stack: 'Фахівець з UX/UI',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 3,
					name: 'Артем Кондратенко',
					position: 'Fronend developer',
					stack: 'Фахівець з Vue, React',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 4,
					name: 'Павло Тiтов',
					position: 'Frontend developer',
					stack: 'Фахівець з React, Vue, typescript',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 5,
					name: 'Iван Захарченко',
					position: 'Backend developer',
					stack: 'Фахівець з Laravel, NodeJs',
					img_src: '/images/ourStaff/team.jpg',
				},
			],
		},
		ru: {
			previewTitle: 'У нас много людей, которые могут легко реализовать все то, что вы хотите.',
			previewSubtitle: '',
			previewDescription: 'Вместе мы можем больше, чем в одиночку.',
			representation: [
				{
					id: 1,
					name: 'Андрей Горишняк',
					position: 'Project manager',
					stack: 'Aglie, SCRUM, Lean',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 2,
					name: 'Евгений Бабий',
					position: 'Designer',
					stack: 'Специалист по UX/UI',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 3,
					name: 'Артем Кондратенко',
					position: 'Fronend developer',
					stack: 'Специалист по Vue, React',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 4,
					name: 'Павел Титов',
					position: 'Frontend developer',
					stack: 'Специалист по React, Vue, typescript',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 5,
					name: 'Iван Захарченко',
					position: 'Backend developer',
					stack: 'Специалист по Laravel, NodeJs',
					img_src: '/images/ourStaff/team.jpg',
				},
			],
		},
		en: {
			previewTitle: 'We have many people who can easily realize all things which you wish.',
			previewSubtitle: '',
			previewDescription: 'Together we can more than one by one.',
			representation: [
				{
					id: 1,
					name: 'Andrey Gorishnyak',
					position: 'Project manager',
					stack: 'Aglie, SCRUM, Lean',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 2,
					name: 'Evgen Babiy',
					position: 'Designer',
					stack: 'Proficient in UX/UI',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 3,
					name: 'Artem Kondatenko',
					position: 'Fronend developer',
					stack: 'Proficient in Vue, React',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 4,
					name: 'Pablito Tytov :)',
					position: 'Frontend developer',
					stack: 'Proficient in React, Vue, typescript',
					img_src: '/images/ourStaff/team.jpg',
				},
				{
					id: 5,
					name: 'Ivan Zacharchenko',
					position: 'Backend developer',
					stack: 'Proficient in Laravel, NodeJs',
					img_src: '/images/ourStaff/team.jpg',
				},
			],
		},
	},
	portfolio: {
		ua: {
			previewTitle: 'Ти знаєш, що ми можемо?',
			previewSubtitle: 'Якi проєкти ми зробили?',
			previewDescription: 'Наші проекти - одні з найкращих',
			projects: [
				{
					title: 'Сайт кафедри соціальної роботи СумДУ',
					cover: '/images/portfolio/SOC.png',
					link: 'http://soc.sumdu.edu.ua/',
				},
				{
					title: 'Платформа пошуку роботи та стажування СумДУ',
					cover: '/images/portfolio/JOB.png',
					link: 'http://job-test.sumdu.edu.ua/',
				},
				{
					title: 'Онлайн сервiс для оцiнки якості навчального процесу в СумДУ',
					cover: '/images/portfolio/AC.png',
					link: 'http://ac.sumdu.edu.ua/',
				},
			],
		},
		ru: {
			previewTitle: 'Ты знаешь, что мы можем?',
			previewSubtitle: 'Какие проекты мы сделали?',
			previewDescription: 'Наши проекты - одни из лучших',
			projects: [
				{
					title: 'Сайт кафедры социальной работы СумГУ',
					cover: '/images/portfolio/SOC.png',
					link: 'http://soc.sumdu.edu.ua/',
				},
				{
					title: 'Платформа поиска работы и стажировки СумГУ',
					cover: '/images/portfolio/JOB.png',
					link: 'http://job-test.sumdu.edu.ua/',
				},
				{
					title: 'Онлайн сервис для оценки качества учебного процесса в СумГУ',
					cover: '/images/portfolio/AC.png',
					link: 'http://ac.sumdu.edu.ua/',
				},
			],
		},
		en: {
			previewTitle: 'Do you know what we can?',
			previewSubtitle: 'What projects have we done?',
			previewDescription: 'Our projects is one of the best',
			projects: [
				{
					title: 'Department of Social Work of SSU',
					cover: '/images/portfolio/SOC.png',
					link: 'http://soc.sumdu.edu.ua/',
				},
				{
					title: 'Practice and internship search platform of SSU',
					cover: '/images/portfolio/JOB.png',
					link: 'http://job-test.sumdu.edu.ua/',
				},
				{
					title: 'Online assessment of the quality of the educational process at SSU',
					cover: '/images/portfolio/AC.png',
					link: 'http://ac.sumdu.edu.ua/',
				},
			],
		},
	},
	showContactBar: false,
	contacts: {
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
