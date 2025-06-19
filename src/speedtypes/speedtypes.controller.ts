import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SpeedTypesService } from './speedtypes.service';
import { CreateSpeedTypeDto } from './dto/create-speedtype.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('SpeedTypes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('speedtypes')
export class SpeedTypesController {
  constructor(private readonly speedTypesService: SpeedTypesService) {}

  @Roles('admin')
  @Post()
  create(@Body() dto: CreateSpeedTypeDto) {
    return this.speedTypesService.create(dto);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.speedTypesService.findAll();
  }

  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speedTypesService.findOne(id);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speedTypesService.delete(id);
  }
}
