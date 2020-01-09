import { IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Filter } from '../../../common/dto';

export class PageFilter extends Filter {
	/**
	 * [link description]
	 */
	@IsOptional()
	@MaxLength(255)
	@ApiProperty({
		maxLength: 255,
		required: false,
		example: 'about',
	})
	public readonly link: string;
}
