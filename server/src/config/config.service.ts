import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';

import { Config } from './interfaces/config.interface';

@Injectable()
export class ConfigService {
	private readonly config: Config;

	constructor() {
		if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
		this.config = {
			...process.env,
			...parse(readFileSync(`.env.${process.env.NODE_ENV}`)),
		};
	}

	public get(key: string): any {
		const value = this.config[key];
		if (/true|false/.test(value)) return Boolean(value);
		if (!Number.isNaN(+value)) return +value;
		if (this.config[key] === undefined)
			throw TypeError(`The ${key} cannot be undefined`);
		return this.config[key];
	}
}
