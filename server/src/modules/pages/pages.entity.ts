import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	Entity,
	OneToMany,
	BaseEntity,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { ContentEntity } from '../content/content.entity';

/**
 * [PagesEntity description]
 * @return         [description]
 */
@Entity('Pages')
export class PagesEntity extends BaseEntity {
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
	 * [content description]
	 */
	@OneToMany(() => ContentEntity, content => content.page, {
		nullable: true,
		cascade: true,
		eager: true,
	})
	@ApiProperty({
		default: [],
		nullable: true,
		type: () => [ContentEntity],
	})
	public readonly content: ContentEntity[];

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
