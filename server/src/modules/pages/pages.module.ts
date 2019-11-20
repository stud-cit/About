import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { PagesEntity } from './pages.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PagesEntity])],
	controllers: [PagesController],
	providers: [PagesService],
})
export class PagesModule {}
