import { IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [CoverRequest description]
 */
export class CoverRequest {
	/**
	 * [image description]
	 */
	@IsOptional()
	@IsNotEmpty()
	@MaxLength(42)
	@ApiProperty({
		default: null,
		maxLength: 42,
		required: false,
		example: 'd3c0044f-1ee4-4532-a482-211a5b5d8b9e.gif',
	})
	public readonly image: string;

	/**
	 * [video description]
	 */
	@IsOptional()
	@IsNotEmpty()
	@MaxLength(42)
	@ApiProperty({
		default: null,
		maxLength: 42,
		required: false,
		example: 'd3c0044f-1ee4-4532-a482-211a5b5d8b9e.gif',
	})
	public readonly video: string;
}
