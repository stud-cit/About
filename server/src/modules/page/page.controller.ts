import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Post, Get, Patch, Delete, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { I18nInterceptor } from '../../common/interceptors';
import { ID } from '../../common/dto';

import { PageRequest, PageFilter } from './dto';
import { PageService } from './page.service';
import { PageEntity } from './page.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/page}
 */
@ApiTags('page')
@Controller('page')
export class PageController {
	/**
	 * [constructor description]
	 * @param pageService [description]
	 */
	constructor(private readonly pageService: PageService) {}

	/**
	 * [createOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PageEntity })
	public async createOne(@Body() data: PageRequest): Promise<PageEntity> {
		return await this.pageService.createOne(data);
	}

	/**
	 * [selectAll description]
	 * @param  @Query( [description]
	 * @return         [description]
	 */
	@Get()
	@UseInterceptors(new I18nInterceptor())
	@ApiCreatedResponse({ type: [PageEntity] })
	public async selectAll(@Query() filter: PageFilter): Promise<PageEntity[]> {
		console.log(filter);
		return await this.pageService.selectAll(filter);
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
	@ApiCreatedResponse({ type: PageEntity })
	public async updateOne(
		@Query() { id }: ID,
		@Body() data: PageRequest,
	): Promise<PageEntity> {
		await this.pageService.updateOne(id, data);
		return await this.pageService.selectOne({ id });
	}

	/**
	 * [deleteOne description]
	 * @param  @Query( [description]
	 * @return        [description]
	 */
	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: PageEntity })
	public async deleteOne(@Query() { id }: ID): Promise<DeleteResult> {
		return await this.pageService.deleteOne(id);
	}
}
