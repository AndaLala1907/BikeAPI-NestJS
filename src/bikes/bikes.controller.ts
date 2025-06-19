import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateBikeDto } from './dto/update-bike.dto';

@ApiTags('Bikes')
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBikeDto: CreateBikeDto) {
    return this.bikesService.create(createBikeDto);
  }

  @Get()
  findAll() {
    return this.bikesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bikesService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto) {
    return this.bikesService.update(id, updateBikeDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bikesService.remove(id);
  }
}
