import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('Pages')
export class PagesEntity extends BaseEntity {
	@ApiModelProperty({ example: 1 })
	@PrimaryGeneratedColumn()
	public readonly id: number;

	@ApiModelProperty({ example: 'example' })
	@Column('varchar', {
		nullable: false,
		name: 'title',
	})
	public title: string;

	@ApiModelProperty({ example: '/example' })
	@Column('varchar', {
		nullable: false,
		name: 'link',
	})
	public link: string;

	@ApiModelProperty({ example: '/example.jpg' })
	@Column('varchar', {
		nullable: true,
		name: 'background',
	})
	public background?: string;

	@ApiModelProperty({ example: '/exampl1.jpg' })
	@Column('varchar', {
		nullable: true,
		name: 'lazyBackground',
	})
	public lazyBackground?: string;

	@ApiModelProperty({ example: '/exampl3.jpg' })
	@Column('varchar', {
		nullable: true,
		name: 'cover',
	})
	public cover: string;

	@ApiModelProperty({ example: new Date() })
	@Column('datetime', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
		name: 'createAt',
	})
	public readonly createAt: Date;

	@ApiModelProperty({ example: new Date() })
	@Column('datetime', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
		name: 'updateAt',
	})
	public updateAt: Date;
}
