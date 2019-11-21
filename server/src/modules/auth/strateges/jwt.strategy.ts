import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '../../../config/config.service';
import { UserEntity } from '../../../modules/user/user.entity';
import { AuthService } from '../auth.service';

/**
 * [Injectable description]
 * @return [description]
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	/**
	 * [constructor description]
	 * @param readonlyconfigService [description]
	 * @param readonlyauthService   [description]
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
	 * @param  payload [description]
	 * @return         [description]
	 */
	public async validate(payload: UserEntity): Promise<UserEntity> {
		return await this.authService.validateUser(payload);
	}
}
