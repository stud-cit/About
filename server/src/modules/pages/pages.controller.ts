import { ApiUseTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PagesService } from './pages.service';
import { PagesEntity } from './pages.entity';

@ApiUseTags('pages')
@Controller('pages')
export class PagesController {
	constructor(private readonly pagesService: PagesService) {}

	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async createMultiple(@Body() data: PagesEntity): Promise<PagesEntity> {
		return await this.pagesService.createOne(data);
	}

	@Get()
	@ApiCreatedResponse({ type: [PagesEntity] })
	public async selectAll(): Promise<PagesEntity[]> {
		return await this.pagesService.selectAll();
	}

	@Patch()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async updateOne(@Body() data: PagesEntity): Promise<PagesEntity> {
		const page = await this.pagesService.selectOne(data.id);
		return await this.pagesService.updateOne(page, data);
	}

	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	public async deleteOne(@Body() data: [PagesEntity['id']]): Promise<any> {
		return await this.pagesService.deleteMultiple(data);
	}
}
