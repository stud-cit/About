import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import { IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * [Entity description]
 * @param  'Pages' [description]
 * @return         [description]
 */
@Entity('Pages')
export class PagesEntity extends BaseEntity {
	/**
	 * [id description]
	 */
	@IsUUID()
	@IsOptional()
	@ApiModelProperty({
		readOnly: true,
		required: false,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9',
	})
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	/**
	 * [title description]
	 */
	@IsNotEmpty()
	@MaxLength(255)
	@ApiModelProperty({ example: 'example', maxLength: 255 })
	@Column('varchar')
	public readonly title: string;

	/**
	 * [link description]
	 */
	@IsNotEmpty()
	@MaxLength(255)
	@ApiModelProperty({ example: '/example', maxLength: 255 })
	@Column('varchar')
	public readonly link: string;

	/**
	 * [background description]
	 */
	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelProperty({
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
	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelProperty({
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
	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelProperty({
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
	@ApiModelProperty({
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
	@ApiModelProperty({
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
