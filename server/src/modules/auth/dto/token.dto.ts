import { IsPositive, IsBase64 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class JWTRequest {
	@IsPositive()
	@ApiModelProperty({ example: 3600 })
	readonly expiresIn: number;

	@IsBase64()
	@ApiModelProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoiZXhhbXBsZSIsImlhdCI6MTUxNjIzOTAyMn0.ROZtw1j0EWbGm_UhZmnHODifusdpgdRr5PALzF9bHEk',
	})
	readonly token: string;
}
