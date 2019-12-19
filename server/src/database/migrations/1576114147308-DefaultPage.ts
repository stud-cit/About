import { MigrationInterface, QueryRunner } from 'typeorm';

import { PageEntity } from '../../modules/page';

/**
 * @ignore
 */
export class DefaultPage1576114147308 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.connection.getRepository(PageEntity).save(<PageEntity[]>[
			/* About page */
			{
				lang: 'ua',
				link: 'about',
				title: 'Про нас',
				name: 'Ми можемо зробити цей світ краще',
				cover: {
					image: '/about.jpg',
					video: '/about-us-pc.mp4',
				},
				content: [
					{
						lang: 'ua',
						description:
							'СтудЦІТ - це команда з талановитих фахівців, для яких виготовлення сайтів не робота, а частина життя. Можливість постійно вдосконалюватися, вирішувати нетривіальні завдання та використовувати здібності на благо клієнта. Спеціалізуємося на розробці інтернет ресурсів варіативного призначення й складності. Також здатні вирішувати нестандартні завдання, в рамках індивідуальних проектів.',
					},
					{
						lang: 'ua',
						description:
							'Детально вивчимо кожен випадок, спроектуємо модель рішення, створимо відповідний дизайн і функціональний прототип, реалізуємо замовлення і закінчимо проект презентацією готового продукту. Незвичайний та свіжий підхід до поставленого завдання, гнучка і широка спеціалізація, якісна реалізація - характерні риси СтудЦІТ.',
					},
				],
			},
			{
				lang: 'ru',
				link: 'about',
				title: 'О нас',
				name: 'Мы можем сделать этот мир лучше.',
				cover: {
					image: '/about.jpg',
					video: '/about-us-pc.mp4',
				},
				content: [
					{
						lang: 'ru',
						description:
							'СтудЦИТ – это команда из талантливых специалистов, для которых изготовление сайтов не работа, а часть жизни. Возможность постоянно совершенствоваться, решать нетривиальные задачи и использовать способности на благо клиента. Специализируемся на разработке интернет ресурсов вариативного предназначения и сложности. Также способны решать нестандартные задачи, в рамках индивидуальных проектов.',
					},
					{
						lang: 'ru',
						description:
							'Детально изучим каждый случай, спроектируем модель решения, создадим подходящий дизайн и функциональный прототип, реализуем заказ и закончим проект презентацией готового продукта. Необычный и свежий подход к поставленной задаче, гибкая и широкая специализация, качественная реализация - характерные черты Студцит.',
					},
				],
			},
			{
				lang: 'en',
				link: 'about',
				title: 'About Us',
				name: 'We can make this world better.',
				cover: {
					image: '/about.jpg',
					video: '/about-us-pc.mp4',
				},
				content: [
					{
						lang: 'en',
						description:
							'Student Center of Information Technologies (StudCIT) is a team of talented professionals for whom website design is not a job but a part of life. There is an opportunity to constantly improve, solve non-trivial tasks and use abilities for the benefit of the client. We specialize in the development of internet resources of different purpose and complexity. We are also capable of solving non-standard tasks within individual projects.',
					},
					{
						lang: 'en',
						description:
							'Let us study each case in detail, design a model of the solution, create the appropriate design and a functional prototype, implement the order and finish the project with the presentation of the finished product. An unusual and new approach to the task, flexible and broad specialization, quality implementation are the features of the StudCIT',
					},
				],
			},

			/* Offers page */
			{
				lang: 'ua',
				link: 'offers',
				title: 'Навички',
				name: 'Ви знаєте, що ми можемо? Що ми робимо? Що ми підтримуємо?',
				description: 'Наші можливості обмежені лише нашою уявою.',
				cover: {
					image: '/offers.jpg',
					video: '/we-offer-pc.mp4',
				},
				content: [
					{
						lang: 'ua',
						title: 'Розробка веб-сайту для різних цілей',
						description:
							'Не кожен, хто замислювався про створення власного ресурсу в мережі, до кінця розуміє, навіщо це потрібно. Саме визначення цілей майбутнього проекту, визначає подальший розвиток та популяризацію.',
					},
					{
						lang: 'ua',
						title:
							'Створення програмного забезпечення для вирішення реально існюючих завдань',
						description:
							'Розроблене програмне забезпечення - інструмент для вирішення необхідних завдань. Наприклад, за допомогою веб-додатків, нараховується заробітна плата, ведеться контроль часу роботи, як кожного співробітника, так і частини компанії, виконується перевірка роботи установи.',
					},
					{
						lang: 'ua',
						title: 'Проєктування інформаційних систем різної складності',
						description:
							'Web-розробка починається з визначення причин і цілей. Ці дві складові напряму впливають на складність виконання.',
					},
				],
			},
			{
				lang: 'ru',
				link: 'offers',
				title: 'Навыки',
				name: 'Ты знаешь что мы можем?',
				description:
					'Что мы делаем? Что мы поддерживаем? Наши возможности ограничены только нашим воображением.',
				cover: {
					image: '/offers.jpg',
					video: '/we-offer-pc.mp4',
				},
				content: [
					{
						lang: 'ru',
						title: 'Разработка веб-сайта для различных целей',
						description:
							'Не каждый, кто задумывался о создании собственного ресурса в сети, до конца понимает, зачем это нужно. А ведь определение целей будущего проекта, определяет дальнейшее продвижение и популяризацию.',
					},
					{
						lang: 'ru',
						title: 'Создание програмного обеспечения для реальных задач',
						description:
							'Разработанное программное обеспечение - инструмент для решения необходимых задач. Например, при помощи веб-приложений, начисляется заработная плата, ведется контроль времени работы, как каждого сотрудника, так и части компании, выполняется проверка работы учреждения.',
					},
					{
						lang: 'ru',
						title: 'Проектирование информационных систем различной сложности',
						description:
							'Web-разработка начинается с определения целей. В зависмости от поставленой цели нами будет выбрана наиболее походящая платформа и функционал. Эти две составляющие напрямую влияют на сложность выполнения.',
					},
				],
			},
			{
				lang: 'en',
				link: 'offers',
				title: 'We Offers',
				name: 'Do you know what we can?',
				description:
					'What we do? What we support? Our possibilities are limited only by our imagination.',
				cover: {
					image: '/offers.jpg',
					video: '/we-offer-pc.mp4',
				},
				content: [
					{
						lang: 'en',
						title: 'Website development for different purposes',
						description:
							'Not everyone who has thought about creating their own resource on the network fully understands why it is necessary. It`s the definition of the goals of the future project that determines the further development and promotion.',
					},
					{
						lang: 'en',
						title: 'Creating software to solve tasks',
						description:
							'The developed software is a tool for solving the necessary tasks. For example, with the help of web applications wages are calculated, work time is monitored both for each employee and for part of the company, the work of the institution is checked.',
					},
					{
						lang: 'en',
						title: 'Design of information systems of various complexity',
						description:
							'Web development begins by identifying the causes and goals. Depending from the goal we will choose the most suitable platform and functional. These two components directly affect the complexity of execution.',
					},
				],
			},

			/* Empolyee page */
			{
				lang: 'ua',
				link: 'our-staff',
				title: 'Персонал',
				name: 'Ті люди, які можуть легко реалізувати все те, що ви хочете.',
				description: 'Разом ми можемо більше, ніж кожен окремо.',
				cover: {
					image: '/our-staff.jpg',
					video: '/staff-pc.mp4',
				},
			},
			{
				lang: 'ru',
				link: 'our-staff',
				title: 'Персонал',
				name:
					'Те люди, которые могут легко реализовать все то, что вы хотите.?',
				description: 'Вместе мы можем больше, чем в одиночку.',
				cover: {
					image: '/our-staff.jpg',
					video: '/staff-pc.mp4',
				},
			},
			{
				lang: 'en',
				link: 'our-staff',
				title: 'Our Staff',
				name: 'Many people who can easily realize all things which you wish.',
				description: 'Together we can more than one by one.',
				cover: {
					image: '/our-staff.jpg',
					video: '/staff-pc.mp4',
				},
			},

			/* Portfolio page */
			{
				lang: 'ua',
				link: 'portfolio',
				title: 'Портфоліо',
				name: 'Наші проекти, якими ми пишаємось.',
				description: 'Плоди нашої діяльності.',
				cover: {
					image: '/portfolio.jpg',
					video: '/portfolio-pc.mp4',
				},
				content: [
					{
						lang: 'ua',
						title: 'Сайт кафедри соціальної роботи СумДУ',
						description: 'http://socstor.sumdu.edu.ua/',
					},
					{
						lang: 'ua',
						title: 'Платформа пошуку роботи та стажування СумДУ',
						description: 'http://job.sumdu.edu.ua/',
					},
					{
						lang: 'ua',
						title:
							'Онлайн сервiс для оцiнки якості навчального процесу в СумДУ',
						description: 'http://ac.sumdu.edu.ua/',
					},
				],
			},
			{
				lang: 'ru',
				link: 'portfolio',
				title: 'Портфолио',
				name: 'Наши проекты которыми мы гордимся.',
				description: 'Плоды нашей скромной деятельности.',
				cover: {
					image: '/portfolio.jpg',
					video: '/portfolio-pc.mp4',
				},
				content: [
					{
						lang: 'ru',
						title: 'Сайт кафедры социальной работы СумГУ',
						description: 'http://socstor.sumdu.edu.ua/',
					},
					{
						lang: 'ru',
						title: 'Платформа поиска работы и стажировки СумГУ',
						description: 'http://job.sumdu.edu.ua/',
					},
					{
						lang: 'ru',
						title:
							'Онлайн сервис для оценки качества учебного процесса в СумГУ',
						description: 'http://ac.sumdu.edu.ua/',
					},
				],
			},
			{
				lang: 'en',
				link: 'portfolio',
				title: 'Portfolio',
				name: 'Our implemented incredible projects which we are proud of.',
				description: 'The fruits of our humble activity..',
				cover: {
					image: '/portfolio.jpg',
					video: '/portfolio-pc.mp4',
				},
				content: [
					{
						lang: 'en',
						title: 'Department of Social Work of SSU',
						description: 'http://socstor.sumdu.edu.ua/',
					},
					{
						lang: 'en',
						title: 'Practice and internship search platform of SSU',
						description: 'http://job.sumdu.edu.ua/',
					},
					{
						lang: 'en',
						title:
							'Online assessment of the quality of the educational process at SSU',
						description: 'http://ac.sumdu.edu.ua/',
					},
				],
			},
		]);
	}

	public async down(_queryRunner: QueryRunner): Promise<any> {}
}