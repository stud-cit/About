import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserRequest {
	@IsEmail()
	@ApiModelProperty({ example: 'example@google.com' })
	readonly email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(254)
	@ApiModelProperty({ example: 'qwerty1234' })
	readonly password: string;
}
