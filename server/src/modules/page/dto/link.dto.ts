import { IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LinkRequest {
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
}
