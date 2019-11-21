import { ApiUseTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { User } from '../../common/decorators/user.decorator';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/user}
 * @param  'user' [description]
 * @return        [description]
 */
@ApiUseTags('user')
@Controller('user')
export class UserController {
	/**
	 * [constructor description]
	 * @param readonlyuserService [description]
	 */
	constructor(private readonly userService: UserService) {}

	/**
	 * [createRoot description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	public async createRoot(@Body() data: UserEntity): Promise<UserEntity> {
		const users = await this.userService.selectAll();
		if (!users.length) return await this.createOne(data);
		return;
	}

	/**
	 * [createOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post('invite')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async createOne(@Body() data: UserEntity): Promise<UserEntity> {
		return await this.userService.createOne(data);
	}

	/**
	 * [selectOne description]
	 * @param  @User( [description]
	 * @return        [description]
	 */
	@Get()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async selectOne(@User() data: UserEntity): Promise<UserEntity> {
		return data;
	}

	/**
	 * [updateOne description]
	 * @param  @User( [description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Patch()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async updateOne(
		@User() user: UserEntity,
		@Body() data: UserEntity,
	): Promise<UserEntity> {
		return await this.userService.updateOne(user, data);
	}

	/**
	 * [deleteOne description]
	 * @param  @User( [description]
	 * @return        [description]
	 */
	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	public async deleteOne(@User() data: UserEntity): Promise<DeleteResult> {
		return await this.userService.deleteOne(data.id);
	}
}
