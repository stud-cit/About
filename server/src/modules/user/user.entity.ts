import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [Entity description]
 * @param  'User' [description]
 * @return        [description]
 */
@Entity('User')
export class UserEntity extends BaseEntity {
	/**
	 * [id description]
	 */
	@IsUUID()
	@IsOptional()
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
	@IsEmail()
	@MaxLength(255)
	@ApiProperty({
		uniqueItems: true,
		maxLength: 255,
		example: 'example@ex.com',
	})
	@Column('varchar', { unique: true })
	public readonly email: string;

	/**
	 * [password description]
	 */
	@MinLength(8)
	@MaxLength(255)
	@ApiProperty({
		minLength: 8,
		maxLength: 255,
		example: '$2b$08$t/.IMs/l9cpEXmnxf73nCu9OwDY82iGE4I24QFhqQlXKNkvC0slJe',
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
