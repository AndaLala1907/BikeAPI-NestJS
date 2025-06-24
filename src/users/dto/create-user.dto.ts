import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// DTO for creating a new user
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  @Min(1)
  weight?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: string;
}
