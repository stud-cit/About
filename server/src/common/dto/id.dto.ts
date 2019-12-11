import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

/**
 * [ID description]
 * @return         [description]
 */
export class ID {
	/**
	 * [id description]
	 */
	@IsUUID()
	@ApiProperty({
		readOnly: true,
		required: false,
		example: 'b4e19ca1-48ea-482c-81ea-1f646d7f75d9',
	})
	public readonly id: string;
}
