import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNumber()
  weight: number;
}
