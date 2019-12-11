import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
