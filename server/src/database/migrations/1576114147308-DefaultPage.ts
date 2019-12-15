import { MigrationInterface, QueryRunner } from 'typeorm';

import { PageEntity } from '../../modules/page/page.entity';

/**
 * @ignore
 */
export class DefaultPage1576114147308 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.connection.getRepository(PageEntity).save(<PageEntity[]>[
			/* About page */
			{
				lang: 'ua',
				title: 'Ми можемо зробити цей світ краще',
				description: '',
				cover: {
					video: '',
					image: '',
				},
				content: [
					{
						lang: 'ua',
						cover: {
							video: '',
							image: '',
						},
						title: '',
						description:
							'СтудЦІТ - це команда з талановитих фахівців, для яких виготовлення сайтів не робота, а частина життя. Можливість постійно вдосконалюватися, вирішувати нетривіальні завдання та використовувати здібності на благо клієнта. Спеціалізуємося на розробці інтернет ресурсів варіативного призначення й складності. Також здатні вирішувати нестандартні завдання, в рамках індивідуальних проектів.',
					},
					{
						lang: 'ua',
						cover: {
							video: '',
							image: '',
						},
						title: '',
						description:
							'Детально вивчимо кожен випадок, спроектуємо модель рішення, створимо відповідний дизайн і функціональний прототип, реалізуємо замовлення і закінчимо проект презентацією готового продукту. Незвичайний та свіжий підхід до поставленого завдання, гнучка і широка спеціалізація, якісна реалізація - характерні риси СтудЦІТ.',
					},
				],
			},
			{
				lang: 'ru',
				cover: {
					video: '',
					image: '',
				},
				title: 'Мы можем сделать этот мир лучше.',
				description: '',
				content: [
					{
						lang: 'ru',
						cover: {
							video: '',
							image: '',
						},
						title: '',
						description:
							'СтудЦИТ – это команда из талантливых специалистов, для которых изготовление сайтов не работа, а часть жизни. Возможность постоянно совершенствоваться, решать нетривиальные задачи и использовать способности на благо клиента. Специализируемся на разработке интернет ресурсов вариативного предназначения и сложности. Также способны решать нестандартные задачи, в рамках индивидуальных проектов.',
					},
					{
						lang: 'ru',
						cover: {
							video: '',
							image: '',
						},
						title: '',
						description:
							'Детально изучим каждый случай, спроектируем модель решения, создадим подходящий дизайн и функциональный прототип, реализуем заказ и закончим проект презентацией готового продукта. Необычный и свежий подход к поставленной задаче, гибкая и широкая специализация, качественная реализация - характерные черты Студцит.',
					},
				],
			},
			{
				lang: 'en',
				cover: {
					video: '',
					image: '',
				},
				title: 'We can make this world better.',
				description: '',
				content: [
					{
						lang: 'en',
						cover: {
							video: '',
							image: '',
						},
						title: '',
						description:
							'Student Center of Information Technologies (StudCIT) is a team of talented professionals for whom website design is not a job but a part of life. There is an opportunity to constantly improve, solve non-trivial tasks and use abilities for the benefit of the client. We specialize in the development of internet resources of different purpose and complexity. We are also capable of solving non-standard tasks within individual projects.',
					},
					{
						lang: 'en',
						cover: {
							video: '',
							image: '',
						},
						title: '',
						description:
							'Let us study each case in detail, design a model of the solution, create the appropriate design and a functional prototype, implement the order and finish the project with the presentation of the finished product. An unusual and new approach to the task, flexible and broad specialization, quality implementation are the features of the StudCIT',
					},
				],
			},

			/* Offers page */
			{
				lang: 'ua',
				cover: {
					video: '',
					image: '',
				},
				title: 'Ви знаєте, що ми можемо? Що ми робимо? Що ми підтримуємо?',
				description: 'Наші можливості обмежені лише нашою уявою.',
				content: [
					{
						lang: 'ua',
						cover: '/images/weOffer/one.jpg',
						title: 'Розробка веб-сайту для різних цілей',
						description:
							'Не кожен, хто замислювався про створення власного ресурсу в мережі, до кінця розуміє, навіщо це потрібно. Саме визначення цілей майбутнього проекту, визначає подальший розвиток та популяризацію.',
					},
					{
						lang: 'ua',
						cover: '/images/weOffer/two.jpg',
						title:
							'Створення програмного забезпечення для вирішення реально існюючих завдань',
						description:
							'Розроблене програмне забезпечення - інструмент для вирішення необхідних завдань. Наприклад, за допомогою веб-додатків, нараховується заробітна плата, ведеться контроль часу роботи, як кожного співробітника, так і частини компанії, виконується перевірка роботи установи.',
					},
					{
						lang: 'ua',
						cover: '/images/weOffer/three.jpg',
						title: 'Проєктування інформаційних систем різної складності',
						description:
							'Web-розробка починається з визначення причин і цілей. Ці дві складові напряму впливають на складність виконання.',
					},
				],
			},
			{
				lang: 'ru',
				cover: {
					video: '',
					image: '',
				},
				title: 'Ты знаешь что мы можем?',
				description:
					'Что мы делаем? Что мы поддерживаем? Наши возможности ограничены только нашим воображением.',
				content: [
					{
						lang: 'ru',
						cover: '/images/weOffer/one.jpg',
						title: 'Разработка веб-сайта для различных целей',
						description:
							'Не каждый, кто задумывался о создании собственного ресурса в сети, до конца понимает, зачем это нужно. А ведь определение целей будущего проекта, определяет дальнейшее продвижение и популяризацию.',
					},
					{
						lang: 'ru',
						cover: '/images/weOffer/two.jpg',
						title: 'Создание програмного обеспечения для реальных задач',
						description:
							'Разработанное программное обеспечение - инструмент для решения необходимых задач. Например, при помощи веб-приложений, начисляется заработная плата, ведется контроль времени работы, как каждого сотрудника, так и части компании, выполняется проверка работы учреждения.',
					},
					{
						lang: 'ru',
						cover: '/images/weOffer/three.jpg',
						title: 'Проектирование информационных систем различной сложности',
						description:
							'Web-разработка начинается с определения целей. В зависмости от поставленой цели нами будет выбрана наиболее походящая платформа и функционал. Эти две составляющие напрямую влияют на сложность выполнения.',
					},
				],
			},
			{
				lang: 'en',
				cover: {
					video: '',
					image: '',
				},
				title: 'Do you know what we can?',
				description:
					'What we do? What we support? Our possibilities are limited only by our imagination.',
				content: [
					{
						lang: 'en',
						cover: '/images/weOffer/one.jpg',
						title: 'Website development for different purposes',
						description:
							'Not everyone who has thought about creating their own resource on the network fully understands why it is necessary. It`s the definition of the goals of the future project that determines the further development and promotion.',
					},
					{
						lang: 'en',
						cover: '/images/weOffer/two.jpg',
						title: 'Creating software to solve tasks',
						description:
							'The developed software is a tool for solving the necessary tasks. For example, with the help of web applications wages are calculated, work time is monitored both for each employee and for part of the company, the work of the institution is checked.',
					},
					{
						lang: 'en',
						cover: '/images/weOffer/three.jpg',
						title: 'Design of information systems of various complexity',
						description:
							'Web development begins by identifying the causes and goals. Depending from the goal we will choose the most suitable platform and functional. These two components directly affect the complexity of execution.',
					},
				],
			},

			/* Empolyee page */
			{
				lang: 'ua',
				cover: {
					video: '',
					image: '',
				},
				title: 'Ті люди, які можуть легко реалізувати все те, що ви хочете.',
				description: 'Разом ми можемо більше, ніж кожен окремо.',
				content: [],
			},
			{
				lang: 'ru',
				cover: {
					video: '',
					image: '',
				},
				title:
					'Те люди, которые могут легко реализовать все то, что вы хотите.?',
				description: 'Вместе мы можем больше, чем в одиночку.',
				content: [],
			},
			{
				lang: 'en',
				cover: {
					video: '',
					image: '',
				},
				title: 'Many people who can easily realize all things which you wish.',
				description: 'Together we can more than one by one.',
				content: [],
			},

			/* Portfolio page */
			{
				lang: 'ua',
				cover: {
					video: '',
					image: '',
				},
				title: 'Наші проекти, якими ми пишаємось.',
				description: 'Плоди нашої діяльності.',
				content: [
					{
						lang: 'ua',
						cover: '/images/portfolio/SOC.jpg',
						title: 'Сайт кафедри соціальної роботи СумДУ',
						description: 'http://socstor.sumdu.edu.ua/',
					},
					{
						lang: 'ua',
						cover: '/images/portfolio/JOB.jpg',
						title: 'Платформа пошуку роботи та стажування СумДУ',
						description: 'http://job.sumdu.edu.ua/',
					},
					{
						lang: 'ua',
						cover: '/images/portfolio/AC.jpg',
						title:
							'Онлайн сервiс для оцiнки якості навчального процесу в СумДУ',
						description: 'http://ac.sumdu.edu.ua/',
					},
				],
			},
			{
				lang: 'ru',
				cover: {
					video: '',
					image: '',
				},
				title: 'Наши проекты которыми мы гордимся.',
				description: 'Плоды нашей скромной деятельности.',
				content: [
					{
						lang: 'ru',
						cover: '/images/portfolio/SOC.jpg',
						title: 'Сайт кафедры социальной работы СумГУ',
						description: 'http://socstor.sumdu.edu.ua/',
					},
					{
						lang: 'ru',
						cover: '/images/portfolio/JOB.jpg',
						title: 'Платформа поиска работы и стажировки СумГУ',
						description: 'http://job.sumdu.edu.ua/',
					},
					{
						lang: 'ru',
						cover: '/images/portfolio/AC.jpg',
						title:
							'Онлайн сервис для оценки качества учебного процесса в СумГУ',
						description: 'http://ac.sumdu.edu.ua/',
					},
				],
			},
			{
				lang: 'en',
				cover: {
					video: '',
					image: '',
				},
				title: 'Our implemented incredible projects which we are proud of.',
				description: 'The fruits of our humble activity..',
				content: [
					{
						lang: 'en',
						cover: '/images/portfolio/SOC.jpg',
						title: 'Department of Social Work of SSU',
						description: 'http://socstor.sumdu.edu.ua/',
					},
					{
						lang: 'en',
						cover: '/images/portfolio/JOB.jpg',
						title: 'Practice and internship search platform of SSU',
						description: 'http://job.sumdu.edu.ua/',
					},
					{
						lang: 'en',
						cover: '/images/portfolio/AC.jpg',
						title:
							'Online assessment of the quality of the educational process at SSU',
						description: 'http://ac.sumdu.edu.ua/',
					},
				],
			},
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}
