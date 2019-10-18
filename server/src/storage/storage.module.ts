import { Module, Global } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UnsupportedMediaTypeException } from '@nestjs/common';

import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 } from 'uuid';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { AllowedTypes } from './interfaces/types.interface';
import { ConfigService } from '../config/config.service';

@Global()
@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory: (configService: ConfigService): MulterOptions => ({
				limits: {
					fileSize: configService.get('STORE_FILE_SIZE') * 1024 ** 2,
				},
				fileFilter: (_req, file, cb) => {
					if (AllowedTypes[file.mimetype]) return cb(null, true);
					return cb(new UnsupportedMediaTypeException(), false);
				},
				storage: diskStorage({
					destination: configService.get('STORE_DEST'),
					filename: (_req, file, cb) => {
						return cb(null, join(v4()) + extname(file.originalname));
					},
				}),
			}),
			inject: [ConfigService],
		}),
	],
})
export class StorageModule {}
