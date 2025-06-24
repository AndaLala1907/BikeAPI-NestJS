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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('RoadTypes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roadtypes')
// controller for managing types of roads, only accessible by admin
export class RoadTypesController {
  constructor(private readonly roadTypesService: RoadTypesService) {}

  @Roles('admin')
  // create a new road type
  @Post()
  create(@Body() dto: CreateRoadTypeDto) {
    return this.roadTypesService.create(dto);
  }

  @Roles('admin')
  // list all road types
  @Get()
  findAll() {
    return this.roadTypesService.findAll();
  }

  @Roles('admin')
  // get one road type by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roadTypesService.findOne(id);
  }

  @Roles('admin')
  // soft delete road type
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roadTypesService.delete(id);
  }
}
