import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class EndJourneyDto {
  @ApiProperty({
    description: 'End time of the journey',
    example: '2025-06-20T10:00:00.000Z',
  })
  @IsDateString()
  endTime: string;
}
