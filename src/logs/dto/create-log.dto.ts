import { IsMongoId, IsString, IsDateString } from 'class-validator';
// DTO for creating logs: used for start, stop, ping tracking
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
