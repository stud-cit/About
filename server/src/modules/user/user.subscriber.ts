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
	listenTo() {
		return UserEntity;
	}

	hashPassword(password: string) {
		return hashSync(password, this.get('SALT_ROUND'));
	}

	beforeInsert(event: InsertEvent<UserEntity>): void {
		if (event.entity) {
			event.entity.password = this.hashPassword(event.entity.password);
		}
	}

	beforeUpdate(event: UpdateEvent<UserEntity>): void {
		if (event.entity) {
			event.entity.password = this.hashPassword(event.entity.password);
			event.entity.updateAt = new Date();
		}
	}
}
