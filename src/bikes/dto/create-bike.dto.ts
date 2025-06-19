import { ApiProperty } from '@nestjs/swagger';

export class CreateBikeDto {
  @ApiProperty({ example: 'Mountain Bike' })
  name: string;

  @ApiProperty({ example: 'mountain' })
  type: string;

  @ApiProperty({ example: 10.5 })
  weight: number;

  @ApiProperty({ example: '665f5d6c1e785cda274a2bbf' })
  user_id: string;

  @ApiProperty({ example: '665f5d6c1e785cda274a2bbf' })
  speedType: string;

  @ApiProperty({ example: '665f5d6c1e785cda274a2bbf' })
  roadType: string;

  @ApiProperty({ example: 'BC123456789' })
  barcode: string;
}
