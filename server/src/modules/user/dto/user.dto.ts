import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserRequest {
	@IsEmail()
	@MaxLength(255)
	@ApiModelProperty({ example: 'example@ex.com' })
	public readonly email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(255)
	@ApiModelProperty({ example: 'qwerty1234' })
	public readonly password: string;
}
