/**
 * [Config description]
 */
export type Config = {
	[key: string]: string | undefined;
};

/**
 * [ConfigMode description]
 */
export type ConfigMode = 'production' | 'development' | 'test';

/**
 * [ConfigValue description]
 */
export type ConfigValue = any;
