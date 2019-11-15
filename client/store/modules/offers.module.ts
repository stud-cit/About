import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

interface ReperesentationModel {
	readonly cardTitle: string;
	readonly cardContent: string;
	readonly img: string;
	readonly contentPosition: 'start' | 'end';
}

interface OffersLocaleModel {
	readonly offers: ReperesentationModel[];
}

class OffersState {
	ua: OffersLocaleModel = {
		offers: [
			{
				cardTitle: 'Розробка веб-сайту для різних цілей',
				cardContent: `Не кожен, хто замислювався про створення власного ресурсу в мережі, до кінця
					розуміє, навіщо це потрібно. Саме визначення цілей майбутнього проекту, визначає
					подальший розвиток та популяризацію.`,
				img: '/images/weOffer/one.jpg',
				contentPosition: 'start',
			},
			{
				cardTitle:
					'Створення програмного забезпечення для вирішення реально існюючих завдань',
				cardContent: `Розроблене програмне забезпечення - інструмент для вирішення необхідних завдань.
					Наприклад, за допомогою веб-додатків, нараховується заробітна плата, ведеться контроль
					часу роботи, як кожного співробітника, так і частини компанії, виконується перевірка
					роботи установи.`,
				img: '/images/weOffer/two.jpg',
				contentPosition: 'end',
			},
			{
				cardTitle: 'Проєктування інформаційних систем різної складності',
				cardContent: `Web-розробка починається з визначення причин і цілей.
					Ці дві складові напряму впливають на складність виконання.`,
				img: '/images/weOffer/three.jpg',
				contentPosition: 'start',
			},
		],
	};
	ru: OffersLocaleModel = {
		offers: [
			{
				cardTitle: 'Разработка веб-сайта для различных целей',
				cardContent: `Не каждый, кто задумывался о создании собственного ресурса в сети, до конца понимает,
					зачем это нужно. А ведь определение целей будущего проекта, определяет дальнейшее
					продвижение и популяризацию.`,
				img: '/images/weOffer/one.jpg',
				contentPosition: 'start',
			},
			{
				cardTitle: 'Создание програмного обеспечения для реальных задач',
				cardContent: `Разработанное программное обеспечение - инструмент для решения необходимых задач.
					Например, при помощи веб-приложений, начисляется заработная плата, ведется
					контроль времени работы, как каждого сотрудника, так и части компании,
					выполняется проверка работы учреждения.`,
				img: '/images/weOffer/two.jpg',
				contentPosition: 'end',
			},
			{
				cardTitle: 'Проектирование информационных систем различной сложности',
				cardContent: `Web-разработка начинается с определения целей. В зависмости
					от поставленой цели нами будет выбрана наиболее походящая платформа
					и функционал. Эти две составляющие напрямую влияют на сложность выполнения.`,
				img: '/images/weOffer/three.jpg',
				contentPosition: 'start',
			},
		],
	};
	en: OffersLocaleModel = {
		offers: [
			{
				cardTitle: 'Website development for different purposes',
				cardContent: `Not everyone who has thought about creating their own resource on
					the network fully understands why it is necessary. It\`s the definition
					of the goals of the future project that determines the further development
					and promotion.`,
				img: '/images/weOffer/one.jpg',
				contentPosition: 'start',
			},
			{
				cardTitle: 'Creating software to solve tasks',
				cardContent: `The developed software is a tool for solving the necessary tasks.
					For example, with the help of web applications wages are calculated, work
					time is monitored both for each employee and for part of the company,
					the work of the institution is checked. `,
				img: '/images/weOffer/two.jpg',
				contentPosition: 'end',
			},
			{
				cardTitle: 'Design of information systems of various complexity',
				cardContent: `Web development begins by identifying the causes and goals. Depending
				from the goal we will choose the most suitable platform
				and functional. These two components directly affect the complexity of execution.`,
				img: '/images/weOffer/three.jpg',
				contentPosition: 'start',
			},
		],
	};
}

class OffersGetters extends Getters<OffersState> {
	get getStage(): OffersState {
		return this.state;
	}
}
class OffersMutations extends Mutations<OffersState> {}

export class OffersActions extends Actions<
	OffersState,
	OffersGetters,
	OffersMutations
> {
	private store!: Store<NuxtAxiosInstance>;

	$init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
	}
}

export const OffersModule = new Module({
	state: OffersState,
	getters: OffersGetters,
	mutations: OffersMutations,
	actions: OffersActions,
});
