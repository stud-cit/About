import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

/**
 * [UserRequest description]
 * @return        [description]
 */
export class UserRequest {
	/**
	 * [email description]
	 */
	@IsEmail()
	@MaxLength(255)
	@ApiProperty({
		maxLength: 255,
		uniqueItems: true,
		example: 'example@ex.com',
	})
	public readonly email: string;

	/**
	 * [password description]
	 */
	@MinLength(8)
	@MaxLength(255)
	@ApiProperty({
		minLength: 8,
		maxLength: 255,
		example: 'examplepass',
	})
	public readonly password: string;
}
