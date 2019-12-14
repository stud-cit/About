import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	Entity,
	ManyToOne,
	BaseEntity,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { PagesEntity } from '../pages/pages.entity';

/**
 * [ContentEntity description]
 * @return         [description]
 */
@Entity('Content')
export class ContentEntity extends BaseEntity {
	/**
	 * [id description]
	 */
	@ApiProperty({
		readOnly: true,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9',
	})
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	/**
	 * [page description]
	 */
	@ManyToOne(
		() => PagesEntity,
		page => page.content,
	)
	public readonly page: string;

	/**
	 * [lang description]
	 */
	@ApiProperty({
		default: 'en',
		example: 'en',
		maxLength: 2,
	})
	@Column('varchar', { default: 'en' })
	public readonly lang: string;

	/**
	 * [title description]
	 */
	@ApiProperty({
		default: null,
		nullable: true,
		maxLength: 255,
		example: 'example',
	})
	@Column('varchar', { nullable: true })
	public readonly title: string;

	/**
	 * [description description]
	 */
	@ApiProperty({
		default: null,
		nullable: true,
		maxLength: 255,
		example: 'example',
	})
	@Column('varchar', { nullable: true })
	public readonly description: string;

	/**
	 * [cover description]
	 */
	@ApiProperty({
		default: null,
		nullable: true,
		maxLength: 255,
		example: '/example.jpg',
	})
	@Column('varchar', { nullable: true })
	public readonly cover: string;

	/**
	 * [createAt description]
	 */
	@ApiProperty({
		readOnly: true,
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
