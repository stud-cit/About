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

import { ContentEntity } from './content.entity';

/**
 * [ContentService description]
 */
@Injectable()
export class ContentService {
	/**
	 * [constructor description]
	 * @param @InjectRepository(ContentEntity [description]
	 */
	constructor(
		@InjectRepository(ContentEntity)
		private readonly contentRepository: Repository<ContentEntity>,
	) {}

	/**
	 * [createOne description]
	 * @param  data [description]
	 * @return      [description]
	 */
	public async createOne(
		data: DeepPartial<ContentEntity>,
	): Promise<ContentEntity> {
		return await this.contentRepository.save(data).catch(() => {
			throw new ConflictException(`Content already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @param  where [description]
	 * @return [description]
	 */
	public async selectAll(
		where: FindManyOptions['where'],
	): Promise<ContentEntity[]> {
		return await this.contentRepository.find({ where }).catch(() => {
			throw new NotFoundException('Content not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  where [description]
	 * @return    [description]
	 */
	public async selectOne(
		where: FindOneOptions['where'],
	): Promise<ContentEntity> {
		return await this.contentRepository.findOneOrFail({ where }).catch(() => {
			throw new NotFoundException('Content not found');
		});
	}

	/**
	 * [updateOne description]
	 * @param  data    [description]
	 * @param  _data [description]
	 * @return          [description]
	 */
	public async updateOne(
		data: ContentEntity,
		_data: DeepPartial<ContentEntity>,
	): Promise<ContentEntity> {
		const content = this.contentRepository.merge(data, _data);
		return await this.contentRepository.save(content).catch(() => {
			throw new NotFoundException('Content not found');
		});
	}

	/**
	 * [deleteOne description]
	 * @param  id [description]
	 * @return       [description]
	 */
	public async deleteOne(id: ContentEntity['id']): Promise<DeleteResult> {
		return await this.contentRepository.delete(id).catch(() => {
			throw new NotFoundException('Content not found');
		});
	}
}
