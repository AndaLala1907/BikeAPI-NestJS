import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class PingDto {
  @IsMongoId()
  @IsNotEmpty()
  log_id: string;

  @IsMongoId()
  @IsNotEmpty()
  journey_id: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  timestamp: number;
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;
}
