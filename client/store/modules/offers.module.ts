import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';


interface ReperesentationModel {
	readonly title: string,
	readonly text: string,
	readonly img: string,
	readonly positionCard: 'start' | 'end',
}

interface OffersLocaleModel {
	readonly previewTitle: string;
	readonly previewSubtitle: string;
	readonly previewDescription: string;
	readonly representation: ReperesentationModel[];
}

export interface OffersStateModel {
	ua: OffersLocaleModel,
	ru: OffersLocaleModel,
	en: OffersLocaleModel,
}

class OffersState {
	ua = {
		previewTitle: 'Ви знаєте, що ми можемо?',
		previewSubtitle: 'Що ми робимо? Що ми підтримуємо?',
		previewDescription: 'Наші можливості обмежені лише нашою уявою.',
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
				title:
					'Створення програмного забезпечення для вирішення реально існюючих завдань',
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
	};
	ru = {
		previewTitle: 'Ты знаешь что мы можем?',
		previewSubtitle: 'Что мы делаем? Что мы поддерживаем?',
		previewDescription:
			'Наши возможности ограничены только нашим воображением.',
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
	};
	en = {
		previewTitle: 'Do you know what we can?',
		previewSubtitle: 'What we do? What we support?',
		previewDescription:
			'Our possibilities are limited only by our imagination.',
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
	};
}

class OffersGetters extends Getters<OffersStateModel> {}
class OffersMutations extends Mutations<OffersStateModel> {}

export class OffersActions extends Actions<
	OffersStateModel,
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
