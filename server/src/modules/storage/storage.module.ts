import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { StorageEntity } from './storage.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([StorageEntity]),
		MulterModule.registerAsync({
			imports: [TypeOrmModule.forFeature([StorageEntity])],
			useClass: StorageService,
		}),
	],
	controllers: [StorageController],
	providers: [StorageService],
	exports: [StorageService],
})
export class StorageModule {}
