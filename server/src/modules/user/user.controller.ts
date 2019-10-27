import { ConflictException, NotFoundException } from '@nestjs/common';
import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';

import { UserRequest } from './dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@ApiUseTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	public async createRoot(@Body() payload: UserRequest): Promise<UserEntity> {
		const users = await this.userService.selectAll();
		if (users.length) throw new ConflictException(`User already exists`);
		return await this.createOne(payload);
	}

	@Post('invite')
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async createOne(@Body() payload: UserRequest): Promise<UserEntity> {
		return await this.userService.createOne(payload).catch(() => {
			throw new ConflictException(`User already exists`);
		});
	}

	@Get()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async selectOne(@User() payload: UserEntity): Promise<UserEntity> {
		return payload;
	}

	@Patch()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: UserEntity })
	public async updateOne(
		@User() user: UserEntity,
		@Body() payload: UserRequest,
	): Promise<UserEntity> {
		return await this.userService.updateOne(user, payload).catch(() => {
			throw new NotFoundException('User not found');
		});
	}

	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	public async deleteOne(@User() payload: UserEntity): Promise<any> {
		return await this.userService.deleteOne(payload).catch(() => {
			throw new NotFoundException('User not found');
		});
	}
}
