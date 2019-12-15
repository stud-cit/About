import { IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * [description]
 */
export class CoverRequest {
	/**
	 * [image description]
	 */
	@IsUUID()
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9',
	})
	readonly image: string;

	@IsUUID()
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9',
	})
	readonly video: string;
}
