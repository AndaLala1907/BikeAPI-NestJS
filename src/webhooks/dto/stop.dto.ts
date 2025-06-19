import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class StopDto {
  @IsMongoId()
  @IsNotEmpty()
  log_id: string;

  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  endTime: number;
}
