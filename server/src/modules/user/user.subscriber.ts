import { hashSync } from 'bcrypt';
import {
	EventSubscriber,
	EntitySubscriberInterface,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';

import { ConfigService } from '../../config/config.service';
import { UserEntity } from './user.entity';

@EventSubscriber()
export class AdminSubscriber extends ConfigService
	implements EntitySubscriberInterface<any> {
	public listenTo() {
		return UserEntity;
	}

	private hashPassword(password: string) {
		return hashSync(password, this.get('SALT_ROUND'));
	}

	public beforeInsert(event: InsertEvent<UserEntity>): void {
		if (event.entity) {
			event.entity.password = this.hashPassword(event.entity.password);
		}
	}

	public beforeUpdate(event: UpdateEvent<UserEntity>): void {
		if (event.entity) {
			event.entity.password = this.hashPassword(event.entity.password);
			event.entity.updateAt = new Date();
		}
	}
}
