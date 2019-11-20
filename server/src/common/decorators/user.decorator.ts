import { createParamDecorator } from '@nestjs/common';

import { UserEntity } from 'src/modules/user/user.entity';

export const User = createParamDecorator(
	(data: string, req): UserEntity => {
		return data ? req.user && req.user[data] : req.user;
	},
);
