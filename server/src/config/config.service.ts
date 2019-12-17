import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import { join } from 'path';

import { Config, ConfigMode, ConfigValue } from './interfaces/config.interface';

/**
 * [ConfigService description]
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
		this.config = {
			...process.env,
			...parse(readFileSync(`.env.${process.env.NODE_ENV}`)),
		};
	}

	/**
	 * [getDest description]
	 * @param  key      [description]
	 * @param  filename [description]
	 * @return          [description]
	 */
	public getDest(key: string, filename: string = ''): string {
		const variable = this.config[key];
		if (!variable) throw TypeError(`The ${key} cannot be undefined`);
		return join(this.config['PWD'], variable, filename);
	}

	/**
	 * [getMode description]
	 * @param  mode [description]
	 * @return      [description]
	 */
	public getMode(mode: ConfigMode): boolean {
		return this.config['NODE_ENV'] === mode;
	}

	/**
	 * [get description]
	 * @param  key [description]
	 * @return     [description]
	 */
	public get(key: string): ConfigValue {
		const variable = this.config[key];
		if (!variable) throw TypeError(`The ${key} cannot be undefined`);
		try {
			return JSON.parse(variable);
		} catch {
			return variable;
		}
	}
}
