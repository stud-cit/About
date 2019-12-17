import { IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ID } from './id.dto';

/**
 * [Filter description]
 */
export class Filter extends ID {
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
}
