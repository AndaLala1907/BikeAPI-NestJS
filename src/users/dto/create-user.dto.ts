import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';
// DTO for creating a new user
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @Min(1)
  weight?: number;

  @IsOptional()
  @IsString()
  role?: string;
}
