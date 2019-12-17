import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';

interface StaffModel {
	id: number;
	name: string;
	position: string;
	stack: string;
	img: string;
}

interface OurStaffLocaleModel {
	readonly staff: StaffModel[];
}

class OurStaffState {
	ua: OurStaffLocaleModel = {
		staff: [
			{
				id: 1,
				name: 'Андрiй Горiшняк',
				position: 'Project manager',
				stack: 'Aglie, SCRUM, Lean',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 2,
				name: 'Евгенiй Бабiй',
				position: 'Designer',
				stack: 'Фахівець з UX/UI',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 3,
				name: 'Артем Кондратенко',
				position: 'Fronend developer',
				stack: 'Фахівець з Vue, React',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 4,
				name: 'Павло Тiтов',
				position: 'Frontend developer',
				stack: 'Фахівець з React, Vue, typescript',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 5,
				name: 'Марiя Валенкевич',
				position: 'Backend developer',
				stack: 'Фахівець з Laravel, NodeJs',
				img: '/images/ourStaff/staff-2.jpg',
			},
		],
	};
	ru: OurStaffLocaleModel = {
		staff: [
			{
				id: 1,
				name: 'Андрей Горишняк',
				position: 'Project manager',
				stack: 'Aglie, SCRUM, Lean',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 2,
				name: 'Евгений Бабий',
				position: 'Designer',
				stack: 'Специалист по UX/UI',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 3,
				name: 'Артем Кондратенко',
				position: 'Fronend developer',
				stack: 'Специалист по Vue, React',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 4,
				name: 'Павел Титов',
				position: 'Frontend developer',
				stack: 'Специалист по React, Vue, typescript',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 5,
				name: 'Мария Валенкевич',
				position: 'Backend developer',
				stack: 'Специалист по Laravel, NodeJs',
				img: '/images/ourStaff/staff-2.jpg',
			},
		],
	};
	en: OurStaffLocaleModel = {
		staff: [
			{
				id: 1,
				name: 'Andrey Gorishnyak',
				position: 'Project manager',
				stack: 'Aglie, SCRUM, Lean',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 2,
				name: 'Evgen Babiy',
				position: 'Designer',
				stack: 'Proficient in UX/UI',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 3,
				name: 'Artem Kondatenko',
				position: 'Fronend developer',
				stack: 'Proficient in Vue, React',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 4,
				name: 'Pavlo Tytov',
				position: 'Frontend developer',
				stack: 'Proficient in React, Vue, typescript',
				img: '/images/ourStaff/staff-1.jpg',
			},
			{
				id: 5,
				name: 'Maria Valenkevich',
				position: 'Backend developer',
				stack: 'Proficient in Laravel, NodeJs',
				img: '/images/ourStaff/staff-2.jpg',
			},
		],
	};
}

class OurStaffGetters extends Getters<OurStaffState> {
	get getStage(): OurStaffState {
		return this.state;
	}
}
class OurStaffMutations extends Mutations<OurStaffState> {}

export class OurStaffActions extends Actions<
	OurStaffState,
	OurStaffGetters,
	OurStaffMutations
> {
	protected store!: Store<NuxtAxiosInstance>;

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
