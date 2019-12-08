import { internet, lorem } from 'faker';

import { PageRequest } from '../../src/modules/pages/dto/pages.dto';

export class Pages implements PageRequest {
	constructor(
		readonly title: string = lorem.words(3),
		readonly description: string = lorem.words(10),
		readonly cover: string = internet.avatar(),
	) {}
}
