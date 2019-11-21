import { Controller, UnauthorizedException, Body, Post } from '@nestjs/common';
import { ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { JWTRequest } from './dto/token.dto';

/**
 * [Controller description]
 * [API]{@link /api/#/auth}
 * @param  'auth' [description]
 * @return        [description]
 */
@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
	/**
	 * [constructor description]
	 * @param readonlyauthService [description]
	 */
	constructor(private readonly authService: AuthService) {}

	/**
	 * [create description]
	 * @param  @Body( [description]
	 * @return        [description]
	 */
	@Post()
	@ApiCreatedResponse({ type: JWTRequest })
	public async create(@Body() payload: UserEntity): Promise<JWTRequest> {
		const compareHash = await this.authService.compareHash(payload);
		if (!compareHash) throw new UnauthorizedException();
		return await this.authService.createToken(payload);
	}
}
