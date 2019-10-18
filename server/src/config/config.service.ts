import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';

import { EnvConfig } from './interfaces/envConfig.interface';

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig;

	constructor() {
		this.envConfig = {
			...process.env,
			...parse(readFileSync(`.env.${process.env.NODE_ENV}`)),
		};
	}

	get(key: string): any {
		const variable = this.envConfig[key];

		if (this.envConfig[key] === undefined) {
			throw TypeError(`The ${key} cannot be undefined`);
		}

		if (/true|false/.test(variable)) {
			return Boolean(variable);
		}

		if (!Number.isNaN(+variable)) {
			return +variable;
		}

		return this.envConfig[key];
	}
}
