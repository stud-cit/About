import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContentService } from './content.service';
import { ContentEntity } from './content.entity';

describe('Content Service', () => {
	let contentRepository: Repository<ContentEntity>;
	let contentService: ContentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ContentService,
				{
					provide: getRepositoryToken(ContentEntity),
					useClass: Repository,
				},
			],
		}).compile();

		contentService = module.get<ContentService>(ContentService);
		contentRepository = module.get<Repository<ContentEntity>>(
			getRepositoryToken(ContentEntity),
		);
	});

	it('should be defined repository', () => {
		expect(contentRepository).toBeDefined();
	});

	it('should be defined', () => {
		expect(contentService).toBeDefined();
	});

	describe('createOne', () => {
		it('should be return create content', () => {});
		it('should be return exception', () => {});
	});

	describe('selectAll', () => {
		it('should be return content', async () => {});
		it('should be return exception', async () => {});
	});

	describe('selectOne', () => {
		it('should be return content', () => {});
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
