import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../src/database/database.module';
import { ConfigModule } from '../../src/config/config.module';

import { UserModule } from '../../src/modules/user/user.module';
import { AuthModule } from '../../src/modules/auth/auth.module';

import { Request } from '../helpers/request.helpers';
import { User } from '../fixtures/user.fixtures';

describe('User flow (api/user):', () => {
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
			await majorRequest.postAuth('/user', 201, minorRequest.getUser());
			await minorRequest.setPasport('/auth', 201);
		});

		it('[400]: Bad-Request', () => {
			const { email, password } = majorRequest.getUser();
			majorRequest.postAuth('/user', 400, { password, email: '' });
			majorRequest.postAuth('/user', 400, { email, password: '' });
			minorRequest.postAuth('/user', 400, { password, email: '' });
			minorRequest.postAuth('/user', 400, { email, password: '' });
		});

		it('[401]: Unauthorized', () => {
			majorRequest.post('/user', 401);
			minorRequest.post('/user', 401);
		});

		it('[409]: Conflict', () => {
			majorRequest.postAuth('/user', 409, minorRequest.getUser());
			minorRequest.postAuth('/user', 409, majorRequest.getUser());
		});
	});

	describe('[GET]: Select self', () => {
		it('[200]: Ok', () => {
			majorRequest.getAuth('/user', 200);
			minorRequest.getAuth('/user', 200);
		});

		it('[401]: Unauthorized', () => {
			majorRequest.get('/user', 401);
			minorRequest.get('/user', 401);
		});
	});

	describe('[PATH]: Update', () => {
		it('[200]: OK', () => {
			majorRequest.setUser({ password: '12345678' });
			minorRequest.setUser({ password: '87654321' });
			majorRequest.patchAuth('/user', 200, majorRequest.getUser());
			minorRequest.patchAuth('/user', 200, minorRequest.getUser());
		});

		it('[400]: Bad-Request', () => {
			const { email, password } = majorRequest.getUser();
			majorRequest.patchAuth('/user', 400, { password, email: '' });
			majorRequest.patchAuth('/user', 400, { email, password: '' });
			minorRequest.patchAuth('/user', 400, { password, email: '' });
			minorRequest.patchAuth('/user', 400, { email, password: '' });
		});

		it('[401]: Unauthorized', () => {
			majorRequest.patch('/user', 401);
			minorRequest.patch('/user', 401);
		});

		it('[409]: Conflict', () => {
			const majorUser = majorRequest.getUser();
			const minorUser = minorRequest.getUser();
			majorRequest.patchAuth('/user', 409, minorUser);
			minorRequest.patchAuth('/user', 409, majorUser);
		});
	});

	describe('[DELETE]: Delete', () => {
		it('[200]: OK', () => {
			majorRequest.deleteAuth('/user', 200);
			minorRequest.deleteAuth('/user', 200);
		});

		it('[401]: Unauthorized', () => {
			majorRequest.delete('/user', 401);
			minorRequest.delete('/user', 401);
			majorRequest.deleteAuth('/user', 401);
			minorRequest.deleteAuth('/user', 401);
		});
	});

	afterAll(async () => await app.close());
});
