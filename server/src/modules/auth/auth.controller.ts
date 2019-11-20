import { Controller, UnauthorizedException, Body, Post } from '@nestjs/common';
import { ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { JWTRequest } from './dto/token.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	@ApiCreatedResponse({ type: JWTRequest })
	public async create(@Body() payload: UserEntity): Promise<JWTRequest> {
		const compareHash = await this.authService.compareHash(payload);
		if (!compareHash) throw new UnauthorizedException();
		return await this.authService.createToken(payload);
	}
}
