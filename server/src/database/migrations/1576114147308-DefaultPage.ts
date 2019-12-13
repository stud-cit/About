import { MigrationInterface, QueryRunner } from 'typeorm';

import { PagesEntity } from '../../modules/pages/pages.entity';

export class DefaultPage1576114147308 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.connection.getRepository(PagesEntity).save(<PagesEntity>{
			title: 'pages.about',
			content: [
				{
					lang: 'en',
					title: '1',
					description: '111',
					cover: '11111',
				},
				{
					lang: 'en',
					title: '2',
					description: '222',
					cover: '22222',
				},
			],
		});

		await queryRunner.connection.getRepository(PagesEntity).save(<PagesEntity>{
			title: 'pages.weOffers',
			content: [
				{
					lang: 'en',
					title: '1',
					description: '111',
					cover: '11111',
				},
				{
					lang: 'en',
					title: '2',
					description: '222',
					cover: '22222',
				},
			],
		});

		await queryRunner.connection.getRepository(PagesEntity).save(<PagesEntity>{
			title: 'pages.ourStaff',
			content: [
				{
					lang: 'en',
					title: '1',
					description: '111',
					cover: '11111',
				},
				{
					lang: 'en',
					title: '2',
					description: '222',
					cover: '22222',
				},
			],
		});

		await queryRunner.connection.getRepository(PagesEntity).save(<PagesEntity>{
			title: 'pages.portfolio',
			content: [
				{
					lang: 'en',
					title: '1',
					description: '111',
					cover: '11111',
				},
				{
					lang: 'en',
					title: '2',
					description: '222',
					cover: '22222',
				},
			],
		});
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}
