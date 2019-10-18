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

	async createOne(user: UserRequest): Promise<UserEntity> {
		return await this.userRepository.save(user);
	}

	async selectAll(): Promise<UserEntity[]> {
		return await this.userRepository.find();
	}

	async selectOne(user: UserRequest): Promise<UserEntity> {
		return await this.userRepository.findOneOrFail({
			where: {
				email: user.email,
			},
		});
	}

	async updateOne(user: UserEntity, newUser: UserRequest): Promise<UserEntity> {
		this.userRepository.merge(user, newUser);
		return await this.userRepository.save(user);
	}

	async deleteOne(user: UserEntity): Promise<DeleteResult> {
		return await this.userRepository.delete(user.email);
	}
}
