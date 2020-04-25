import { StorageEntity } from './cover.interface';

export interface PageEntity {
	/**
	 * [id description]
	 */
	readonly page_id: string;

	/**
	 * [lang description]
	 */
	readonly lang: string;

	/**
	 * [link description]
	 */
	readonly link: string;

	/**
	 * [name description]
	 */
	readonly name: string;

	/**
	 * [title description]
	 */
	readonly title: string;

	/**
	 * [description description]
	 */
	readonly description: string;

	/**
	 * [createAt description]
	 */
	readonly createAt: Date;

	/**
	 * [updateAt description]
	 */
	readonly updateAt: Date;

	/**
	 * [cover description]
	 */
	readonly cover: StorageEntity;
}
