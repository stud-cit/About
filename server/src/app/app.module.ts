import { Global, Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';
import { ConfigModule } from '../config/config.module';

import { ContentModule } from '../modules/content/content.module';
import { PagesModule } from '../modules/pages/pages.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';

@Global()
@Module({
	imports: [
		DatabaseModule,
		StorageModule,
		ConfigModule,
		ContentModule,
		PagesModule,
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
