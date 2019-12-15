import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PageEntity } from './page.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PageEntity])],
	controllers: [PageController],
	providers: [PageService],
})
export class PageModule {}
