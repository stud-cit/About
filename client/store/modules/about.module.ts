import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';

interface AboutLocaleModel {
	readonly previewDescription: string;
	readonly backToStart: string;
	readonly scrollPointNavigation: string;
	readonly slides: string[];
}

class AboutState {
	ua: AboutLocaleModel = {
		previewDescription: 'Ми можемо зробити цей світ краще.',
		backToStart: 'На початок',
		scrollPointNavigation:
			'Використовуйте контрольні точки для переміщення по сторінці',
		slides: [
			`СтудЦІТ - це команда з талановитих фахівців, для яких виготовлення сайтів не робота,
			а частина життя. Можливість постійно вдосконалюватися, вирішувати нетривіальні
			завдання та використовувати здібності на благо клієнта. Спеціалізуємося на розробці
			інтернет ресурсів варіативного призначення й складності. Також здатні вирішувати
			нестандартні завдання.`,
			`Детально вивчимо кожен випадок, спроектуємо модель рішення, створимо відповідний
			дизайн і функціональний прототип, реалізуємо замовлення і закінчимо проект презентацією
			готового продукту. Незвичайний та свіжий підхід до поставленого завдання, гнучка і
			широка спеціалізація, якісна реалізація - характерні риси СтудЦІТ.`,
		],
	};
	ru: AboutLocaleModel = {
		previewDescription: 'Мы можем сделать этот мир лучше.',
		backToStart: 'В начало',
		scrollPointNavigation:
			'Используйте контрольные точки для навигации по страничке',
		slides: [
			`СтудЦИТ – это команда из талантливых специалистов, для которых изготовление сайтов не работа,
			а часть жизни. Возможность постоянно совершенствоваться,
			решать нетривиальные задачи и использовать способности на благо клиента.
			Специализируемся на разработке интернет ресурсов вариативного предназначения
			и сложности. Также способны решать нестандартные задачи.`,
			`Детально изучим каждый случай, спроектируем модель решения,
			создадим подходящий дизайн и функциональный прототип, реализуем заказ и
			закончим проект презентацией готового продукта. Необычный и свежий подход
			к поставленной задаче, гибкая и широкая специализация, качественная
			реализация - характерные черты Студцит.`,
		],
	};
	en: AboutLocaleModel = {
		previewDescription: 'We can make this world better.',
		backToStart: 'Back to start',
		scrollPointNavigation: 'Use scroll point for page navigation',
		slides: [
			`Student Center of Information Technologies (StudCIT) is a team of talented
			professionals for whom website design is not a job but a part of life. There
			is an opportunity to constantly improve, solve non-trivial tasks and use abilities
			for the benefit of the client. We specialize in the development of internet resources
			of different purpose and complexity. We are also capable of solving non-standard tasks.`,
			`Let us study each case in detail, design a model of the solution, create the
			appropriate design and a functional prototype, implement the order and finish the
			project with the presentation of the finished product. An unusual and new approach
			to the task, flexible and broad specialization, quality implementation are the
			features of the StudCIT.`,
		],
	};
}

class AboutGetters extends Getters<AboutState> {
	get getStage(): AboutState {
		return this.state;
	}
}
class AboutMutations extends Mutations<AboutState> {}

export class AboutActions extends Actions<
	AboutState,
	AboutGetters,
	AboutMutations
> {
	protected store!: Store<NuxtAxiosInstance>;

	$init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
	}
}

export const AboutModule = new Module({
	state: AboutState,
	getters: AboutGetters,
	mutations: AboutMutations,
	actions: AboutActions,
});
