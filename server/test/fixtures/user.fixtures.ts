import { internet } from 'faker';

import { UserRequest } from '../../src/modules/user/dto/user.dto';

export class User implements UserRequest {
	constructor(
		readonly email: string = internet.email(),
		readonly password: string = internet.password(),
	) {}
}
