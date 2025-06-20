import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { EndJourneyDto } from './dto/end-journey.dto';

@ApiTags('Journeys')
@ApiBearerAuth()
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
  endJourney(@Param('id') id: string, @Body() body: EndJourneyDto) {
    const endTime: string = body.endTime;
    if (!endTime) {
      throw new BadRequestException('endTime is required');
    }
    return this.journeyService.endJourney(id, endTime);
  }
}
