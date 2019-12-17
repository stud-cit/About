import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { PageEntity } from './page.entity';

/**
 * [PageService description]
 */
@Injectable()
export class PageService {
	/**
	 * [TTL description]
	 */
	private readonly TTL: number = 3000;

	/**
	 * [constructor description]
	 * @param @InjectRepository(PageEntity [description]
	 */
	constructor(
		@InjectRepository(PageEntity)
		private readonly pageRepository: Repository<PageEntity>,
	) {}

	/**
	 * [createOne description]
	 * @param  page [description]
	 * @return      [description]
	 */
	public async createOne(page: Partial<PageEntity>): Promise<PageEntity> {
		return await this.pageRepository.save(page).catch(() => {
			throw new ConflictException(`Page already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @param  where [description]
	 * @return [description]
	 */
	public async selectAll(where: Partial<PageEntity>): Promise<PageEntity[]> {
		const options = { where, cache: this.TTL };
		return await this.pageRepository.find(options).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  where [description]
	 * @return    [description]
	 */
	public async selectOne(where: Partial<PageEntity>): Promise<PageEntity> {
		const options = { where, cache: this.TTL };
		return await this.pageRepository.findOneOrFail(options).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}

	/**
	 * [updateOne description]
	 * @param  id    [description]
	 * @param  _page [description]
	 * @return       [description]
	 */
	public async updateOne(
		id: PageEntity['id'],
		_page: Partial<PageEntity>,
	): Promise<UpdateResult> {
		return await this.pageRepository.update(id, _page).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}

	/**
	 * [deleteOne description]
	 * @param  id [description]
	 * @return       [description]
	 */
	public async deleteOne(id: PageEntity['id']): Promise<DeleteResult> {
		return await this.pageRepository.delete(id).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}
}
