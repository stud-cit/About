import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiTags,
	ApiBearerAuth,
	ApiConsumes,
	ApiBody,
	ApiCreatedResponse,
} from '@nestjs/swagger';

import { StorageRequest } from './dto/storage.dto';
import { StorageService } from './storage.service';
import { StorageEntity } from './storage.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/storage}
 * @param  'storage' [description]
 * @return        [description]
 */
@ApiTags('storage')
@ApiBearerAuth()
@Controller('storage')
@UseGuards(AuthGuard('jwt'))
export class StorageController {
	/**
	 * [constructor description]
	 * @param storageService [description]
	 */
	constructor(private readonly storageService: StorageService) {}

	/**
	 * [createOne description]
	 * @param  @UploadedFile( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiBody({ type: StorageRequest })
	@ApiConsumes('multipart/form-data')
	@ApiCreatedResponse({ type: StorageEntity })
	@UseInterceptors(FileInterceptor('file'))
	public async createOne(
		@UploadedFile() file: Express.Multer.File,
	): Promise<StorageEntity> {
		const [type] = file.mimetype.split('/');
		return await this.storageService.createOne({ [type]: file.filename });
	}
}
