import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../src/database/database.module';
import { ConfigModule } from '../../src/config/config.module';

import { UserModule } from '../../src/modules/user/user.module';
import { AuthModule } from '../../src/modules/auth/auth.module';

import { Request } from '../helpers/request.helpers';
import { User } from '../fixtures/user.fixtures';

describe('Auth flow (api/auth):', () => {
	let app: INestApplication;
	let majorRequest: Request<User>;
	let minorRequest: Request<User>;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserModule, AuthModule, DatabaseModule, ConfigModule],
		}).compile();

		app = await module
			.createNestApplication()
			.useGlobalPipes(new ValidationPipe())
			.init();

		majorRequest = new Request(app, User);
		minorRequest = new Request(app, User);
	});

	describe('[POST]: Create', () => {
		it('[201]: Create', async () => {
			await majorRequest.setPasport('/auth', 201);
			await minorRequest.setPasport('/auth', 401);
		});

		it('[400]: Bad-Request', () => {
			const { email, password } = majorRequest.getUser();
			majorRequest.post('/auth', 400, { password, email: '' });
			majorRequest.post('/auth', 400, { email, password: '' });
			minorRequest.post('/auth', 400, { password, email: '' });
			minorRequest.post('/auth', 400, { email, password: '' });
		});

		it('[401]: Unauthorized', async () => {
			const { email, password } = majorRequest.getUser();
			majorRequest.post('/auth', 401, { email, password: '12345678' });
			majorRequest.post('/auth', 401, { password, email: 'ab@cd.ef' });
			minorRequest.post('/auth', 401, { email, password: '12345678' });
			minorRequest.post('/auth', 401, { password, email: 'ab@cd.ef' });
			await minorRequest.setPasport('/auth', 401);
		});
	});

	afterAll(async () => await app.close());
});
