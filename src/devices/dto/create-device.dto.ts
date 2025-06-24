import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO for creating a new device
export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bike_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsIn(['paired', 'unpaired'])
  status: 'paired' | 'unpaired';

  @ApiProperty()
  @IsOptional()
  pairedAt?: Date;

  @ApiProperty()
  @IsOptional()
  unpairedAt?: Date;
}
