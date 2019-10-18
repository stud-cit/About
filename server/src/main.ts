import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const config = new ConfigService();
	const options = new DocumentBuilder()
		.setDescription(config.get('npm_package_description'))
		.setVersion(config.get('npm_package_version'))
		.setTitle(config.get('npm_package_name'))
		.setBasePath(config.get('API_PREFFIX'))
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup(config.get('API_PREFFIX'), app, document);

	return await app
		.useStaticAssets(join(config.get('PWD'), config.get('DOC_DIST')))
		.useStaticAssets(join(config.get('PWD'), config.get('STORE_DEST')), {
			prefix: config.get('STORE_DEST'),
		})
		.setGlobalPrefix(config.get('API_PREFFIX'))
		.useGlobalPipes(new ValidationPipe())
		.enableCors()
		.listen(config.get('PORT'));
}

bootstrap();
