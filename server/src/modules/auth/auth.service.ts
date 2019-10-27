import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ConfigService } from '../../config/config.service';

import { UserRequest } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

import { JWTRequest } from './dto/token.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	public async createToken(payload: UserRequest): Promise<JWTRequest> {
		return {
			expiresIn: this.configService.get('JWT_EXPIRE'),
			token: this.jwtService.sign({ ...payload }),
		};
	}

	public async compareHash(payload: UserRequest): Promise<boolean> {
		const user = await this.validateUser(payload);
		return await compare(payload.password, user.password);
	}

	public async validateUser(payload: UserRequest): Promise<UserEntity> {
		return await this.userService.selectOne(payload).catch(() => {
			throw new UnauthorizedException();
		});
	}
}
