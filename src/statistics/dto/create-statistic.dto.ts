import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO for creating a statistic entry manually when not generated automatically
export class CreateStatisticDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsNumber()
  distance: number;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  calories: number;

  @ApiProperty()
  @IsNumber()
  avg_speed: number;
}
