import { ApiProperty } from '@nestjs/swagger';

/**
 * [description]
 */
export class JWTRequest {
	/**
	 * [expiresIn description]
	 */
	@ApiProperty({
		readOnly: true,
		example: 3600,
	})
	public readonly expiresIn: number;

	/**
	 * [token description]
	 */
	@ApiProperty({
		readOnly: true,
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGFtcGxlIjoiZXhhbXBsZSIsImlhdCI6MTUxNjIzOTAyMn0.ROZtw1j0EWbGm_UhZmnHODifusdpgdRr5PALzF9bHEk',
	})
	public readonly token: string;
}
