import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { PagesEntity } from './pages.entity';

/**
 * [Injectable description]
 * @return [description]
 */
@Injectable()
export class PagesService {
	/**
	 * [constructor description]
	 * @param @InjectRepository(PagesEntity [description]
	 */
	constructor(
		@InjectRepository(PagesEntity)
		private readonly pagesRepository: Repository<PagesEntity>,
	) {}

	/**
	 * [createOne description]
	 * @param  page [description]
	 * @return      [description]
	 */
	public async createOne(page: PagesEntity): Promise<PagesEntity> {
		return await this.pagesRepository.save(page).catch(() => {
			throw new ConflictException(`Page already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @return [description]
	 */
	public async selectAll(): Promise<PagesEntity[]> {
		return await this.pagesRepository.find().catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  id [description]
	 * @return    [description]
	 */
	public async selectOne(id: PagesEntity['id']): Promise<PagesEntity> {
		return await this.pagesRepository.findOneOrFail(id).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	/**
	 * [updateOne description]
	 * @param  page  [description]
	 * @param  _page [description]
	 * @return       [description]
	 */
	public async updateOne(
		page: PagesEntity,
		_page: PagesEntity,
	): Promise<PagesEntity> {
		const mergePage = this.pagesRepository.merge(page, _page);
		return await this.pagesRepository.save(mergePage).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	/**
	 * [deleteOne description]
	 * @param  pages [description]
	 * @return       [description]
	 */
	public async deleteOne(pages: PagesEntity): Promise<DeleteResult> {
		return await this.pagesRepository.delete(pages).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}
}
