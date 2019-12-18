import { IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Filter } from 'src/common/dto';

export class PageFilter extends Filter {
	/**
	 * [link description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		required: true,
		maxLength: 255,
		example: 'about',
	})
	public readonly link: string;
}
