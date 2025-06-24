import { PartialType } from '@nestjs/mapped-types';
import { CreateBikeDto } from './create-bike.dto';
// DTO for updating bike(all fields optionals)
export class UpdateBikeDto extends PartialType(CreateBikeDto) {}
