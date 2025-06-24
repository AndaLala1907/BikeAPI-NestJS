import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO for creating speedtypes (low, medium, high, etc.)
export class CreateSpeedTypeDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;
}
