import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticDto } from './create-statistic.dto';
// DTO for updating a statistic entry
export class UpdateStatisticDto extends PartialType(CreateStatisticDto) {}
