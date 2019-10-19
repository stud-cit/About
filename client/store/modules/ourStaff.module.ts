import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';


interface StaffModel {
	id: number;
	name: string;
	position: string;
	stack: string;
	img_src: string;
}

interface OurStaffLocaleModel {
	readonly previewTitle: string;
	readonly previewSubtitle: string;
	readonly previewDescription: string;
	readonly representation: StaffModel[];
}

export interface OurStaffStateModel {
	ua: OurStaffLocaleModel,
	ru: OurStaffLocaleModel,
	en: OurStaffLocaleModel,
}

class OurStaffState {
  ua = {
		previewTitle:
			'Ті люди, які можуть легко реалізувати все те, що ви хочете.',
		previewSubtitle: '',
		previewDescription: 'Разом ми можемо більше, ніж кожен окремо.',
		representation: [
			{
				id: 1,
				name: 'Андрiй Горiшняк',
				position: 'Project manager',
				stack: 'Aglie, SCRUM, Lean',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 2,
				name: 'Евгенiй Бабiй',
				position: 'Designer',
				stack: 'Фахівець з UX/UI',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 3,
				name: 'Артем Кондратенко',
				position: 'Fronend developer',
				stack: 'Фахівець з Vue, React',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 4,
				name: 'Павло Тiтов',
				position: 'Frontend developer',
				stack: 'Фахівець з React, Vue, typescript',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 5,
				name: 'Марiя Валенкевич',
				position: 'Backend developer',
				stack: 'Фахівець з Laravel, NodeJs',
				img_src: '/images/ourStaff/staff-2.jpg',
			},
		],
	};
	ru = {
		previewTitle:
			'Те люди, которые могут легко реализовать все то, что вы хотите.',
		previewSubtitle: '',
		previewDescription: 'Вместе мы можем больше, чем в одиночку.',
		representation: [
			{
				id: 1,
				name: 'Андрей Горишняк',
				position: 'Project manager',
				stack: 'Aglie, SCRUM, Lean',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 2,
				name: 'Евгений Бабий',
				position: 'Designer',
				stack: 'Специалист по UX/UI',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 3,
				name: 'Артем Кондратенко',
				position: 'Fronend developer',
				stack: 'Специалист по Vue, React',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 4,
				name: 'Павел Титов',
				position: 'Frontend developer',
				stack: 'Специалист по React, Vue, typescript',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 5,
				name: 'Мария Валенкевич',
				position: 'Backend developer',
				stack: 'Специалист по Laravel, NodeJs',
				img_src: '/images/ourStaff/staff-2.jpg',
			},
		],
	};
	en = {
		previewTitle:
			'Many people who can easily realize all things which you wish.',
		previewSubtitle: '',
		previewDescription: 'Together we can more than one by one.',
		representation: [
			{
				id: 1,
				name: 'Andrey Gorishnyak',
				position: 'Project manager',
				stack: 'Aglie, SCRUM, Lean',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 2,
				name: 'Evgen Babiy',
				position: 'Designer',
				stack: 'Proficient in UX/UI',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 3,
				name: 'Artem Kondatenko',
				position: 'Fronend developer',
				stack: 'Proficient in Vue, React',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 4,
				name: 'Pavlo Tytov',
				position: 'Frontend developer',
				stack: 'Proficient in React, Vue, typescript',
				img_src: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 5,
				name: 'Maria Valenkevich',
				position: 'Backend developer',
				stack: 'Proficient in Laravel, NodeJs',
				img_src: '/images/ourStaff/staff-2.jpg',
			},
		],
	};
}

class OurStaffGetters extends Getters<OurStaffStateModel> {}
class OurStaffMutations extends Mutations<OurStaffStateModel> {}

export class OurStaffActions extends Actions<
	OurStaffStateModel,
  OurStaffGetters,
  OurStaffMutations
> {
  private store!: Store<NuxtAxiosInstance>;

  $init(store: Store<NuxtAxiosInstance>): void {
    this.store = store;
  }
}

export const OurStaffModule = new Module({
  state: OurStaffState,
  getters: OurStaffGetters,
  mutations: OurStaffMutations,
  actions: OurStaffActions,
});
