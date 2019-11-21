import { ApiCreatedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { PagesService } from './pages.service';
import { PagesEntity } from './pages.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/pages}
 * @param  'pages' [description]
 * @return         [description]
 */
@ApiTags('pages')
@Controller('pages')
export class PagesController {
	/**
	 * [constructor description]
	 * @param readonlypagesService [description]
	 */
	constructor(private readonly pagesService: PagesService) {}

	/**
	 * [createMultiple description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async createMultiple(@Body() data: PagesEntity): Promise<PagesEntity> {
		return await this.pagesService.createOne(data);
	}

	/**
	 * [selectAll description]
	 * @return [description]
	 */
	@Get()
	@ApiCreatedResponse({ type: [PagesEntity] })
	public async selectAll(): Promise<PagesEntity[]> {
		return await this.pagesService.selectAll();
	}

	/**
	 * [updateOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Patch()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async updateOne(@Body() data: PagesEntity): Promise<PagesEntity> {
		const page = await this.pagesService.selectOne(data.id);
		return await this.pagesService.updateOne(page, data);
	}

	/**
	 * [deleteOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	public async deleteOne(@Body() data: PagesEntity): Promise<DeleteResult> {
		return await this.pagesService.deleteOne(data);
	}
}
