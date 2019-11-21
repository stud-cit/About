import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dirname } from 'path';

import { ConfigService } from '../config/config.service';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				port: configService.get('TYPEORM_PORT'),
				name: configService.get('TYPEORM_NAME'),
				host: configService.get('TYPEORM_HOST'),
				cache: configService.get('TYPEORM_CACHE'),
				type: configService.get('TYPEORM_CONNECTION'),
				logging: configService.getMode('development'),
				username: configService.get('TYPEORM_USERNAME'),
				password: configService.get('TYPEORM_PASSWORD'),
				database: configService.get('TYPEORM_DATABASE'),
				dropSchema: configService.getMode('development'),
				synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
				migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN'),
				keepConnectionAlive: configService.get('TYPEORM_KEEP_ALIVE'),
				migrations: [__dirname + '/migrations/*{.ts,.js}'],
				entities: [dirname(__dirname) + '/**/*.entity{.ts,.js}'],
				subscribers: [dirname(__dirname) + '/**/*.subscriber{.ts,.js}'],
			}),
			inject: [ConfigService],
		}),
	],
})
export class DatabaseModule {}
