import { IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Filter } from 'src/common/dto';

export class ContentFilter extends Filter {
	/**
	 * [id description]
	 */
	@IsUUID()
	@IsOptional()
	@ApiProperty({
		readOnly: true,
		required: false,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9',
	})
	public readonly page: string;
}
