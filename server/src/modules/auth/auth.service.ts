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
 * [AuthService description]
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
	 * @param  data [description]
	 * @return      [description]
	 */
	public async createToken(data: Partial<UserEntity>): Promise<JWTRequest> {
		const expiresIn = this.configService.get('JWT_EXPIRE');
		const token = this.jwtService.sign(classToPlain(data));
		return { expiresIn, token };
	}

	/**
	 * [compareHash description]
	 * @param  data  [description]
	 * @param  _data [description]
	 * @return       [description]
	 */
	public async compareHash(
		data: UserRequest,
		_data: Partial<UserEntity>,
	): Promise<boolean> {
		const hash = await compare(_data.password, data.password);
		if (!hash) throw new UnauthorizedException();
		return hash;
	}

	/**
	 * [validateUser description]
	 * @param  data [description]
	 * @return      [description]
	 */
	public async validateUser(data: Partial<UserRequest>): Promise<UserEntity> {
		return await this.userService.selectOne({ email: data.email }).catch(() => {
			throw new UnauthorizedException();
		});
	}
}
