import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// DTO for updating user (all fields optional)
export class UpdateUserDto extends PartialType(CreateUserDto) {}
