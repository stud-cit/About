import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from './config';
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
	const validationPipe = new ValidationPipe({
		forbidNonWhitelisted: true,
		whitelist: true,
		transform: true,
	});

	SwaggerModule.setup(configService.get('PREFFIX'), app, document);

	return await app
		.useGlobalPipes(validationPipe)
		.useStaticAssets(configService.getDest('DOC_DEST'))
		.useStaticAssets(configService.getDest('STORE_DEST'), {
			prefix: configService.get('STORE_DEST'),
		})
		.listen(configService.get('PORT'));
}

bootstrap();
