import { ApiProperty } from '@nestjs/swagger';

/**
 * [description]
 */
export class StorageRequest {
	/**
	 * [file description]
	 */
	@ApiProperty({ type: 'string', format: 'binary' })
	readonly file: Express.Multer.File;
}
