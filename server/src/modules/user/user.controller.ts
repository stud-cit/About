import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, UseGuards, ConflictException } from '@nestjs/common';
import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { User } from '../../common/decorators/user.decorator';
import { UserRequest } from './dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/user}
 * @param  'user' [description]
 * @return        [description]
 */
@ApiTags('user')
@Controller('user')
export class UserController {
	/**
	 * [constructor description]
	 * @param userService [description]
	 */
	constructor(private readonly userService: UserService) {}

	/**
	 * [createOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async createOne(@Body() data: UserRequest): Promise<UserEntity> {
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
		@Body() data: UserRequest,
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
