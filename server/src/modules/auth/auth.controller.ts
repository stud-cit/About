import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, UseGuards, Post, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../../common/decorators';

import { UserRequest, UserService, UserEntity } from '../user';

import { JWTRequest } from './dto/token.dto';
import { AuthService } from './auth.service';

/**
 * [Controller description]
 * [API]{@link /api/#/auth}
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
		const users = await this.userService.selectAll(null);
		if (users.length) {
			const user = await this.authService.validateUser(data);
			await this.authService.compareHash(user, data);
			return await this.authService.createToken(user);
		}
		const user = await this.userService.createOne(data);
		return await this.authService.createToken(user);
	}

	/**
	 * [updateOne description]
	 * @param  @User( [description]
	 * @return        [description]
	 */
	@Get()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async updateOne(@User() user: UserEntity): Promise<UserEntity> {
		return user;
	}
}
