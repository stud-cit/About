import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { StorageModule } from '../storage';
import { ConfigModule } from '../config';

import { ContentModule } from '../modules/content';
import { PageModule } from '../modules/page';
import { AuthModule } from '../modules/auth';
import { UserModule } from '../modules/user';

@Module({
	imports: [
		DatabaseModule,
		StorageModule,
		ConfigModule,
		ContentModule,
		PageModule,
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
