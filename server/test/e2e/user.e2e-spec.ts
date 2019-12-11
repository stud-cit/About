import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app/app.module';

import { Request } from '../helpers/request.helpers';
import { User } from '../fixtures/user.fixtures';

describe('User flow (api/user):', () => {
	let app: INestApplication;
	let majorRequest: Request<User>;
	let minorRequest: Request<User>;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
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
			return;
		});

		it('[400]: Bad-Request', async () => {
			const { email, password } = majorRequest.getUser();
			await majorRequest.postAuth('/user', 400, { password, email: '' });
			await majorRequest.postAuth('/user', 400, { email, password: '' });
			await minorRequest.postAuth('/user', 400, { password, email: '' });
			await minorRequest.postAuth('/user', 400, { email, password: '' });
			return;
		});

		it('[401]: Unauthorized', async () => {
			await majorRequest.post('/user', 401);
			await minorRequest.post('/user', 401);
			return;
		});

		it('[409]: Conflict', async () => {
			await majorRequest.postAuth('/user', 409, minorRequest.getUser());
			await minorRequest.postAuth('/user', 409, majorRequest.getUser());
			return;
		});
	});

	describe('[GET]: Select self', () => {
		it('[200]: Ok', async () => {
			await majorRequest.getAuth('/user', 200);
			await minorRequest.getAuth('/user', 200);
			return;
		});

		it('[401]: Unauthorized', async () => {
			await majorRequest.get('/user', 401);
			await minorRequest.get('/user', 401);
			return;
		});
	});

	describe('[PATH]: Update', () => {
		it('[200]: OK', async () => {
			majorRequest.setUser({ password: '12345678' });
			minorRequest.setUser({ password: '87654321' });
			await majorRequest.patchAuth('/user', 200, majorRequest.getUser());
			await minorRequest.patchAuth('/user', 200, minorRequest.getUser());
			return;
		});

		it('[400]: Bad-Request', async () => {
			const { email, password } = majorRequest.getUser();
			await majorRequest.patchAuth('/user', 400, { password, email: '' });
			await majorRequest.patchAuth('/user', 400, { email, password: '' });
			await minorRequest.patchAuth('/user', 400, { password, email: '' });
			await minorRequest.patchAuth('/user', 400, { email, password: '' });
			return;
		});

		it('[401]: Unauthorized', async () => {
			await majorRequest.patch('/user', 401);
			await minorRequest.patch('/user', 401);
			return;
		});

		it('[409]: Conflict', async () => {
			const majorUser = majorRequest.getUser();
			const minorUser = minorRequest.getUser();
			await majorRequest.patchAuth('/user', 409, minorUser);
			await minorRequest.patchAuth('/user', 409, majorUser);
			return;
		});
	});

	describe('[DELETE]: Delete', () => {
		it('[200]: OK', async () => {
			await majorRequest.deleteAuth('/user', 200);
			await minorRequest.deleteAuth('/user', 200);
			return;
		});

		it('[401]: Unauthorized', async () => {
			await majorRequest.delete('/user', 401);
			await minorRequest.delete('/user', 401);
			await majorRequest.deleteAuth('/user', 401);
			await minorRequest.deleteAuth('/user', 401);
			return;
		});
	});

	afterAll(async () => await app.close());
});
