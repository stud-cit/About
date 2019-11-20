import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

import { JwtStrategy } from './strateges/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		PassportModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				defaultStrategy: configService.get('PASSPORT_STRATEGY'),
				session: configService.get('PASSPORT_SESSION'),
			}),
			inject: [ConfigService],
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get('JWT_EXPIRE'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [PassportModule, AuthService],
})
export class AuthModule {}
