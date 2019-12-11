import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app/app.module';

import { Request } from '../helpers/request.helpers';
import { User } from '../fixtures/user.fixtures';

describe('Auth flow (api/auth):', () => {
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
			await minorRequest.setPasport('/auth', 401);
			return;
		});

		it('[400]: Bad-Request', async () => {
			const { email, password } = majorRequest.getUser();
			await majorRequest.post('/auth', 400, { password, email: '' });
			await majorRequest.post('/auth', 400, { email, password: '' });
			await minorRequest.post('/auth', 400, { password, email: '' });
			await minorRequest.post('/auth', 400, { email, password: '' });
			return;
		});

		it('[401]: Unauthorized', async () => {
			const { email, password } = majorRequest.getUser();
			await majorRequest.post('/auth', 401, { email, password: '12345678' });
			await majorRequest.post('/auth', 401, { password, email: 'ab@cd.ef' });
			await minorRequest.post('/auth', 401, { email, password: '12345678' });
			await minorRequest.post('/auth', 401, { password, email: 'ab@cd.ef' });
			await minorRequest.setPasport('/auth', 401);
			return;
		});
	});

	afterAll(async () => await app.close());
});
