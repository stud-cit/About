import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [StorageEntity description]
 * @return        [description]
 */
@Entity('Storage')
export class StorageEntity extends BaseEntity {
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
	 * [image description]
	 */
	@ApiProperty({
		maxLength: 40,
		nullable: true,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9.jpg',
	})
	@Column('varchar', { nullable: true })
	public readonly image: string;

	/**
	 * [video description]
	 */
	@ApiProperty({
		maxLength: 40,
		nullable: true,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9.mp4',
	})
	@Column('varchar', { nullable: true })
	public readonly video: string;

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
