import { UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { Module, Global } from '@nestjs/common';

import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

import { AllowedTypes } from './interfaces/types.interface';
import { ConfigService } from '../config/config.service';

@Global()
@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				limits: {
					fileSize: configService.get('STORE_FILE_SIZE') * 1024 ** 2,
				},
				fileFilter: (_req, file, cb) => {
					if (AllowedTypes[file.mimetype]) return cb(null, true);
					return cb(new UnsupportedMediaTypeException(), false);
				},
				storage: diskStorage({
					destination: join(
						configService.get('PWD'),
						configService.get('STORE_DEST'),
					),
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
