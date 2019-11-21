import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { PagesEntity } from './pages.entity';

describe('Pages Controller', () => {
	let pagesRepository: Repository<PagesEntity>;
	let pagesController: PagesController;
	let pagesService: PagesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PagesController],
			providers: [
				PagesService,
				{
					provide: getRepositoryToken(PagesEntity),
					useClass: Repository,
				},
			],
		}).compile();

		pagesService = module.get<PagesService>(PagesService);
		pagesController = module.get<PagesController>(PagesController);
		pagesRepository = module.get<Repository<PagesEntity>>(
			getRepositoryToken(PagesEntity),
		);
	});

	it('should be defined controller', () => {
		expect(pagesController).toBeDefined();
	});

	it('should be defined repository', () => {
		expect(pagesRepository).toBeDefined();
	});

	it('should be defined service', () => {
		expect(pagesService).toBeDefined();
	});

	describe('Create multiple', () => {
		it('should be return create pages', () => {});
		it('should be return exception', () => {});
	});

	describe('Select all', () => {
		it('should be return select all pages', () => {});
		it('should be return exception', () => {});
	});

	describe('Update one', () => {
		it('should be return update pages', () => {});
		it('should be return exception', () => {});
	});

	describe('Delete one', () => {
		it('should be return delete pages', () => {});
		it('should be return exception', () => {});
	});
});
