import { IsOptional, MaxLength, Length, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CoverRequest } from '../../../storage';

/**
 * [PageRequest description]
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
	 * [link description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		required: true,
		maxLength: 255,
		example: 'example',
	})
	public readonly link: string;

	/**
	 * [name description]
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
	public readonly name: string;

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
	@IsOptional()
	@ValidateNested()
	@ApiProperty({
		default: null,
		nullable: true,
		required: false,
	})
	public readonly cover: CoverRequest;
}
