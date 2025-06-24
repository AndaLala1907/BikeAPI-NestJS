import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
// DTO to start a journey and create a log
export class StartDto {
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsMongoId()
  @IsNotEmpty()
  journey_id: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
