import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO used for receiving ping data froma device
export class PingDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  log_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  journey_id: string;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsNumber()
  timestamp: number;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;
}
