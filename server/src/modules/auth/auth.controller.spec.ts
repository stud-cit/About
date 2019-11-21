import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { ConfigService } from '../../config/config.service';
import { JwtStrategy } from './strateges/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
	let userRepository: Repository<UserEntity>;
	let authController: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
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
		authController = module.get<AuthController>(AuthController);
		userRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity),
		);
	});

	it('should be defined controller', () => {
		expect(authController).toBeDefined();
	});

	it('should be defined repository', () => {
		expect(userRepository).toBeDefined();
	});

	it('should be defined service', () => {
		expect(authService).toBeDefined();
	});

	describe('create', () => {
		it('should be return create token', () => {});
		it('should be return exception', () => {});
	});
});
