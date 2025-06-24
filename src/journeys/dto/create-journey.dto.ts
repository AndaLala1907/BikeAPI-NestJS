import {
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO for creating a journey
export class CreateJourneyDto {
  @ApiProperty()
  @IsMongoId()
  user_id: string;

  @ApiProperty()
  @IsMongoId()
  device_id: string;

  @ApiProperty()
  @IsMongoId()
  bike_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  device_barcode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bike_barcode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bike_type?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  bike_weight?: number;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  speedType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  roadType_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endTime?: Date;
}
