import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoadTypesService } from './roadtypes.service';
import { CreateRoadTypeDto } from './dto/create-roadtype.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roadtypes')
export class RoadTypesController {
  constructor(private readonly roadTypesService: RoadTypesService) {}

  @Roles('admin')
  @ApiBearerAuth()
  @Post()
  create(@Body() dto: CreateRoadTypeDto) {
    return this.roadTypesService.create(dto);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.roadTypesService.findAll();
  }

  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roadTypesService.findOne(id);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roadTypesService.delete(id);
  }
}
