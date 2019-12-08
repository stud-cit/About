import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [UserEntity description]
 * @return        [description]
 */
@Entity('User')
export class UserEntity extends BaseEntity {
	/**
	 * [id description]
	 */
	@ApiProperty({
		readOnly: true,
		required: false,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9',
	})
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	/**
	 * [email description]
	 */
	@ApiProperty({
		maxLength: 255,
		uniqueItems: true,
		example: 'example@ex.com',
	})
	@Column('varchar', { unique: true })
	public readonly email: string;

	/**
	 * [password description]
	 */
	@ApiProperty({
		minLength: 8,
		maxLength: 255,
		example: '$2b$08$t5G2lyRpj.lrx.uyhYaHtukRtIweRV6Nm7kduCZGT0NJfTmXDM5z.',
	})
	@Column('varchar')
	public password: string;

	/**
	 * [createAt description]
	 */
	@ApiProperty({
		readOnly: true,
		required: false,
		type: 'string',
		format: 'date-time',
		example: '2019-11-20T21:56:55.000Z',
	})
	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
	public readonly createAt: Date;

	/**
	 * [updateAt description]
	 */
	@ApiProperty({
		readOnly: true,
		required: false,
		type: 'string',
		format: 'date-time',
		example: '2019-11-20T21:56:55.000Z',
	})
	@Column('timestamp', {
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	public readonly updateAt: Date;
}
