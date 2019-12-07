import { internet } from 'faker';

export class User {
	constructor(
		readonly email: string = internet.email(),
		readonly password: string = internet.password(),
	) {}
}
