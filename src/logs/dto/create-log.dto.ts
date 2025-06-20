import { IsMongoId, IsString, IsDateString } from 'class-validator';

export class CreateLogDto {
  @IsMongoId()
  deviceId: string;
  @IsMongoId()
  journey_id: string;

  @IsString()
  type: 'start' | 'stop' | 'ping';

  @IsDateString()
  timestamp: string;
}
