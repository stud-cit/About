import { Post, Get, Patch, Delete, Body, Query } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { ContentRequestId, ContentRequest } from './dto/content.dto';
import { ContentService } from './content.service';
import { ContentEntity } from './content.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/content}
 * @param  'content' [description]
 * @return         [description]
 */
@ApiTags('content')
@Controller('content')
export class ContentController {
	/**
	 * [constructor description]
	 * @param contentService [description]
	 */
	constructor(private readonly contentService: ContentService) {}

	/**
	 * [createOne description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiCreatedResponse({ type: ContentEntity })
	public async createOne(@Body() data: ContentRequest): Promise<ContentEntity> {
		return await this.contentService.createOne(data);
	}

	/**
	 * [selectAll description]
	 * @return [description]
	 */
	@Get()
	@ApiCreatedResponse({ type: [ContentEntity] })
	public async selectAll(): Promise<ContentEntity[]> {
		return await this.contentService.selectAll();
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
		@Query() { id }: ContentRequestId,
		@Body() data: ContentRequest,
	): Promise<ContentEntity> {
		await this.contentService.updateOne(id, data);
		return await this.contentService.selectOne({ id });
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
	public async deleteOne(@Query() { id }: ContentRequestId): Promise<
		ContentEntity
	> {
		const content = await this.contentService.selectOne({ id });
		return await this.contentService.deleteOne(id).then(() => content);
	}
}
