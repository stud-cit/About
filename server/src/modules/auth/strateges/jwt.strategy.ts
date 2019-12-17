import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '../../../config/config.service';
import { UserEntity } from '../../../modules/user/user.entity';
import { AuthService } from '../auth.service';

/**
 * [JwtStrategy description]
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	/**
	 * [constructor description]
	 * @param configService [description]
	 * @param authService   [description]
	 */
	constructor(
		readonly configService: ConfigService,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	/**
	 * [validate description]
	 * @param  {email    [description]
	 * @param  password} [description]
	 * @return           [description]
	 */
	public async validate({ email, password }: UserEntity): Promise<UserEntity> {
		return await this.authService.validateUser({ email, password });
	}
}
