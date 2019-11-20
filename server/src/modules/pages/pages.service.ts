import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { PagesEntity } from './pages.entity';

@Injectable()
export class PagesService {
	constructor(
		@InjectRepository(PagesEntity)
		private readonly pagesRepository: Repository<PagesEntity>,
	) {}

	public async createOne(page: PagesEntity): Promise<PagesEntity> {
		return await this.pagesRepository.save(page).catch(() => {
			throw new ConflictException(`Page already exists`);
		});
	}

	public async selectAll(): Promise<PagesEntity[]> {
		return await this.pagesRepository.find().catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	public async selectOne(id: PagesEntity['id']): Promise<PagesEntity> {
		return await this.pagesRepository.findOneOrFail(id).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	public async updateOne(
		page: PagesEntity,
		_page: PagesEntity,
	): Promise<PagesEntity> {
		const mergePage = this.pagesRepository.merge(page, _page);
		return await this.pagesRepository.save(mergePage).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	public async deleteMultiple(id: [PagesEntity['id']]): Promise<DeleteResult> {
		return await this.pagesRepository.delete(id).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}
}
