import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { Put } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('journeys')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}
  @Put('ping/:id')
  ping(@Param('id') id: string) {
    return this.journeyService.pingCalories(id);
  }
  @Post()
  create(@Body() dto: CreateJourneyDto) {
    return this.journeyService.create(dto);
  }

  @Get()
  findAll() {
    return this.journeyService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.journeyService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.journeyService.delete(id);
  }
  @Patch(':id/end')
  endJourney(@Param('id') id: string, @Body('endTime') endTime: string) {
    return this.journeyService.endJourney(id, endTime);
  }
}
