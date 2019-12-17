import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentEntity } from './content.entity';

describe('Content Controller', () => {
	let contentRepository: Repository<ContentEntity>;
	let contentController: ContentController;
	let contentService: ContentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ContentController],
			providers: [
				ContentService,
				{
					provide: getRepositoryToken(ContentEntity),
					useClass: Repository,
				},
			],
		}).compile();

		contentService = module.get<ContentService>(ContentService);
		contentController = module.get<ContentController>(ContentController);
		contentRepository = module.get<Repository<ContentEntity>>(
			getRepositoryToken(ContentEntity),
		);
	});

	it('should be defined controller', () => {
		expect(contentController).toBeDefined();
	});

	it('should be defined repository', () => {
		expect(contentRepository).toBeDefined();
	});

	it('should be defined service', () => {
		expect(contentService).toBeDefined();
	});

	describe('createOne', () => {
		it('should be return create content', () => {});
		it('should be return exception', () => {});
	});

	describe('selectAll', () => {
		it('should be return select all content', () => {});
		it('should be return exception', () => {});
	});

	describe('updateOne', () => {
		it('should be return update content', () => {});
		it('should be return exception', () => {});
	});

	describe('deleteOne', () => {
		it('should be return delete content', () => {});
		it('should be return exception', () => {});
	});
});
