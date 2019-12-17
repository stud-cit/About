import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';

/**
 * [UserService description]
 */
@Injectable()
export class UserService {
	/**
	 * [TTL description]
	 */
	private readonly TTL: number = 3000;

	/**
	 * [constructor description]
	 * @param @InjectRepository(UserEntity [description]
	 */
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	/**
	 * [createOne description]
	 * @param  data [description]
	 * @return      [description]
	 */
	public async createOne(data: Partial<UserEntity>): Promise<UserEntity> {
		return await this.userRepository.save(data).catch(() => {
			throw new ConflictException(`User already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @param  where [description]
	 * @return       [description]
	 */
	public async selectAll(where: Partial<UserEntity>): Promise<UserEntity[]> {
		const options = { where, ttl: this.TTL };
		return await this.userRepository.find(options).catch(() => {
			throw new NotFoundException('User not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  where [description]
	 * @return       [description]
	 */
	public async selectOne(where: Partial<UserEntity>): Promise<UserEntity> {
		const options = { where, ttl: this.TTL };
		return await this.userRepository.findOneOrFail(options).catch(() => {
			throw new NotFoundException('User not found');
		});
	}

	/**
	 * [updateOne description]
	 * @param  id  [description]
	 * @param  data [description]
	 * @return       [description]
	 */
	public async updateOne(
		id: UserEntity['id'],
		data: Partial<UserEntity>,
	): Promise<UpdateResult> {
		return await this.userRepository.update(id, data).catch(() => {
			throw new ConflictException(`User already exists`);
		});
	}

	/**
	 * [deleteOne description]
	 * @param  id [description]
	 * @return    [description]
	 */
	public async deleteOne(id: UserEntity['id']): Promise<DeleteResult> {
		return await this.userRepository.delete(id).catch(() => {
			throw new NotFoundException('User not found');
		});
	}
}
