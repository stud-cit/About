import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';


interface ProjectModel {
	title: string;
	cover: string;
	link: string;
}

interface PortfolioLocaleModel {
	readonly previewTitle: string;
	readonly previewSubtitle: string;
	readonly previewDescription: string;
	readonly projects: ProjectModel[];
}

export interface PortfolioStateModel {
	ua: PortfolioLocaleModel,
	ru: PortfolioLocaleModel,
	en: PortfolioLocaleModel,
}

class PortfolioState {
	ua = {
		previewTitle: 'Наші проекти,',
		previewSubtitle: 'якими ми пишаємось.',
		previewDescription: 'Плоди нашої діяльності.',
		projects: [
			{
				title: 'Сайт кафедри соціальної роботи СумДУ',
				cover: '/images/portfolio/SOC.jpg',
				link: 'http://soc.sumdu.edu.ua/',
			},
			{
				title: 'Платформа пошуку роботи та стажування СумДУ',
				cover: '/images/portfolio/JOB.jpg',
				link: 'http://job-test.sumdu.edu.ua/',
			},
			{
				title: 'Онлайн сервiс для оцiнки якості навчального процесу в СумДУ',
				cover: '/images/portfolio/AC.jpg',
				link: 'http://ac.sumdu.edu.ua/',
			},
		],
	};
	ru = {
		previewTitle: 'Наши проекты,',
		previewSubtitle: 'которыми мы гордимся.',
		previewDescription: 'Плоды нашей скромной деятельности.',
		projects: [
			{
				title: 'Сайт кафедры социальной работы СумГУ',
				cover: '/images/portfolio/SOC.jpg',
				link: 'http://soc.sumdu.edu.ua/',
			},
			{
				title: 'Платформа поиска работы и стажировки СумГУ',
				cover: '/images/portfolio/JOB.jpg',
				link: 'http://job-test.sumdu.edu.ua/',
			},
			{
				title: 'Онлайн сервис для оценки качества учебного процесса в СумГУ',
				cover: '/images/portfolio/AC.jpg',
				link: 'http://ac.sumdu.edu.ua/',
			},
		],
	};
	en = {
		previewTitle: 'Our projects',
		previewSubtitle: 'which we are proud of.',
		previewDescription: 'The fruits of our humble activity.',
		projects: [
			{
				title: 'Department of Social Work of SSU',
				cover: '/images/portfolio/SOC.jpg',
				link: 'http://soc.sumdu.edu.ua/',
			},
			{
				title: 'Practice and internship search platform of SSU',
				cover: '/images/portfolio/JOB.jpg',
				link: 'http://job-test.sumdu.edu.ua/',
			},
			{
				title:
					'Online assessment of the quality of the educational process at SSU',
				cover: '/images/portfolio/AC.jpg',
				link: 'http://ac.sumdu.edu.ua/',
			},
		],
	};
}

class PortfolioGetters extends Getters<PortfolioStateModel> {}

class PortfolioMutations extends Mutations<PortfolioStateModel> {}

export class PortfolioActions extends Actions<
	PortfolioStateModel,
  PortfolioGetters,
  PortfolioMutations
> {
  private store!: Store<NuxtAxiosInstance>;

  $init(store: Store<NuxtAxiosInstance>): void {
    this.store = store;
  }
}

export const PortfolioModule = new Module({
  state: PortfolioState,
  getters: PortfolioGetters,
  mutations: PortfolioMutations,
  actions: PortfolioActions,
});
