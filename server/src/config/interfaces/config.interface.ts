/**
 * [Config description]
 */
export type Config = {
	[key: string]: string | undefined;
};

/**
 * [Mode description]
 */
export type ConfigMode = 'production' | 'development' | 'test';

/**
 * [Key description]
 */
export type ConfigValue = any;
