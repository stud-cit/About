import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class PageRequest {
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@ApiModelProperty({ example: 'example' })
	public readonly title: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@ApiModelProperty({ example: '/example' })
	public readonly link: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelPropertyOptional({ example: '/example.jpg' })
	public readonly background?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelPropertyOptional({ example: '/exampl1.jpg' })
	public readonly lazyBackground?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@MaxLength(255)
	@ApiModelPropertyOptional({ example: '/exampl3.jpg' })
	public readonly cover?: string;
}
