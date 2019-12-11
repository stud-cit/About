import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app/app.module';

import { Request } from '../helpers/request.helpers';

import { Pages } from '../fixtures/pages.fixtures';
import { User } from '../fixtures/user.fixtures';

describe('Content flow (api/pages):', () => {
	let app: INestApplication;
	let majorRequest: Request<User>;
	let pages: Pages;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = await module
			.createNestApplication()
			.useGlobalPipes(new ValidationPipe())
			.init();

		majorRequest = new Request(app, User);
	});

	describe('[POST]: Create', () => {
		it('[201]: Create', async () => {
			await majorRequest.setPasport('/auth', 201);
			await majorRequest.postAuth('/pages', 201, new Pages());
			return;
		});

		it('[400]: Bad-Request', async () => {
			await majorRequest.postAuth('/pages', 400, { ...pages, title: 0 });
			await majorRequest.postAuth('/pages', 400, { ...pages, cover: 0 });
			return;
		});

		it('[401]: Unauthorized', async () => {
			return await majorRequest.post('/pages', 401);
		});

		it('[409]: Conflict', async () => {
			const page = 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9';
			return await majorRequest.postAuth('/pages', 409, { ...pages, page });
		});
	});

	describe('[GET]: Select self', () => {
		it('[200]: Ok', async () => {
			await majorRequest.getAuth('/pages', 200);
			await majorRequest.get('/pages', 200);
			return;
		});
	});

	describe('[PATH]: Update', () => {
		it('[200]: OK', () => {
			const { cover, description } = new Pages();
			majorRequest.patchAuth('/pages', 200, { cover, description });
		});

		it('[400]: Bad-Request', () => {
			const { email, password } = majorRequest.getUser();
			majorRequest.patchAuth('/pages', 400, { password, email: '' });
			majorRequest.patchAuth('/pages', 400, { email, password: '' });
		});

		it('[401]: Unauthorized', async () => {
			return await majorRequest.patch('/pages', 401);
		});

		it('[409]: Conflict', () => {
			const { email, password } = majorRequest.getUser();
			majorRequest.patchAuth('/pages', 400, { password, email: '' });
			majorRequest.patchAuth('/pages', 400, { email, password: '' });
		});
	});

	describe('[DELETE]: Delete', () => {
		it('[200]: OK', () => {
			majorRequest.deleteAuth('/pages', 200);
		});

		it('[401]: Unauthorized', async () => {
			majorRequest.delete('/pages', 401);
			majorRequest.deleteAuth('/pages', 401);
		});
	});

	afterAll(async () => await app.close());
});
