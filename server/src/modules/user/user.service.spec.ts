import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

describe('User Service', () => {
	let userRepository: Repository<UserEntity>;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: Repository,
				},
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity),
		);
	});

	it('should be defined repository', () => {
		expect(userRepository).toBeDefined();
	});

	it('should be defined', () => {
		expect(userService).toBeDefined();
	});

	describe('createOne', () => {
		it('should be return create user', () => {});
		it('should be return exception', () => {});
	});

	describe('selectAll', () => {
		it('should be return select users', async () => {});
		it('should be return exception', async () => {});
	});

	describe('selectOne', () => {
		it('should be return select user', () => {});
		it('should be return exception', () => {});
	});

	describe('updateOne', () => {
		it('should be return update user', () => {});
		it('should be return exception', () => {});
	});

	describe('deleteOne', () => {
		it('should be return delete user', () => {});
		it('should be return exception', () => {});
	});
});
