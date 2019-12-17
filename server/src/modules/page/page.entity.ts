import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	Entity,
	OneToOne,
	OneToMany,
	JoinColumn,
	BaseEntity,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { StorageEntity } from '../../storage';

import { ContentEntity } from '../content';

/**
 * [PageEntity description]
 */
@Entity('Page')
export class PageEntity extends BaseEntity {
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
	 * [link description]
	 */
	@ApiProperty({
		maxLength: 255,
		example: 'example',
	})
	@Column('varchar', { nullable: false })
	public readonly link: string;

	/**
	 * [name description]
	 */
	@ApiProperty({
		default: null,
		nullable: true,
		maxLength: 255,
		example: 'example',
	})
	@Column('varchar', { nullable: true })
	public readonly name: string;

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

	/**
	 * [cover description]
	 */
	@OneToOne(() => StorageEntity)
	@ApiProperty({
		default: null,
		nullable: true,
		type: () => StorageEntity,
	})
	@Column('varchar', { nullable: true })
	public readonly cover: Partial<StorageEntity>;

	/**
	 * [content description]
	 */
	@OneToMany(() => ContentEntity, content => content.page, {
		nullable: true,
		cascade: true,
	})
	public readonly content: ContentEntity[];
}
