import { IsOptional, MaxLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [PageRequest description]
 * @return         [description]
 */
export class PageRequest {
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
		maxLength: 255,
		required: false,
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
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		default: null,
		nullable: true,
		maxLength: 255,
		required: false,
		example: '/example.jpg',
	})
	public readonly cover: string;
}
