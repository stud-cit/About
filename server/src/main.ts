import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from './config/config.service';
import { AppModule } from './app/app.module';

/**
 * [bootstrap description]
 */
async function bootstrap() {
	const configService = new ConfigService();
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const options = new DocumentBuilder()
		.setDescription(configService.get('npm_package_description'))
		.setVersion(configService.get('npm_package_version'))
		.setTitle(configService.get('npm_package_name'))
		.addBearerAuth()
		.build();

	app.setGlobalPrefix(configService.get('PREFFIX'));

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup(configService.get('PREFFIX'), app, document);

	return await app
		.useStaticAssets(configService.getDest('DOC_DEST'))
		.useGlobalPipes(new ValidationPipe())
		.enableCors()
		.listen(configService.get('PORT'));
}

bootstrap();
