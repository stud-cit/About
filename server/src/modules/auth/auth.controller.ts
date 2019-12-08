import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, Body, Post } from '@nestjs/common';

import { UserRequest } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

import { JWTRequest } from './dto/token.dto';
import { AuthService } from './auth.service';

/**
 * [Controller description]
 * [API]{@link /api/#/auth}
 * @param  'auth' [description]
 * @return        [description]
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
	/**
	 * [constructor description]
	 * @param authService [description]
	 * @param userService [description]
	 */
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	/**
	 * [create description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiCreatedResponse({ type: JWTRequest })
	public async create(@Body() data: UserRequest): Promise<JWTRequest> {
		const users = await this.userService.selectAll();
		if (users.length) {
			const user = await this.authService.validateUser(data);
			await this.authService.compareHash(user, data);
			return await this.authService.createToken(user);
		} else {
			const user = await this.userService.createOne(data);
			return await this.authService.createToken(user);
		}
	}
}
