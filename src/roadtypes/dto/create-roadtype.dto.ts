import { IsString, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateRoadTypeDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Multiplier must be a valid number' })
  multiplier?: number;
}
