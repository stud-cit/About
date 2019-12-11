import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { PagesEntity } from './pages.entity';

/**
 * [class description]
 * @return [description]
 */
@Injectable()
export class PagesService {
	/**
	 * [TTL description]
	 */
	private readonly TTL: number = 3000;

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
	public async createOne(page: Partial<PagesEntity>): Promise<PagesEntity> {
		return await this.pagesRepository.save(page).catch(() => {
			throw new ConflictException(`Page already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @return [description]
	 */
	public async selectAll(): Promise<PagesEntity[]> {
		const options = { where: {}, cache: this.TTL };
		return await this.pagesRepository.find(options).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  where [description]
	 * @return    [description]
	 */
	public async selectOne(where: Partial<PagesEntity>): Promise<PagesEntity> {
		const options = { where, cache: this.TTL };
		return await this.pagesRepository.findOneOrFail(options).catch(() => {
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
		id: PagesEntity['id'],
		_page: Partial<PagesEntity>,
	): Promise<UpdateResult> {
		return await this.pagesRepository.update(id, _page).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	/**
	 * [deleteOne description]
	 * @param  id [description]
	 * @return       [description]
	 */
	public async deleteOne(id: PagesEntity['id']): Promise<DeleteResult> {
		return await this.pagesRepository.delete(id).catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}
}
