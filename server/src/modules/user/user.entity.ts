import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { MinLength, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('User')
export class UserEntity extends BaseEntity {
	@IsUUID()
	@IsOptional()
	@PrimaryGeneratedColumn('uuid')
	public readonly id: string;

	@IsEmail()
	@MaxLength(255)
	@ApiModelProperty({ example: 'example@ex.com' })
	@Column('varchar', { unique: true })
	public email: string;

	@MinLength(8)
	@MaxLength(255)
	@ApiModelProperty({
		example: '$2b$08$t/.IMs/l9cpEXmnxf73nCu9OwDY82iGE4I24QFhqQlXKNkvC0slJe',
	})
	@Column('varchar', { unique: true })
	public password: string;

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
