import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	public async createOne(user: UserEntity): Promise<UserEntity> {
		return await this.userRepository.save(user).catch(() => {
			throw new ConflictException(`User already exists`);
		});
	}

	public async selectAll(): Promise<UserEntity[]> {
		return await this.userRepository.find().catch(() => {
			throw new NotFoundException('Woops');
		});
	}

	public async selectOne(email: UserEntity['email']): Promise<UserEntity> {
		const options = { where: { email } };
		return await this.userRepository.findOneOrFail(options).catch(() => {
			throw new NotFoundException('User not found');
		});
	}

	public async updateOne(
		user: UserEntity,
		_user: UserEntity,
	): Promise<UserEntity> {
		const mergeUser = this.userRepository.merge(user, _user);
		return await this.userRepository.save(mergeUser).catch(() => {
			throw new NotFoundException('User not found');
		});
	}

	public async deleteOne(id: UserEntity['id']): Promise<DeleteResult> {
		return await this.userRepository.delete(id).catch(() => {
			throw new NotFoundException('User not found');
		});
	}
}
