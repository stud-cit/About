import { readFileSync } from 'fs';
import { parse } from 'dotenv';

import { Config } from './interfaces/config.interface';

export class ConfigService {
	getSetting(arg0: string): string | number | undefined {
		throw new Error('Method not implemented.');
	}
	getSetting(arg0: string): string | number | undefined {
		throw new Error('Method not implemented.');
	}
	private readonly config: Config;

	constructor() {
		this.config = {
			...process.env,
			...parse(readFileSync(`.env.${process.env.NODE_ENV}`)),
		};
	}

	public get(key: string): any {
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
