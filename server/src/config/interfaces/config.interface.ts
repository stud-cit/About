/**
 * [description]
 */
export interface Config {
	[key: string]: string | undefined;
}

/**
 * [Mode description]
 */
export type Mode = 'production' | 'development' | 'test';
