import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadedFile, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiTags,
	ApiBody,
	ApiConsumes,
	ApiBearerAuth,
	ApiCreatedResponse,
} from '@nestjs/swagger';

import { StorageRequest } from './dto';
import { StorageService } from './storage.service';
import { StorageEntity } from './storage.entity';

/**
 * [Controller description]
 * [API]{@link /api/#/storage}
 */
@ApiBearerAuth()
@ApiTags('storage')
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
	): Promise<any> {
		const [type] = file.mimetype.split('/');
		return { [type]: file.filename };
	}
}
