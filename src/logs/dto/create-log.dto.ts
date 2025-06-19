import { IsMongoId, IsString, IsDateString } from 'class-validator';

export class CreateLogDto {
  @IsMongoId()
  deviceId: string;

  @IsString()
  type: 'start' | 'stop' | 'ping';

  @IsDateString()
  timestamp: string;
}
