import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Post, Get, Patch, Delete, Body, Query } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { User } from '../../common/decorators';
import { ID } from '../../common/dto';

import { UserRequest } from './dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/user}
 */
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
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
	@ApiCreatedResponse({ type: UserEntity })
	public async createOne(@Body() data: UserRequest): Promise<UserEntity> {
		return await this.userService.createOne(data);
	}

	/**
	 * [selectAll description]
	 * @param  @User( [description]
	 * @return        [description]
	 */
	@Get()
	@ApiCreatedResponse({ type: [UserEntity] })
	public async selectAll(@Query() filter: ID): Promise<UserEntity[]> {
		return await this.userService.selectAll(filter);
	}

	/**
	 * [updateOne description]
	 * @param  @User( [description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Patch()
	@ApiCreatedResponse({ type: UserEntity })
	public async updateOne(
		@User() { id }: UserEntity,
		@Body() data: UserRequest,
	): Promise<UserEntity> {
		await this.userService.updateOne(id, data);
		return await this.userService.selectOne({ id });
	}

	/**
	 * [deleteOne description]
	 * @param  @User( [description]
	 * @return        [description]
	 */
	@Delete()
	public async deleteOne(@User() data: UserEntity): Promise<DeleteResult> {
		return await this.userService.deleteOne(data.id);
	}
}
