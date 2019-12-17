import { createParamDecorator } from '@nestjs/common';

import { UserEntity } from '../../modules/user/user.entity';

/**
 * [UserExpressRequest description]
 */
export interface UserExpressRequest extends Request {
	/**
	 * [user description]
	 */
	readonly user: UserEntity;
}

/**
 * [createParamDecorator description]
 * @param  (data [description]
 * @return       [description]
 */
export const User = createParamDecorator(
	(data: string, req: UserExpressRequest): UserEntity => {
		return data ? req.user && req.user[data] : req.user;
	},
);
