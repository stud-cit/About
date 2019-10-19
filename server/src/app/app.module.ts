import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { StorageModule } from '../storage/storage.module';
import { DatabaseModule } from '../database/database.module';

import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { PagesModule } from '../modules/pages/pages.module';

@Global()
@Module({
	imports: [
		ConfigModule,
		StorageModule,
		DatabaseModule,
		AuthModule,
		UserModule,
		PagesModule,
	],
})
export class AppModule {}
