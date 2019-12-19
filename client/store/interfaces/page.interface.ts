import { CoverModel } from './cover.interface';

export interface PageModel {
	readonly id: string;
	readonly link: string;
	readonly name: string;
	readonly title: string;
	readonly description: string;
	readonly cover: CoverModel;
}
