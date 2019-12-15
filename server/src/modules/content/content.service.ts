import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ContentEntity } from './content.entity';

/**
 * [class description]
 * @return [description]
 */
@Injectable()
export class ContentService {
	/**
	 * [TTL description]
	 */
	private readonly TTL: number = 3000;

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
	 * @param  content [description]
	 * @return      [description]
	 */
	public async createOne(
		content: Partial<ContentEntity>,
	): Promise<ContentEntity> {
		return await this.contentRepository.save(content).catch(() => {
			throw new ConflictException(`Content already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @param  where [description]
	 * @return [description]
	 */
	public async selectAll(
		where: Partial<ContentEntity>,
	): Promise<ContentEntity[]> {
		const options = { where, ttl: this.TTL };
		return await this.contentRepository.find(options).catch(() => {
			throw new NotFoundException('Content not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  where [description]
	 * @return    [description]
	 */
	public async selectOne(
		where: Partial<ContentEntity>,
	): Promise<ContentEntity> {
		const options = { where, ttl: this.TTL };
		return await this.contentRepository.findOneOrFail(options).catch(() => {
			throw new NotFoundException('Content not found');
		});
	}

	/**
	 * [updateOne description]
	 * @param  content  [description]
	 * @param  _content [description]
	 * @return       [description]
	 */
	public async updateOne(
		id: ContentEntity['id'],
		_content: Partial<ContentEntity>,
	): Promise<UpdateResult> {
		return await this.contentRepository.update(id, _content).catch(() => {
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
