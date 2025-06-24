import { IsString, MinLength } from 'class-validator';
// DTO for creating speedtypes (low, medium, high, etc.)
export class CreateSpeedTypeDto {
  @IsString()
  @MinLength(2)
  name: string;
}
