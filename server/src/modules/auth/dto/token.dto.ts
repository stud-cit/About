import { IsPositive, IsBase64 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * [description]
 */
export class JWTRequest {
	/**
	 * [expiresIn description]
	 */
	@IsPositive()
	@ApiModelProperty({ example: 3600 })
	public readonly expiresIn: number;

	/**
	 * [token description]
	 */
	@IsBase64()
	@ApiModelProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoiZXhhbXBsZSIsImlhdCI6MTUxNjIzOTAyMn0.ROZtw1j0EWbGm_UhZmnHODifusdpgdRr5PALzF9bHEk',
	})
	public readonly token: string;
}
