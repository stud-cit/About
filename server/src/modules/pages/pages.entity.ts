import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	Entity,
	OneToMany,
	BaseEntity,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { ContentEntity } from './content.entity';

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
		required: false,
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
	})
	public readonly content: ContentEntity;

	/**
	 * [title description]
	 */
	@IsNotEmpty()
	@MaxLength(255)
	@ApiProperty({ example: 'example', maxLength: 255 })
	@Column('varchar')
	public readonly title: string;

	/**
	 * [link description]
	 */
	@IsNotEmpty()
	@MaxLength(255)
	@ApiProperty({ example: '/example', maxLength: 255 })
	@Column('varchar')
	public readonly link: string;

	/**
	 * [background description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		maxLength: 255,
		nullable: true,
		required: false,
		example: '/example.jpg',
	})
	@Column('varchar', { nullable: true })
	public readonly background?: string;

	/**
	 * [lazyBackground description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		maxLength: 255,
		nullable: true,
		required: false,
		example: '/example.jpg',
	})
	@Column('varchar', { nullable: true })
	public readonly lazyBackground?: string;

	/**
	 * [cover description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		maxLength: 255,
		nullable: true,
		required: false,
		example: '/example.jpg',
	})
	@Column('varchar', { nullable: true })
	public readonly cover: string;

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
