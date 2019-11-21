import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ConfigService } from '../../config/config.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

import { JWTRequest } from './dto/token.dto';

/**
 * [Injectable description]
 * @return [description]
 */
@Injectable()
export class AuthService {
	/**
	 * [constructor description]
	 * @param readonlyconfigService [description]
	 * @param readonlyuserService   [description]
	 * @param readonlyjwtService    [description]
	 */
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * [createToken description]
	 * @param  payload [description]
	 * @return         [description]
	 */
	public async createToken(payload: UserEntity): Promise<JWTRequest> {
		const expiresIn = this.configService.get('JWT_EXPIRE');
		const token = this.jwtService.sign(payload);
		return { expiresIn, token };
	}

	/**
	 * [compareHash description]
	 * @param  payload [description]
	 * @return         [description]
	 */
	public async compareHash(payload: UserEntity): Promise<boolean> {
		const user = await this.validateUser(payload);
		return await compare(payload.password, user.password);
	}

	/**
	 * [validateUser description]
	 * @param  payload [description]
	 * @return         [description]
	 */
	public async validateUser(payload: UserEntity): Promise<UserEntity> {
		return await this.userService.selectOne(payload.email).catch(() => {
			throw new UnauthorizedException();
		});
	}
}
