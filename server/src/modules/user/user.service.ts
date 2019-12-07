import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';

/**
 * [Injectable description]
 * @return [description]
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
	 * @param  user [description]
	 * @return      [description]
	 */
	public async createOne(user: UserEntity): Promise<UserEntity> {
		return await this.userRepository.save(user).catch(() => {
			throw new ConflictException(`User already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @return [description]
	 */
	public async selectAll(): Promise<UserEntity[]> {
		const options = { where: {}, ttl: this.TTL };
		return await this.userRepository.find(options).catch(() => {
			throw new NotFoundException('User not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  email [description]
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
	 * @param  user  [description]
	 * @param  _user [description]
	 * @return       [description]
	 */
	public async updateOne(
		user: UserEntity,
		_user: UserEntity,
	): Promise<UserEntity> {
		const mergeUser = this.userRepository.merge(user, _user);
		return await this.userRepository.save(mergeUser).catch(() => {
			throw new NotFoundException('User not found');
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
