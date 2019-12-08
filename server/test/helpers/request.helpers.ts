import { INestApplication } from '@nestjs/common';
import { SuperTest, Test } from 'supertest';

import * as request from 'supertest';

/**
 * [class description]
 * @return [description]
 */
export class PasportJWT {
	expiresIn: number;
	token: string;
}

/**
 * [class description]
 * @return [description]
 */
export class Request<T> {
	/**
	 * [passport description]
	 */
	private readonly server: SuperTest<any>;

	/**
	 * [passport description]
	 */
	private passport: PasportJWT;

	/**
	 * [passport description]
	 */
	private user: T;

	/**
	 * [constructor description]
	 * @param app [description]
	 * @param user [description]
	 */
	constructor(
		protected readonly app: INestApplication,
		protected readonly User: any,
	) {
		this.server = request(app.getHttpServer());
		this.passport = new PasportJWT();
		this.user = new User();
	}

	/**
	 * [getPasport description]
	 * @return [description]
	 */
	public getPasport(): PasportJWT {
		return this.passport;
	}

	/**
	 * [getUser description]
	 * @return [description]
	 */
	public getUser(): T {
		return this.user;
	}

	/**
	 * [setPasport description]
	 * @param  payload [description]
	 * @return         [description]
	 */
	public setPasport(controler: string, statusCode: number): Test {
		return this.server
			.post(controler)
			.send(this.user)
			.expect(statusCode)
			.then(({ body }) => (this.passport = body));
	}

	/**
	 * [setPasport description]
	 * @param  payload [description]
	 * @return         [description]
	 */
	public setUser(payload: Partial<T>): T {
		this.user = { ...this.user, ...payload };
		return this.user;
	}

	/**
	 * [post description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @param  payload    [description]
	 * @return            [description]
	 */
	public post(controler: string, statusCode: number, payload?: any): Test {
		return this.server
			.post(controler)
			.send(payload)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}

	/**
	 * [postAuth description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @param  payload    [description]
	 * @return            [description]
	 */
	public postAuth(controler: string, statusCode: number, payload?: any): Test {
		return this.server
			.post(controler)
			.send(payload)
			.set('Authorization', `Bearer ${this.passport.token}`)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}

	/**
	 * [get description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @return            [description]
	 */
	public get(controler: string, statusCode: number): Test {
		return this.server
			.get(controler)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}

	/**
	 * [getAuth description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @return            [description]
	 */
	public getAuth(controler: string, statusCode: number): Test {
		return this.server
			.get(controler)
			.set('Authorization', `Bearer ${this.passport.token}`)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}

	/**
	 * [patch description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @param  payload    [description]
	 * @return            [description]
	 */
	public patch(controler: string, statusCode: number, payload?: any): Test {
		return this.server
			.patch(controler)
			.send(payload)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}

	/**
	 * [patchAuth description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @param  payload    [description]
	 * @return            [description]
	 */
	public patchAuth(controler: string, statusCode: number, payload?: any): Test {
		return this.server
			.patch(controler)
			.send(payload)
			.set('Authorization', `Bearer ${this.passport.token}`)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}

	/**
	 * [delete description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @return            [description]
	 */
	public delete(controler: string, statusCode: number): Test {
		return this.server
			.delete(controler)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}

	/**
	 * [deleteAuth description]
	 * @param  controler  [description]
	 * @param  statusCode [description]
	 * @return            [description]
	 */
	public deleteAuth(controler: string, statusCode: number): Test {
		return this.server
			.delete(controler)
			.set('Authorization', `Bearer ${this.passport.token}`)
			.expect(statusCode)
			.expect('Content-Type', 'application/json; charset=utf-8');
	}
}
