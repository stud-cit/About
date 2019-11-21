import { createParamDecorator } from '@nestjs/common';

import { UserEntity } from '../../modules/user/user.entity';

/**
 * [createParamDecorator description]
 * @param  (data [description]
 * @return       [description]
 */
export const User = createParamDecorator(
	(data: string, req): UserEntity => {
		return data ? req.user && req.user[data] : req.user;
	},
);
