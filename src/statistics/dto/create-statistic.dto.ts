import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

export class CreateStatisticDto {
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  distance: number;

  @IsNumber()
  duration: number;

  @IsNumber()
  calories: number;

  @IsNumber()
  avg_speed: number;
}
