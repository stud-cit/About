import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('User')
export class UserEntity extends BaseEntity {
	@ApiModelProperty({ example: 1 })
	@PrimaryGeneratedColumn()
	public readonly id: number;

	@ApiModelProperty({ example: 'example@ex.com' })
	@Column('varchar', {
		nullable: false,
		unique: true,
		name: 'email',
	})
	public email: string;

	@ApiModelProperty({
		example: '$2b$08$t/.IMs/l9cpEXmnxf73nCu9OwDY82iGE4I24QFhqQlXKNkvC0slJe',
	})
	@Column('varchar', {
		nullable: false,
		unique: true,
		name: 'password',
	})
	public password: string;

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
