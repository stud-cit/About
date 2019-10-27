import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { PagesEntity } from './pages.entity';
import { PageRequest } from './dto/pages.dto';

@Injectable()
export class PagesService {
	constructor(
		@InjectRepository(PagesEntity)
		private readonly pagesRepository: Repository<PagesEntity>,
	) {}

	public async createOne(page: PageRequest): Promise<PagesEntity> {
		return await this.pagesRepository.save(page);
	}

	public async selectAll(): Promise<PagesEntity[]> {
		return await this.pagesRepository.find();
	}

	public async selectOne(id: number): Promise<PagesEntity> {
		return await this.pagesRepository.findOneOrFail(id);
	}

	public async updateOne(
		page: PagesEntity,
		_page: PageRequest,
	): Promise<PagesEntity> {
		this.pagesRepository.merge(page, _page);
		return await this.pagesRepository.save(page);
	}

	public async deleteMultiple(page: number[]): Promise<DeleteResult> {
		return await this.pagesRepository.delete(page);
	}
}
