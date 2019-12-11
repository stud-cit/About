import { Post, Get, Patch, Delete, Body, Query } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { PagesRequest } from './dto/pages.dto';
import { PagesService } from './pages.service';
import { PagesEntity } from './pages.entity';
import { ID } from '../../common/dto/id.dto';

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
	 * @param pagesService [description]
	 */
	constructor(private readonly pagesService: PagesService) {}

	/**
	 * [createOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async createOne(@Body() data: PagesRequest): Promise<PagesEntity> {
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
	 * @param  @Param( [description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Patch()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async updateOne(
		@Query() { id }: ID,
		@Body() data: PagesRequest,
	): Promise<PagesEntity> {
		await this.pagesService.updateOne(id, data);
		return await this.pagesService.selectOne({ id });
	}

	/**
	 * [deleteOne description]
	 * @param  @Query( [description]
	 * @return        [description]
	 */
	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PagesEntity })
	public async deleteOne(@Query() { id }: ID): Promise<PagesEntity> {
		const pages = await this.pagesService.selectOne({ id });
		return await this.pagesService.deleteOne(id).then(() => pages);
	}
}
