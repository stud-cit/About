import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';

import { Config } from './interfaces/config.interface';

@Injectable()
export class ConfigService {
	private readonly config: Config;

	constructor() {
		this.config = {
			...process.env,
			...parse(readFileSync(`.env.${process.env.NODE_ENV}`)),
		};
	}

	get(key: string): any {
		const variable = this.config[key];

		if (this.config[key] === undefined) {
			throw TypeError(`The ${key} cannot be undefined`);
		}

		if (/true|false/.test(variable)) {
			return Boolean(variable);
		}

		if (!Number.isNaN(+variable)) {
			return +variable;
		}

		return this.config[key];
	}
}
