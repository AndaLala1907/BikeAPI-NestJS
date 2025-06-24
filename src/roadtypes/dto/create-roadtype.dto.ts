import { IsString, MinLength, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO for creating a road type with optional description and multiplier
export class CreateRoadTypeDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Multiplier must be a valid number' })
  multiplier?: number;
}
