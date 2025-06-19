import { IsString, MinLength } from 'class-validator';

export class CreateSpeedTypeDto {
  @IsString()
  @MinLength(2)
  name: string;
}
