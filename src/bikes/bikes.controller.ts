import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
// Controller for managing bikes
@ApiTags('Bikes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}
  // POST /bikes
  // Create a new bike
  @Post()
  create(@Body() createBikeDto: CreateBikeDto) {
    return this.bikesService.create(createBikeDto);
  }
  // GET/bikes
  // return all bikes
  @Get()
  findAll() {
    return this.bikesService.findAll();
  }
  // GET/bikes/:id
  // return single bike by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bikesService.findOne(id);
  }
  // PATCH/bikes/:id
  // Update bike info
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto) {
    return this.bikesService.update(id, updateBikeDto);
  }
  // DELETE /bikes/:id
  // soft delte a bike
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bikesService.remove(id);
  }
}
