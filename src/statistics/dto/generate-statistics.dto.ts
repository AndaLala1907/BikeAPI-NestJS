import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
// DTO to trigger generation of statistics from journeys
export class GenerateStatisticsDto {
  @ApiProperty({ description: 'User ID to generate statistics for' })
  @IsMongoId()
  user_id: string;
}
