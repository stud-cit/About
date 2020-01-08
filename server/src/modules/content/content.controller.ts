import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Post, Get, Patch, Delete, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { StorageService } from '../../storage';

import { I18nInterceptor } from '../../common/interceptors';
import { ID } from '../../common/dto';

import { ContentRequest, ContentFilter } from './dto';
import { ContentService } from './content.service';
import { ContentEntity } from './content.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/content}
 */
@ApiTags('content')
@Controller('content')
export class ContentController {
	/**
	 * [constructor description]
	 * @param storageService [description]
	 * @param contentService [description]
	 */
	constructor(
		private readonly storageService: StorageService,
		private readonly contentService: ContentService,
	) {}

	/**
	 * [createOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: ContentEntity })
	public async createOne(
		@Query() page: ID,
		@Body() data: ContentRequest,
	): Promise<ContentEntity> {
		return await this.contentService.createOne({ ...data, page });
	}

	/**
	 * [selectAll description]
	 * @param  @Query( [description]
	 * @return         [description]
	 */
	@Get()
	@UseInterceptors(new I18nInterceptor())
	@ApiCreatedResponse({ type: [ContentEntity] })
	public async selectAll(
		@Query() filter: ContentFilter,
	): Promise<ContentEntity[]> {
		return await this.contentService.selectAll(filter);
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
	@ApiCreatedResponse({ type: ContentEntity })
	public async updateOne(
		@Query() { id }: ID,
		@Body() { cover, ..._data }: ContentRequest,
	): Promise<ContentEntity> {
		const data = await this.contentService.selectOne({ id });
		if (cover) cover = await this.storageService.updateOne(data.cover, cover);
		return await this.contentService.updateOne(data, { ..._data, cover });
	}

	/**
	 * [deleteOne description]
	 * @param  @Query( [description]
	 * @return        [description]
	 */
	@Delete()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: ContentEntity })
	public async deleteOne(@Query() { id }: ID): Promise<DeleteResult> {
		return await this.contentService.deleteOne(id);
	}
}
