import { IsOptional, IsUUID, MaxLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [ContentRequest description]
 */
export class ContentRequest {
	/**
	 * [lang description]
	 */
	@Length(2)
	@IsOptional()
	@ApiProperty({
		default: 'en',
		example: 'en',
		maxLength: 2,
		required: false,
	})
	public readonly lang: string;

	/**
	 * [title description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		default: null,
		nullable: true,
		required: false,
		maxLength: 255,
		example: 'example',
	})
	public readonly title: string;

	/**
	 * [description description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		default: null,
		nullable: true,
		maxLength: 255,
		required: false,
		example: 'example',
	})
	public readonly description: string;

	/**
	 * [cover description]
	 */
	@IsUUID()
	@IsOptional()
	@ApiProperty({
		default: null,
		nullable: true,
		required: false,
	})
	public readonly cover: string;
}
