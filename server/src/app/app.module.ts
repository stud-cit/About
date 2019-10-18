import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { StorageModule } from '../storage/storage.module';
import { DatabaseModule } from '../database/database.module';

import { UserModule } from '../modules/user/user.module';

@Global()
@Module({
	imports: [
		ConfigModule,
		StorageModule,
		DatabaseModule,
		UserModule,
})
export class AppModule {}
