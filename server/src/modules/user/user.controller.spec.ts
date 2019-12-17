import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

describe('User Controller', () => {
	let userRepository: Repository<UserEntity>;
	let userController: UserController;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: Repository,
				},
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userController = module.get<UserController>(UserController);
		userRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity),
		);
	});

	it('should be defined controller', () => {
		expect(userController).toBeDefined();
	});

	it('should be defined repository', () => {
		expect(userRepository).toBeDefined();
	});

	it('should be defined service', () => {
		expect(userService).toBeDefined();
	});

	describe('createOne', () => {
		it('should be return create user', () => {});
		it('should be return exception', () => {});
	});

	describe('selectAll', () => {
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
