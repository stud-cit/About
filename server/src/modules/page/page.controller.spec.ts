import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PageEntity } from './page.entity';

describe('Page Controller', () => {
	let pageRepository: Repository<PageEntity>;
	let pageController: PageController;
	let pageService: PageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PageController],
			providers: [
				PageService,
				{
					provide: getRepositoryToken(PageEntity),
					useClass: Repository,
				},
			],
		}).compile();

		pageService = module.get<PageService>(PageService);
		pageController = module.get<PageController>(PageController);
		pageRepository = module.get<Repository<PageEntity>>(
			getRepositoryToken(PageEntity),
		);
	});

	it('should be defined controller', () => {
		expect(pageController).toBeDefined();
	});

	it('should be defined repository', () => {
		expect(pageRepository).toBeDefined();
	});

	it('should be defined service', () => {
		expect(pageService).toBeDefined();
	});

	describe('createOne', () => {
		it('should be return create page', () => {});
		it('should be return exception', () => {});
	});

	describe('selectAll', () => {
		it('should be return select all page', () => {});
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
