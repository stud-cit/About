import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageService } from './page.service';
import { PageEntity } from './page.entity';

describe('Page Service', () => {
	let pageRepository: Repository<PageEntity>;
	let pageService: PageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PageService,
				{
					provide: getRepositoryToken(PageEntity),
					useClass: Repository,
				},
			],
		}).compile();

		pageService = module.get<PageService>(PageService);
		pageRepository = module.get<Repository<PageEntity>>(
			getRepositoryToken(PageEntity),
		);
	});

	it('should be defined repository', () => {
		expect(pageRepository).toBeDefined();
	});

	it('should be defined', () => {
		expect(pageService).toBeDefined();
	});

	describe('createOne', () => {
		it('should be return create page', () => {});
		it('should be return exception', () => {});
	});

	describe('selectAll', () => {
		it('should be return page', async () => {});
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

	describe('deleteOne', () => {
		it('should be return delete page', () => {});
		it('should be return exception', () => {});
	});
});
