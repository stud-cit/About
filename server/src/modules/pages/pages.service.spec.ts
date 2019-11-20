import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PagesService } from './pages.service';
import { PagesEntity } from './pages.entity';

describe('Pages Service', () => {
	let pagesRepository: Repository<PagesEntity>;
	let pagesService: PagesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PagesService,
				{
					provide: getRepositoryToken(PagesEntity),
					useClass: Repository,
				},
			],
		}).compile();

		pagesService = module.get<PagesService>(PagesService);
		pagesRepository = module.get<Repository<PagesEntity>>(
			getRepositoryToken(PagesEntity),
		);
	});

	it('should be defined repository', () => {
		expect(pagesRepository).toBeDefined();
	});

	it('should be defined', () => {
		expect(pagesService).toBeDefined();
	});

	describe('createOne', () => {
		it('should be return create pages', () => {});
		it('should be return exception', () => {});
	});

	describe('selectAll', () => {
		it('should be return pages', async () => {});
		it('should be return exception', async () => {});
	});

	describe('selectOne', () => {
		it('should be return page', () => {});
		it('should be return exception', () => {});
	});

	describe('updateOne', () => {
		it('should be return update page', () => {});
		it('should be return exception', () => {});
	});

	describe('deleteMultiple', () => {
		it('should be return delete pages', () => {});
		it('should be return exception', () => {});
	});
});
