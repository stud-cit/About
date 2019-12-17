import { Global, Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '../config/config.module';

import { StorageModule } from '../modules/storage/storage.module';
import { ContentModule } from '../modules/content/content.module';
import { PageModule } from '../modules/page/page.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';

@Global()
@Module({
	imports: [
		DatabaseModule,
		ConfigModule,
		StorageModule,
		ContentModule,
		PageModule,
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
