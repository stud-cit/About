import { ConflictException, NotFoundException } from '@nestjs/common';
import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

import { PagesService } from './pages.service';
import { PagesEntity } from './pages.entity';
import { PageRequest } from './dto/pages.dto';

@ApiUseTags('pages')
@Controller('pages')
export class PagesController {
	constructor(private readonly pagesService: PagesService) {}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async createMultiple(
		@Body() payload: PageRequest,
	): Promise<PagesEntity> {
		return await this.pagesService.createOne(payload).catch(() => {
			throw new ConflictException(`Page already exists`);
		});
	}

	@Get()
	@ApiCreatedResponse({ type: [PagesEntity] })
	public async selectAll(): Promise<PagesEntity[]> {
		return await this.pagesService.selectAll().catch(() => {
			throw new NotFoundException('Pages not found');
		});
	}

	@Patch()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async updateOne(@Body() payload: PagesEntity): Promise<PagesEntity> {
		const page = await this.pagesService.selectOne(payload.id);
		return await this.pagesService.updateOne(page, payload).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}

	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	public async deleteOne(@Body() payload: number[]): Promise<any> {
		return await this.pagesService.deleteMultiple(payload).catch(() => {
			throw new NotFoundException('Page not found');
		});
	}
}
