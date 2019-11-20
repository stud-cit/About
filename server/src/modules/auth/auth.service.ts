import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ConfigService } from '../../config/config.service';
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

	public async createToken(payload: UserEntity): Promise<JWTRequest> {
		const expiresIn = this.configService.get('JWT_EXPIRE');
		const token = this.jwtService.sign(payload);
		return { expiresIn, token };
	}

	public async compareHash(payload: UserEntity): Promise<boolean> {
		const user = await this.validateUser(payload);
		return await compare(payload.password, user.password);
	}

	public async validateUser(payload: UserEntity): Promise<UserEntity> {
		return await this.userService.selectOne(payload.email).catch(() => {
			throw new UnauthorizedException();
		});
	}
}
