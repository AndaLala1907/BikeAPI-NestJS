import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, IsNotEmpty } from 'class-validator';
// DTO for creating a new bike
export class CreateBikeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  speedType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roadType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  barcode: string;
}
