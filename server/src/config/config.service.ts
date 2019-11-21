import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';

import { EnvConfig } from './interfaces/envConfig.interface';

/**
 * [Injectable description]
 * @return [description]
 */
@Injectable()
export class ConfigService {
	/**
	 * [config description]
	 */
	private readonly config: Config;

	/**
	 * [constructor description]
	 */
	constructor() {
		if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
		this.config = {
			...process.env,
			...parse(readFileSync(`.env.${process.env.NODE_ENV}`)),
		};
	}

	/**
	 * [get description]
	 * @param  key [description]
	 * @return     [description]
	 */
	public get(key: string): any {
		const value = this.config[key];
		if (/true|false/.test(value)) return Boolean(value);
		if (!Number.isNaN(+value)) return +value;
		if (this.config[key] === undefined)
			throw TypeError(`The ${key} cannot be undefined`);
		return this.config[key];
	}
}
