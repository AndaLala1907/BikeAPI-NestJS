import { IsMongoId, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO for creating logs: used for start, stop, ping tracking
export class CreateLogDto {
  @ApiProperty()
  @IsMongoId()
  deviceId: string;

  @ApiProperty()
  @IsMongoId()
  journey_id: string;

  @ApiProperty()
  @IsString()
  type: 'start' | 'stop' | 'ping';

  @ApiProperty()
  @IsDateString()
  timestamp: string;
}
