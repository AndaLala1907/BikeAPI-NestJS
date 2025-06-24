import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
// DTO to stop a journey and finalize the log
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
