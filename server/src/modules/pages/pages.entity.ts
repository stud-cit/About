import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import { IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('Pages')
export class PagesEntity extends BaseEntity {
	@IsUUID()
	@IsOptional()
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@IsNotEmpty()
	@MaxLength(255)
	@ApiModelProperty({ example: 'example' })
	@Column('varchar')
	public readonly title: string;

	@IsNotEmpty()
	@MaxLength(255)
	@ApiModelProperty({ example: '/example' })
	@Column('varchar')
	public readonly link: string;

	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelProperty({ example: '/example.jpg' })
	@Column('varchar', { nullable: true })
	public readonly background?: string;

	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelProperty({ example: '/exampl1.jpg' })
	@Column('varchar', { nullable: true })
	public readonly lazyBackground?: string;

	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelProperty({ example: '/exampl3.jpg' })
	@Column('varchar', { nullable: true })
	public readonly cover: string;

	@ApiModelProperty({ example: new Date() })
	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
	public readonly createAt: Date;

	@ApiModelProperty({ example: new Date() })
	@Column('timestamp', {
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	public readonly updateAt: Date;
}
