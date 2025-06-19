import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  bike_id: string;

  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsIn(['paired', 'unpaired'])
  status: 'paired' | 'unpaired';

  @IsOptional()
  pairedAt?: Date;

  @IsOptional()
  unpairedAt?: Date;
}
