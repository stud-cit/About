import { Injectable, UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ConfigService } from '../../config/config.service';

import { UserRequest } from '../user/dto/user.dto';
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
	 * @param configService [description]
	 * @param userService   [description]
	 * @param jwtService    [description]
	 */
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * [createToken description]
	 * @param  user [description]
	 * @return      [description]
	 */
	public async createToken(user: Partial<UserEntity>): Promise<JWTRequest> {
		const expiresIn = this.configService.get('JWT_EXPIRE');
		const token = this.jwtService.sign(classToPlain(user));
		return { expiresIn, token };
	}

	/**
	 * [compareHash description]
	 * @param  user  [description]
	 * @param  _user [description]
	 * @return       [description]
	 */
	public async compareHash(
		user: UserRequest,
		_user: Partial<UserEntity>,
	): Promise<boolean> {
		const hash = await compare(_user.password, user.password);
		if (!hash) throw new UnauthorizedException();
		return hash;
	}

	/**
	 * [validateUser description]
	 * @param  user [description]
	 * @return      [description]
	 */
	public async validateUser(user: Partial<UserRequest>): Promise<UserEntity> {
		return await this.userService.selectOne({ email: user.email }).catch(() => {
			throw new UnauthorizedException();
		});
	}
}
