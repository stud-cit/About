import { ApiUseTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/common/decorators/user.decorator';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@ApiUseTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	public async createRoot(@Body() data: UserEntity): Promise<UserEntity> {
		const users = await this.userService.selectAll();
		if (!users.length) return await this.createOne(data);
		return;
	}

	@Post('invite')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async createOne(@Body() data: UserEntity): Promise<UserEntity> {
		return await this.userService.createOne(data);
	}

	@Get()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async selectOne(@User() data: UserEntity): Promise<UserEntity> {
		return data;
	}

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

	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	public async deleteOne(@User() data: UserEntity): Promise<any> {
		return await this.userService.deleteOne(data.id);
	}
}
