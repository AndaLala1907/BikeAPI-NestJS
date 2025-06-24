import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
// DTO for ending a journey by providing endTime
export class EndJourneyDto {
  @ApiProperty({
    description: 'End time of the journey',
  })
  @IsDateString()
  endTime: string;
}
