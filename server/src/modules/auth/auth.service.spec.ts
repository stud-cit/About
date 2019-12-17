import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { ConfigService } from '../../config';

import { JwtStrategy } from './strateges/jwt.strategy';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

describe('Auth Service', () => {
	let userRepository: Repository<UserEntity>;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				PassportModule.register({ defaultStrategy: 'jwt' }),
				JwtModule.register({
					secret: 'test',
					signOptions: {
						expiresIn: '3600',
					},
				}),
			],
			providers: [
				AuthService,
				UserService,
				JwtStrategy,
				ConfigService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: Repository,
				},
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity),
		);
	});

	it('should be defined repository', () => {
		expect(userRepository).toBeDefined();
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('createToken', () => {
		it('should be return create token', () => {});
		it('should be return exception', () => {});
	});

	describe('compareHash', () => {
		it('should be return select auth', async () => {});
		it('should be return exception', async () => {});
	});

	describe('validateUser', () => {
		it('should be return user', () => {});
		it('should be return exception', () => {});
	});
});
