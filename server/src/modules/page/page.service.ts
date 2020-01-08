import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
	Repository,
	DeepPartial,
	DeleteResult,
	FindOneOptions,
	FindManyOptions,
} from 'typeorm';

import { PageEntity } from './page.entity';

/**
 * [PageService description]
 */
@Injectable()
export class PageService {
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
	public async createOne(page: DeepPartial<PageEntity>): Promise<PageEntity> {
		return await this.pageRepository.save(page).catch(() => {
			throw new ConflictException(`Page already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @param  where [description]
	 * @return [description]
	 */
	public async selectAll(
		where: FindManyOptions['where'],
	): Promise<PageEntity[]> {
		return await this.pageRepository.find({ where }).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  where [description]
	 * @return    [description]
	 */
	public async selectOne(where: FindOneOptions['where']): Promise<PageEntity> {
		return await this.pageRepository.findOneOrFail({ where }).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}

	/**
	 * [updateOne description]
	 * @param  data    [description]
	 * @param  _data [description]
	 * @return       [description]
	 */
	public async updateOne(
		data: PageEntity,
		_data: DeepPartial<PageEntity>,
	): Promise<PageEntity> {
		const page = this.pageRepository.merge(data, _data);
		return await this.pageRepository.save(page).catch(() => {
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
