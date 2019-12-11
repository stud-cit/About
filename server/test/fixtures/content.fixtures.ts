import { internet, lorem, address } from 'faker';

import { ContentRequest } from '../../src/modules/content/dto/content.dto';

export class Content implements ContentRequest {
	constructor(
		readonly page: string,
		readonly lang: string = address.countryCode(),
		readonly title: string = lorem.words(3),
		readonly description: string = lorem.words(10),
		readonly cover: string = internet.avatar(),
	) {}
}
