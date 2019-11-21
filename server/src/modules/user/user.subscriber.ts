import { hashSync } from 'bcrypt';
import {
	EventSubscriber,
	EntitySubscriberInterface,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';

import { ConfigService } from '../../config/config.service';
import { UserEntity } from './user.entity';

/**
 * [EventSubscriber description]
 * @return [description]
 */
@EventSubscriber()
export class AdminSubscriber extends ConfigService
	implements EntitySubscriberInterface<any> {
	/**
	 * [listenTo description]
	 * @return [description]
	 */
	public listenTo() {
		return UserEntity;
	}

	/**
	 * [hashPassword description]
	 * @param  password [description]
	 * @return          [description]
	 */
	private hashPassword(password: string) {
		return hashSync(password, this.get('SALT_ROUND'));
	}

	/**
	 * [beforeInsert description]
	 * @param event [description]
	 */
	public beforeInsert(event: InsertEvent<UserEntity>): void {
		if (event.entity) {
			event.entity.password = this.hashPassword(event.entity.password);
		}
	}

	/**
	 * [beforeUpdate description]
	 * @param event [description]
	 */
	public beforeUpdate(event: UpdateEvent<UserEntity>): void {
		if (event.entity) {
			event.entity.password = this.hashPassword(event.entity.password);
		}
	}
}
