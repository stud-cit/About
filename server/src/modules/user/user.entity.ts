import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', {
		nullable: false,
		unique: true,
		name: 'email',
	})
	email: string;

	@Column('varchar', {
		nullable: false,
		unique: true,
		name: 'password',
	})
	password: string;

	@Column('datetime', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
		name: 'createAt',
	})
	createAt: Date;

	@Column('datetime', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
		name: 'updateAt',
	})
	updateAt: Date;
}
