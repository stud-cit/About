import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dirname } from 'path';

import { ConfigService } from '../config/config.service';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        port: configService.getSetting('TYPEORM_PORT'),
        name: configService.getSetting('TYPEORM_NAME'),
        host: configService.getSetting('TYPEORM_HOST'),
        type: configService.getSetting('TYPEORM_CONNECTION'),
        logging: configService.getSetting('NODE_ENV') === 'development',
        username: configService.getSetting('TYPEORM_USERNAME'),
        password: configService.getSetting('TYPEORM_PASSWORD'),
        database: configService.getSetting('TYPEORM_DATABASE'),
        dropSchema: configService.getSetting('TYPEORM_DROP_SCHEMA'),
        synchronize: configService.getSetting('TYPEORM_SYNCHRONIZE'),
        migrationsRun: configService.getSetting('TYPEORM_MIGRATIONS_RUN'),
        keepConnectionAlive: configService.getSetting('TYPEORM_KEEP_ALIVE'),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        entities: [dirname(__dirname) + '/**/*.entity{.ts,.js}'],
        subscribers: [dirname(__dirname) + '/**/*.subscriber{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
