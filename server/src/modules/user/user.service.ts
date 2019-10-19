import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { UserRequest } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	public async createOne(user: UserRequest): Promise<UserEntity> {
		return await this.userRepository.save(user);
	}

	public async selectAll(): Promise<UserEntity[]> {
		return await this.userRepository.find();
	}

	public async selectOne(user: UserRequest): Promise<UserEntity> {
		return await this.userRepository.findOneOrFail({
			where: {
				email: user.email,
			},
		});
	}

	public async updateOne(
		user: UserEntity,
		_user: UserRequest,
	): Promise<UserEntity> {
		this.userRepository.merge(user, _user);
		return await this.userRepository.save(user);
	}

	public async deleteOne(user: UserEntity): Promise<DeleteResult> {
		return await this.userRepository.delete(user.email);
	}
}
