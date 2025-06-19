import {
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateJourneyDto {
  @IsMongoId()
  user_id: string;

  @IsMongoId()
  device_id: string;

  @IsMongoId()
  bike_id: string;

  @IsOptional()
  @IsString()
  device_barcode?: string;

  @IsOptional()
  @IsString()
  bike_barcode?: string;

  @IsOptional()
  @IsString()
  bike_type?: string;

  @IsOptional()
  @IsNumber()
  bike_weight?: number;

  @IsOptional()
  @IsMongoId()
  speedType_id?: string;

  @IsOptional()
  @IsMongoId()
  roadType_id?: string;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;
}
