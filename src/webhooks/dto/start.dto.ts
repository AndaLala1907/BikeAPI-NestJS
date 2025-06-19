import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

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
